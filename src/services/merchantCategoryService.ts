import { MerchantCategory } from "../types/menu";
import { tokenManager } from "../utils/tokenManager";

const API_BASE_URL = "http://160.187.1.18:5000";

class MerchantCategoryService {
  private async getHeaders() {
    return await tokenManager.getAuthHeaders();
  }

  /**
   * Lấy tất cả danh mục merchant
   */
  async getAllMerchantCategories(): Promise<MerchantCategory[]> {
    try {
      console.log("MerchantCategoryService: Fetching all merchant categories...");
      const headers = await this.getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/MerchantCategory`, {
        method: "GET",
        headers,
      });

      console.log("MerchantCategoryService: Response status:", response.status);
      
      if (response.status === 401) {
        console.log("MerchantCategoryService: Token expired, clearing tokens");
        await tokenManager.clearTokens();
        // Trả về mảng rỗng thay vì throw error để app không crash
        return [];
      }
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("MerchantCategoryService: Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("MerchantCategoryService: Received merchant categories:", data.length);
      return data;
    } catch (error) {
      console.error("MerchantCategoryService: Error fetching merchant categories:", error);
      // Trả về mảng rỗng thay vì throw error để app không crash
      return [];
    }
  }

  /**
   * Lấy chi tiết một danh mục merchant
   */
  async getMerchantCategoryById(categoryId: number): Promise<MerchantCategory> {
    try {
      console.log("MerchantCategoryService: Fetching merchant category by ID:", categoryId);
      const headers = await this.getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/MerchantCategory/${categoryId}`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("MerchantCategoryService: Received merchant category:", data.name);
      return data;
    } catch (error) {
      console.error("MerchantCategoryService: Error fetching merchant category by ID:", error);
      throw error;
    }
  }
}

export const merchantCategoryService = new MerchantCategoryService();
