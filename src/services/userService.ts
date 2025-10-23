import { User } from "../types/menu";
import { tokenManager } from "../utils/tokenManager";

const API_BASE_URL = "http://160.187.1.18:5000";

class UserService {
  private async getHeaders() {
    return await tokenManager.getAuthHeaders();
  }

  /**
   * Lấy thông tin user hiện tại
   */
  async getCurrentUser(): Promise<User> {
    try {
      console.log("UserService: Fetching current user...");
      const headers = await this.getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/User`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("UserService: Received user:", data.displayName);
      return data;
    } catch (error) {
      console.error("UserService: Error fetching current user:", error);
      throw error;
    }
  }

  /**
   * Lấy tất cả users (admin only)
   */
  async getAllUsers(): Promise<User[]> {
    try {
      console.log("UserService: Fetching all users...");
      const headers = await this.getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/User/all`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("UserService: Received users:", data.length);
      return data;
    } catch (error) {
      console.error("UserService: Error fetching all users:", error);
      throw error;
    }
  }

  /**
   * Tạo URL ảnh từ avatarUrl
   */
  getImageUrl(avatarUrl: string | null): string | null {
    if (!avatarUrl) return null;

    // Nếu avatarUrl đã là full URL thì trả về luôn
    if (avatarUrl.startsWith("http")) {
      return avatarUrl;
    }

    // Nếu là relative path thì ghép với base URL
    return `${API_BASE_URL}${avatarUrl}`;
  }
}

export const userService = new UserService();
