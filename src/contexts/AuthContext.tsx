import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { tokenManager, TokenData } from "../utils/tokenManager";
import { COLORS } from "../constants";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  login: (_username: string, _password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const API_BASE_URL = "http://160.187.1.18:5000";

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Kiểm tra token khi app khởi động
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);

      // Luôn thực hiện auto-login để đảm bảo token mới
      console.log("AuthProvider: Auto-login with default credentials");
      const loginSuccess = await login("hoanganh", "hoanganh");
      if (loginSuccess) {
        console.log("AuthProvider: Auto-login successful");
        setIsAuthenticated(true);
      } else {
        console.log("AuthProvider: Auto-login failed");
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("AuthProvider: Error checking auth status:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
      }

      const data = await response.json();

      if (data.accessToken && data.refreshToken) {
        const tokenData: TokenData = {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        };

        await tokenManager.setTokens(tokenData);
        setIsAuthenticated(true);
        console.log("AuthProvider: Login successful");
        return true;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("AuthProvider: Login error:", error);
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await tokenManager.clearTokens();
      setIsAuthenticated(false);
      console.log("AuthProvider: Logout successful");
    } catch (error) {
      console.error("AuthProvider: Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const refreshTokenValue = await tokenManager.getRefreshToken();
      if (!refreshTokenValue) {
        return false;
      }

      const response = await fetch(`${API_BASE_URL}/api/Auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: refreshTokenValue,
        }),
      });

      if (!response.ok) {
        throw new Error(`Token refresh failed: ${response.status}`);
      }

      const data = await response.json();

      if (data.accessToken) {
        const tokenData: TokenData = {
          accessToken: data.accessToken,
          refreshToken: refreshTokenValue, // Giữ nguyên refresh token
        };

        await tokenManager.setTokens(tokenData);
        console.log("AuthProvider: Token refreshed successfully");
        return true;
      } else {
        throw new Error("Invalid refresh response format");
      }
    } catch (error) {
      console.error("AuthProvider: Token refresh error:", error);
      // Nếu refresh thất bại, logout user
      await logout();
      return false;
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshToken,
  };

  // Hiển thị loading screen khi đang đăng nhập tự động
  if (isLoading) {
    return (
      <AuthContext.Provider value={value}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loadingText}>Đang đăng nhập...</Text>
        </View>
      </AuthContext.Provider>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    flex: 1,
    justifyContent: "center",
  },
  loadingText: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 14,
    marginTop: 16,
  },
});

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
