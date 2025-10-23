import { MenuItem, MenuItemOption, MenuItemOptionValue } from "../types/menu";
import { tokenManager } from "../utils/tokenManager";

const API_BASE_URL = "http://160.187.1.18:5000";

class MenuService {
  private async getHeaders() {
    return await tokenManager.getAuthHeaders();
  }

  /**
   * Lấy tất cả món ăn
   */
  async getAllMenuItems(): Promise<MenuItem[]> {
    try {
      console.log("menuService: Making request to:", `${API_BASE_URL}/api/MenuItem`);
      const headers = await this.getHeaders();
      console.log("menuService: Headers:", headers);
      const response = await fetch(`${API_BASE_URL}/api/MenuItem`, {
        method: "GET",
        headers,
      });

      console.log("menuService: Response status:", response.status);
      console.log("menuService: Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("menuService: Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("menuService: Response data length:", data.length);
      console.log("menuService: First item:", data[0]);
      return data;
    } catch (error) {
      console.error("menuService: Error fetching menu items:", error);
      throw error;
    }
  }

  /**
   * Lấy món ăn theo merchant
   */
  async getMenuItemsByMerchant(merchantId: string): Promise<MenuItem[]> {
    try {
      console.log("menuService: Fetching menu items for merchant:", merchantId);
      const headers = await this.getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/MenuItem/merchant/${merchantId}`, {
        method: "GET",
        headers,
      });

      console.log("menuService: Response status:", response.status);
      
      if (response.status === 401) {
        console.log("menuService: Token expired, clearing tokens");
        await tokenManager.clearTokens();
        // Trả về mảng rỗng thay vì throw error để app không crash
        return [];
      }

      if (response.status === 404) {
        console.log("menuService: Merchant not found, returning empty array");
        return [];
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error("menuService: Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("menuService: Received menu items for merchant:", data.length);
      return data;
    } catch (error) {
      console.error("menuService: Error fetching menu items by merchant:", error);
      // Trả về mảng rỗng thay vì throw error để app không crash
      return [];
    }
  }

  /**
   * Lấy chi tiết một món ăn
   */
  async getMenuItemById(menuItemId: string): Promise<MenuItem> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/MenuItem/${menuItemId}`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching menu item:", error);
      throw error;
    }
  }

  /**
   * Lấy món ăn theo danh mục
   */
  async getMenuItemsByCategory(categoryId: string): Promise<MenuItem[]> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/MenuItem/category/${categoryId}`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching menu items by category:", error);
      throw error;
    }
  }

  /**
   * Tạo URL ảnh từ imgUrl
   */
  getImageUrl(imgUrl: string | null): string | null {
    if (!imgUrl) return null;

    // Nếu imgUrl đã là full URL thì trả về luôn
    if (imgUrl.startsWith("http")) {
      return imgUrl;
    }

    // Nếu là relative path thì ghép với base URL
    return `${API_BASE_URL}${imgUrl}`;
  }

  /**
   * Lấy các tùy chọn của một món ăn
   */
  async getMenuItemOptions(menuItemId: string): Promise<MenuItemOption[]> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/MenuItemOption/menuitem/${menuItemId}`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching menu item options:", error);
      throw error;
    }
  }

  /**
   * Lấy các giá trị của một tùy chọn
   */
  async getMenuItemOptionValues(optionId: string): Promise<MenuItemOptionValue[]> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/MenuItemOptionValue/option/${optionId}`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching menu item option values:", error);
      throw error;
    }
  }
}

export const menuService = new MenuService();
