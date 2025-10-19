import axios, { AxiosRequestConfig } from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

// Base URL for the API. Fallback to example if not set in env.
const API_BASE = Constants?.manifest?.extra?.API_BASE || "http://160.187.1.18:5000";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});

// Attach access token for every request if present
api.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // ignore
  }
  return config;
});

// Simple response interceptor placeholder: could add refresh-token logic here later
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error?.config as AxiosRequestConfig & { _retry?: boolean };

    // If there's no response or it's not a 401, bubble up
    if (!error?.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    // Prevent infinite loops
    if (originalRequest?._retry) {
      return Promise.reject(error);
    }

    // Mark request as retried
    if (originalRequest) originalRequest._retry = true;

    try {
      // Attempt token refresh using raw axios to avoid interceptor
      const accessToken = await SecureStore.getItemAsync("accessToken");
      const refreshToken = await SecureStore.getItemAsync("refreshToken");

      const refreshRes = await axios.post(
        `${API_BASE}/api/Auth/refresh`,
        { accessToken, refreshToken },
        {
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          timeout: 10000,
        }
      );

      const data = refreshRes.data as { accessToken?: string; refreshToken?: string };
      if (data?.accessToken) {
        await SecureStore.setItemAsync("accessToken", data.accessToken);
      }
      if (data?.refreshToken) {
        await SecureStore.setItemAsync("refreshToken", data.refreshToken);
      }

      // Update the Authorization header and retry original request
      if (originalRequest && originalRequest.headers) {
        const newToken = data?.accessToken || (await SecureStore.getItemAsync("accessToken"));
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
      }

      return api.request(originalRequest as AxiosRequestConfig);
    } catch (err) {
      // If refresh failed, clear tokens and reject
      try {
        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("refreshToken");
      } catch {
        // ignore errors while clearing tokens
      }
      return Promise.reject(err);
    }
  }
);

export default api;
