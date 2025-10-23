import { MenuItem } from "../types/menu";
import { Food } from "@screens/FoodOrderScreen/types";
import { menuService } from "@services/menuService";
import card01 from "@assets/card/01.png";
import card02 from "@assets/card/02.png";
import food1 from "@assets/banner/food1.png";
import food2 from "@assets/banner/food2.png";

// Helper: Generate random address
const addresses = [
  "123 Lê Duẩn, Q.1, TP.HCM",
  "456 Nguyễn Huệ, Q.1, TP.HCM",
  "789 Điện Biên Phủ, Q.3, TP.HCM",
  "234 Pasteur, Q.1, TP.HCM",
  "567 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM",
  "890 Trần Hưng Đạo, Q.5, TP.HCM",
  "345 Hai Bà Trưng, Q.3, TP.HCM",
  "678 Võ Văn Tần, Q.3, TP.HCM",
  "901 Cách Mạng Tháng 8, Q.10, TP.HCM",
  "432 Nam Kỳ Khởi Nghĩa, Q.1, TP.HCM",
];

const getAddress = (index: number) => addresses[index % addresses.length];

// Helper: Generate random rating
const generateRating = () => 4.0 + Math.random() * 1.0;

// Helper: Generate random rating count
const generateRatingCount = () => `${Math.floor(Math.random() * 20) + 1}k+`;

// Helper: Generate random time
const generateTime = () =>
  `${5 + Math.floor(Math.random() * 20)}-${10 + Math.floor(Math.random() * 20)}`;

// Helper: Generate random kcal
const generateKcal = () => `${200 + Math.floor(Math.random() * 400)}`;

// Helper: Get random image
const getRandomImage = (index: number) => {
  const images = [card01, card02, food1, food2];
  return images[index % images.length];
};

// Helper: Map category from API to local category
const mapCategory = (categoryId: string): string => {
  // This is a simple mapping - in real app, you'd have a proper category mapping
  const categoryMap: Record<string, string> = {
    "b3c91d91-5cd6-48ca-b1d1-44c6937dac29": "com",
    "e2cb76dc-1b0c-41e2-9e2c-493da416d2a0": "pho",
    "b115d3f6-9024-49ca-b01f-ad04141300db": "anvat",
    "ebb1973f-d9b6-44cc-8ff7-755946db6bd6": "trasua",
    "ddadc341-c430-47a2-b8ad-20147d922b5e": "trasua",
    "2847d248-292c-4cd1-ace2-99dddcca9ceb": "banhmi",
    "617e857a-0521-4097-ba22-b804721e6cbe": "anvat",
    "a50909cb-72eb-4fd7-9ff8-1d12fe336c56": "anvat",
    "1cffa7d8-e503-4d9e-9267-35318ea43355": "anvat",
    "8dd95bf4-14e3-436c-bf1e-849006423154": "mi",
    "fae0971e-9d01-42e1-b695-ae532f9a089f": "bun",
    "443abfc5-4f1a-4e84-ad3c-62368c944b7f": "trasua",
  };

  return categoryMap[categoryId] || "com";
};

/**
 * Convert MenuItem from API to Food type for UI
 */
export const convertMenuItemToFood = (menuItem: MenuItem, index: number): Food => {
  const imageUrl = menuService.getImageUrl(menuItem.imgUrl);

  return {
    id: menuItem.menuItemId,
    image: imageUrl ? { uri: imageUrl } : getRandomImage(index),
    title: menuItem.name,
    subtitle: `Nhà hàng ${menuItem.merchantId.slice(0, 8)}`, // Simplified merchant name
    address: getAddress(index),
    rating: generateRating(),
    ratingCount: generateRatingCount(),
    isFavorite: Math.random() > 0.7,
    time: generateTime(),
    kcal: generateKcal(),
    price: menuItem.price.toLocaleString("vi-VN") + "đ",
    category: mapCategory(menuItem.categoryId),
    description: menuItem.description,
  };
};

/**
 * Convert array of MenuItems to Foods
 */
export const convertMenuItemsToFoods = (menuItems: MenuItem[]): Food[] => {
  return menuItems.map((item, index) => convertMenuItemToFood(item, index));
};

/**
 * Get top rated foods from API data
 */
export const getTopRatedFoods = (menuItems: MenuItem[]): Food[] => {
  // Sort by rating (we'll use isSpecial flag as a proxy for rating)
  const sortedItems = [...menuItems].filter((item) => item.isSpecial).slice(0, 5);

  return convertMenuItemsToFoods(sortedItems);
};
