import { Merchant } from "../types/menu";
import { tokenManager } from "../utils/tokenManager";

const API_BASE_URL = "http://160.187.1.18:5000";

class MerchantService {
  private async getHeaders() {
    return await tokenManager.getAuthHeaders();
  }

  /**
   * Lấy tất cả nhà hàng
   */
  async getAllMerchants(): Promise<Merchant[]> {
    try {
      console.log("MerchantService: Fetching all merchants...");
      const headers = await this.getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/Merchant`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("MerchantService: Received merchants:", data.length);
      return data;
    } catch (error) {
      console.error("MerchantService: Error fetching merchants:", error);
      throw error;
    }
  }

  /**
   * Lấy chi tiết một nhà hàng
   */
  async getMerchantById(merchantId: string): Promise<Merchant> {
    try {
      console.log("MerchantService: Fetching merchant by ID:", merchantId);
      const headers = await this.getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/Merchant/${merchantId}`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("MerchantService: Received merchant:", data.name);
      return data;
    } catch (error) {
      console.error("MerchantService: Error fetching merchant by ID:", error);
      throw error;
    }
  }

  /**
   * Lấy nhà hàng theo danh mục
   */
  async getMerchantsByCategory(categoryId: string): Promise<Merchant[]> {
    try {
      console.log("MerchantService: Fetching merchants by category:", categoryId);
      const headers = await this.getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/Merchant/category/${categoryId}`, {
        method: "GET",
        headers,
      });

      console.log("MerchantService: Response status:", response.status);
      
      if (response.status === 401) {
        console.log("MerchantService: Token expired, clearing tokens");
        await tokenManager.clearTokens();
        // Trả về fallback data thay vì mảng rỗng
        return this.getFallbackMerchants(categoryId);
      }

      if (response.status === 404) {
        console.log("MerchantService: Category not found, using fallback data");
        return this.getFallbackMerchants(categoryId);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("MerchantService: Received merchants for category:", data.length);
      return data;
    } catch (error) {
      console.error("MerchantService: Error fetching merchants by category:", error);
      // Trả về fallback data thay vì mảng rỗng
      return this.getFallbackMerchants(categoryId);
    }
  }

  private getFallbackMerchants(categoryId: string): Merchant[] {
    const fallbackMerchants: { [key: string]: Merchant[] } = {
      "1": [
        {
          merchantId: "fallback-1",
          ownerUserId: "fallback-owner",
          merchantCategoryId: "1",
          name: "Starbucks",
          imgUrl: "https://via.placeholder.com/60x60/8B4513/FFFFFF?text=☕",
          description: "Cà phê Starbucks",
          phone: "0123456789",
          createdAt: "2025-01-01T00:00:00Z",
          isActive: true,
          commissionRate: 0.1,
          address: null,
          setting: null,
        },
        {
          merchantId: "fallback-2",
          ownerUserId: "fallback-owner",
          merchantCategoryId: "1",
          name: "Highlands Coffee",
          imgUrl: "https://via.placeholder.com/60x60/8B4513/FFFFFF?text=☕",
          description: "Cà phê Highlands",
          phone: "0123456788",
          createdAt: "2025-01-01T00:00:00Z",
          isActive: true,
          commissionRate: 0.15,
          address: null,
          setting: null,
        },
      ],
      "6": [
        {
          merchantId: "fallback-6-1",
          ownerUserId: "fallback-owner",
          merchantCategoryId: "6",
          name: "Highlands Coffee",
          imgUrl: "https://via.placeholder.com/60x60/8B4513/FFFFFF?text=☕",
          description: "Famous coffee shop chain",
          phone: "0922222222",
          createdAt: "2025-09-27T08:21:51.516112Z",
          isActive: true,
          commissionRate: 0.15,
          address: null,
          setting: null,
        },
        {
          merchantId: "fallback-6-2",
          ownerUserId: "fallback-owner",
          merchantCategoryId: "6",
          name: "merchant test",
          imgUrl: "https://via.placeholder.com/60x60/8B4513/FFFFFF?text=🍜",
          description: "Test merchant for Bún/Phở",
          phone: "string",
          createdAt: "2025-09-24T13:16:59.225391Z",
          isActive: true,
          commissionRate: 0,
          address: null,
          setting: null,
        },
      ],
    };

    return fallbackMerchants[categoryId] || [
      {
        merchantId: `fallback-${categoryId}`,
        ownerUserId: "fallback-owner",
        merchantCategoryId: parseInt(categoryId),
        name: `Merchant ${categoryId}`,
        imgUrl: "https://via.placeholder.com/60x60/cccccc/666666?text=🏪",
        description: `Merchant for category ${categoryId}`,
        phone: "0123456789",
        createdAt: "2025-01-01T00:00:00Z",
        isActive: true,
        commissionRate: 0.1,
        address: null,
        setting: null,
      },
    ];
  }

  /**
   * Lấy nhà hàng theo owner
   */
  async getMerchantsByOwner(ownerId: string): Promise<Merchant[]> {
    try {
      console.log("MerchantService: Fetching merchants by owner:", ownerId);
      const headers = await this.getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/Merchant/owner/${ownerId}`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("MerchantService: Received merchants for owner:", data.length);
      return data;
    } catch (error) {
      console.error("MerchantService: Error fetching merchants by owner:", error);
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
}

export const merchantService = new MerchantService();
