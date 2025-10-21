/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import api from "./api";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
// Optional AsyncStorage fallback - try to require dynamically so builds without
// the package don't fail at import time.
let AsyncStorage: any = null;
try {
  // dynamic require as optional dependency fallback
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  AsyncStorage = require("@react-native-async-storage/async-storage");
} catch {
  AsyncStorage = null;
}

const storage = {
  async setItem(key: string, value: string) {
    if (SecureStore && typeof SecureStore.setItemAsync === "function") {
      try {
        return await SecureStore.setItemAsync(key, value);
      } catch {
        // ignore and fallback
      }
    }
    if (AsyncStorage && typeof AsyncStorage.setItem === "function") {
      try {
        return await AsyncStorage.setItem(key, value);
      } catch (err) {
        console.warn("Failed to persist token to AsyncStorage", err);
      }
    }
  },
  async getItem(key: string) {
    if (SecureStore && typeof SecureStore.getItemAsync === "function") {
      try {
        return await SecureStore.getItemAsync(key);
      } catch {
        // ignore and fallback
      }
    }
    if (AsyncStorage && typeof AsyncStorage.getItem === "function") {
      try {
        return await AsyncStorage.getItem(key);
      } catch (err) {
        console.warn("Failed to read token from AsyncStorage", err);
        return null;
      }
    }
    return null;
  },
  async deleteItem(key: string) {
    if (SecureStore && typeof SecureStore.deleteItemAsync === "function") {
      try {
        return await SecureStore.deleteItemAsync(key);
      } catch {
        // ignore
      }
    }
    if (AsyncStorage && typeof AsyncStorage.removeItem === "function") {
      try {
        return await AsyncStorage.removeItem(key);
      } catch (err) {
        console.warn("Failed to remove token from AsyncStorage", err);
      }
    }
  },
};

type LoginPayload = {
  username: string;
  password: string;
};

type LoginResponse = {
  accessToken?: string;
  refreshToken?: string;
};

const authService = {
  register: async (payload: Record<string, unknown>) => {
    const res = await api.post("/api/Auth/register-by-phone", payload);
    return res.data;
  },
  login: async (payload: LoginPayload) => {
    // debug: log the full url we're calling (axios will resolve baseURL + url)
    try {
      const res = await api.post<LoginResponse>("/api/Auth/login", payload);
      const data = res.data;
      if (data?.accessToken) {
        await storage.setItem("accessToken", data.accessToken);
      }
      if (data?.refreshToken) {
        await storage.setItem("refreshToken", data.refreshToken);
      }
      return data;
    } catch (err) {
      // log details for debugging 404/NetworkError
      try {
        if (axios.isAxiosError(err)) {
          const req = err?.config;
          if (req) {
            try {
              const fullUrl = (req.baseURL || "") + (req.url || "");
              console.warn("Auth login request:", req.method, fullUrl);
            } catch {
              console.warn("Auth login request (partial):", req.method, req.url);
            }
          }
        }
      } catch {
        // ignore
      }
      throw err;
    }
  },
  refresh: async (accessToken: string | null, refreshToken: string | null) => {
    const res = await api.post("/api/Auth/refresh", { accessToken, refreshToken });
    return res.data;
  },
  logout: async () => {
    try {
      await api.post("/api/Auth/logout");
    } catch {
      // ignore
    }
    await storage.deleteItem("accessToken");
    await storage.deleteItem("refreshToken");
  },
  forgotPassword: async (email: string) => {
    const res = await api.post("/api/Auth/forgot-password", { email });
    return res.data;
  },
  resetPassword: async (payload: { email: string; otp: string; newPassword: string }) => {
    const res = await api.post("/api/Auth/reset-password", payload);
    return res.data;
  },
  getUser: async () => {
    const res = await api.get("/api/User");
    return res.data;
  },
  updateUser: async (payload: Record<string, unknown>) => {
    const res = await api.put("/api/User", payload);
    return res.data;
  },
};

export default authService;
