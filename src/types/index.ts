import { ImageSourcePropType } from "react-native";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Product {
  id: number;
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  rating: number;
  ratingCount: string;
  isFavorite: boolean;
  time: string;
  kcal: string;
  price: string;
}

export interface CategoryItem {
  label: string;
  icon: unknown;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Home: undefined;
  DatMon: undefined;
  TinMoi: undefined;
  TaiKhoan: undefined;
  ThanhToan: undefined;
};

export type RouteName = keyof RootStackParamList;
