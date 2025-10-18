import type { Product } from "../types";
import card01 from "@assets/card/01.png";
import card02 from "@assets/card/02.png";

class ProductService {
  private baseUrl = "https://api.ktx-food.com"; // Replace with actual API URL

  async getProducts(): Promise<Product[]> {
    try {
      // Simulate API call - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data
      return [
        {
          id: 1,
          image: card01,
          title: "Bánh Cuốn",
          subtitle: "Quán Cô Ba",
          rating: 4.5,
          ratingCount: "2k+",
          isFavorite: false,
          time: "15 phút",
          kcal: "200",
          price: "25,000đ",
        },
        {
          id: 2,
          image: card02,
          title: "Bánh Mì",
          subtitle: "Quán Bà Tám",
          rating: 4.7,
          ratingCount: "1k+",
          isFavorite: true,
          time: "10 phút",
          kcal: "180",
          price: "20,000đ",
        },
      ];
    } catch {
      throw new Error("Failed to fetch products");
    }
  }

  async getProductById(id: number): Promise<Product | null> {
    const products = await this.getProducts();
    return products.find((product) => product.id === id) || null;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const products = await this.getProducts();
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export const productService = new ProductService();
