import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export interface TokenData {
  accessToken: string;
  refreshToken: string;
}

class TokenManager {
  private static instance: TokenManager;
  private currentToken: string | null = null;

  private constructor() {}

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  /**
   * Lưu token vào AsyncStorage và memory
   */
  async setTokens(tokenData: TokenData): Promise<void> {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, tokenData.accessToken);
      await AsyncStorage.setItem(REFRESH_TOKEN_KEY, tokenData.refreshToken);
      this.currentToken = tokenData.accessToken;
      console.log("TokenManager: Tokens saved successfully");
    } catch (error) {
      console.error("TokenManager: Error saving tokens:", error);
      throw error;
    }
  }

  /**
   * Lấy access token từ memory hoặc AsyncStorage
   */
  async getAccessToken(): Promise<string | null> {
    try {
      if (this.currentToken) {
        return this.currentToken;
      }

      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (token) {
        this.currentToken = token;
        return token;
      }

      return null;
    } catch (error) {
      console.error("TokenManager: Error getting access token:", error);
      return null;
    }
  }

  /**
   * Lấy refresh token từ AsyncStorage
   */
  async getRefreshToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error("TokenManager: Error getting refresh token:", error);
      return null;
    }
  }

  /**
   * Xóa tất cả tokens
   */
  async clearTokens(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
      this.currentToken = null;
      console.log("TokenManager: Tokens cleared successfully");
    } catch (error) {
      console.error("TokenManager: Error clearing tokens:", error);
      throw error;
    }
  }

  /**
   * Kiểm tra token có tồn tại không
   */
  async hasToken(): Promise<boolean> {
    const token = await this.getAccessToken();
    return token !== null;
  }

  /**
   * Lấy headers với Authorization
   */
  async getAuthHeaders(): Promise<Record<string, string>> {
    const token = await this.getAccessToken();
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }
}

export const tokenManager = TokenManager.getInstance();
