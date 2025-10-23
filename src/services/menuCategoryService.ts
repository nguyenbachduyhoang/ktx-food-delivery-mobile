import { MenuCategory } from "../types/menu";
import { tokenManager } from "../utils/tokenManager";

const API_BASE_URL = "http://160.187.1.18:5000";

class MenuCategoryService {
  private async getHeaders() {
    return await tokenManager.getAuthHeaders();
  }

  /**
   * Lấy tất cả danh mục món ăn
   */
  async getAllMenuCategories(merchantId?: string): Promise<MenuCategory[]> {
    try {
      console.log("MenuCategoryService: Fetching all menu categories...");
      let url = `${API_BASE_URL}/api/MenuCategory`;

      if (merchantId) {
        url += `?merchantId=${merchantId}`;
      }

      console.log("MenuCategoryService: Request URL:", url);
      const headers = await this.getHeaders();
      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      console.log("MenuCategoryService: Response status:", response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("MenuCategoryService: Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("MenuCategoryService: Received menu categories:", data.length);
      return data;
    } catch (error) {
      console.error("MenuCategoryService: Error fetching menu categories:", error);
      // Trả về mảng rỗng thay vì throw error để app không crash
      return [];
    }
  }

  /**
   * Lấy chi tiết một danh mục món ăn
   */
  async getMenuCategoryById(categoryId: string): Promise<MenuCategory> {
    try {
      console.log("MenuCategoryService: Fetching menu category by ID:", categoryId);
      const headers = await this.getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/MenuCategory/${categoryId}`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("MenuCategoryService: Received menu category:", data.name);
      return data;
    } catch (error) {
      console.error("MenuCategoryService: Error fetching menu category by ID:", error);
      throw error;
    }
  }
}

export const menuCategoryService = new MenuCategoryService();
