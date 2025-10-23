import { useState, useEffect } from "react";
import { MenuItem } from "../types/menu";
import { menuService } from "@services/menuService";

interface UseMenuItemsOptions {
  merchantId?: string;
  categoryId?: string;
  autoFetch?: boolean;
}

interface UseMenuItemsReturn {
  menuItems: MenuItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  getMenuItemById: (_id: string) => MenuItem | undefined;
}

export const useMenuItems = (options: UseMenuItemsOptions = {}): UseMenuItemsReturn => {
  const { merchantId, categoryId, autoFetch = true } = options;

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("useMenuItems: Starting fetch with options:", { merchantId, categoryId });

      let data: MenuItem[];

      if (merchantId) {
        console.log("useMenuItems: Fetching by merchant:", merchantId);
        data = await menuService.getMenuItemsByMerchant(merchantId);
      } else if (categoryId) {
        console.log("useMenuItems: Fetching by category:", categoryId);
        data = await menuService.getMenuItemsByCategory(categoryId);
      } else {
        console.log("useMenuItems: Fetching all menu items");
        data = await menuService.getAllMenuItems();
      }

      console.log("useMenuItems: Raw data received:", data.length, "items");
      console.log("useMenuItems: First item:", data[0]);

      // Tạm thời bỏ filter để test
      console.log("useMenuItems: Using all items without filter");
      setMenuItems(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Có lỗi xảy ra khi tải dữ liệu";
      setError(errorMessage);
      console.error("useMenuItems: Error fetching menu items:", err);
    } finally {
      setLoading(false);
    }
  };

  const getMenuItemById = (_id: string): MenuItem | undefined => {
    return menuItems.find((item) => item.menuItemId === _id);
  };

  useEffect(() => {
    console.log("useMenuItems: useEffect triggered", { merchantId, categoryId, autoFetch });
    if (autoFetch) {
      console.log("useMenuItems: Starting auto fetch");
      fetchMenuItems();
    }
  }, [merchantId, categoryId, autoFetch]);

  return {
    menuItems,
    loading,
    error,
    refetch: fetchMenuItems,
    getMenuItemById,
  };
};

// Hook riêng để lấy một món ăn theo ID
export const useMenuItem = (menuItemId: string) => {
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMenuItem = async () => {
    if (!menuItemId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await menuService.getMenuItemById(menuItemId);
      setMenuItem(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Có lỗi xảy ra khi tải dữ liệu";
      setError(errorMessage);
      console.error("Error fetching menu item:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItem();
  }, [menuItemId]);

  return {
    menuItem,
    loading,
    error,
    refetch: fetchMenuItem,
  };
};
