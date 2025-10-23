import { useState, useEffect } from "react";
import { merchantService } from "../services/merchantService";
import { menuCategoryService } from "../services/menuCategoryService";
import { merchantCategoryService } from "../services/merchantCategoryService";
import { userService } from "../services/userService";
import { Merchant, MenuCategory, User, MerchantCategory } from "../types/menu";

// Hook để lấy danh sách nhà hàng
export const useMerchants = (categoryId?: string) => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        setLoading(true);
        setError(null);

        let data: Merchant[];
        if (categoryId) {
          data = await merchantService.getMerchantsByCategory(categoryId);
        } else {
          data = await merchantService.getAllMerchants();
        }

        setMerchants(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        console.error("Error fetching merchants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMerchants();
  }, [categoryId]);

  return { merchants, loading, error };
};

// Hook để lấy danh sách danh mục món ăn
export const useMenuCategories = (merchantId?: string) => {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await menuCategoryService.getAllMenuCategories(merchantId);
        setCategories(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Error fetching menu categories:", err);
        // Set empty array để app không crash
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [merchantId]);

  return { categories, loading, error };
};

// Hook để lấy thông tin user hiện tại
export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await userService.getCurrentUser();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        console.error("Error fetching current user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};

// Hook để lấy danh sách danh mục merchant
export const useMerchantCategories = () => {
  const [categories, setCategories] = useState<MerchantCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fallback categories khi API không hoạt động
  const fallbackCategories: MerchantCategory[] = [
    {
      merchantCategoryId: 1,
      name: "Cà Phê/Trà",
      imageUrl: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=☕",
      description: "Cà phê và trà các loại",
      isActive: true,
    },
    {
      merchantCategoryId: 2,
      name: "Trà sữa",
      imageUrl: "https://via.placeholder.com/80x80/FF69B4/FFFFFF?text=🧋",
      description: "Trà sữa và đồ uống",
      isActive: true,
    },
    {
      merchantCategoryId: 3,
      name: "Bánh Mì/Xôi",
      imageUrl: "https://via.placeholder.com/80x80/DEB887/FFFFFF?text=🥖",
      description: "Bánh mì và xôi",
      isActive: true,
    },
    {
      merchantCategoryId: 4,
      name: "Thức ăn nhanh",
      imageUrl: "https://via.placeholder.com/80x80/FF6347/FFFFFF?text=🍔",
      description: "Hamburger và thức ăn nhanh",
      isActive: true,
    },
    {
      merchantCategoryId: 5,
      name: "Cơm/Cơm tấm",
      imageUrl: "https://via.placeholder.com/80x80/FFD700/FFFFFF?text=🍚",
      description: "Cơm và cơm tấm",
      isActive: true,
    },
    {
      merchantCategoryId: 6,
      name: "Bún/Phở/Mỳ/Cháo",
      imageUrl: "https://via.placeholder.com/80x80/FFA500/FFFFFF?text=🍜",
      description: "Bún, phở, mỳ và cháo",
      isActive: true,
    },
    {
      merchantCategoryId: 7,
      name: "Ăn vặt",
      imageUrl: "https://via.placeholder.com/80x80/FF1493/FFFFFF?text=🍿",
      description: "Đồ ăn vặt",
      isActive: true,
    },
    {
      merchantCategoryId: 8,
      name: "Lẩu&Nướng",
      imageUrl: "https://via.placeholder.com/80x80/DC143C/FFFFFF?text=🍲",
      description: "Lẩu và nướng",
      isActive: true,
    },
    {
      merchantCategoryId: 9,
      name: "Pizza",
      imageUrl: "https://via.placeholder.com/80x80/FF4500/FFFFFF?text=🍕",
      description: "Pizza các loại",
      isActive: true,
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await merchantCategoryService.getAllMerchantCategories();
        
        // Nếu API trả về mảng rỗng (có thể do lỗi 401), sử dụng fallback
        if (data.length === 0) {
          console.log("useMerchantCategories: Using fallback categories");
          setCategories(fallbackCategories);
        } else {
          setCategories(data);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Error fetching merchant categories:", err);
        // Sử dụng fallback categories khi có lỗi
        console.log("useMerchantCategories: Using fallback categories due to error");
        setCategories(fallbackCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
