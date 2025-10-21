import api from "./api";
import * as SecureStore from "expo-secure-store";

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
    const res = await api.post<LoginResponse>("/api/Auth/login", payload);
    const data = res.data;
    if (data?.accessToken) {
      await SecureStore.setItemAsync("accessToken", data.accessToken);
    }
    if (data?.refreshToken) {
      await SecureStore.setItemAsync("refreshToken", data.refreshToken);
    }
    return data;
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
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
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
