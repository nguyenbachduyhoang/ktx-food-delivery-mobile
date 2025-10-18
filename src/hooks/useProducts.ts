import { useState, useEffect } from "react";
import type { Product } from "../types";
import { productService } from "@services/productService";

export { Product };

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await productService.searchProducts(query);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to search products");
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const product = await productService.getProductById(id);
      return product;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get product");
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    searchProducts,
    getProductById,
  };
};
