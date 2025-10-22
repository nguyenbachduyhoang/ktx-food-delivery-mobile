import axios from "axios";
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
    // Bubble up error for now; authService will handle refresh when needed
    return Promise.reject(error);
  }
);

export default api;
