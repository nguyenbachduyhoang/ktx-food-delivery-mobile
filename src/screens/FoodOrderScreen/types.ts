import { ImageSourcePropType } from "react-native";

export interface Food {
  id: string;
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  address: string;
  rating: number;
  ratingCount: string;
  isFavorite: boolean;
  time: string;
  kcal: string;
  price: string;
  category: string;
}

export interface FilterOptions {
  sortBy: "popular" | "distance" | "priceAsc" | "priceDesc" | "rating";
  distance: "all" | "1km" | "3km" | "5km";
  priceRange: "all" | "under50" | "50to100" | "over100";
  openNow: boolean;
}

