export type OrderStatus = "PENDING" | "COMPLETED" | "HISTORY" | "RATING" | "DELIVERY";

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  distance: string;
  deliveryTime: string;
  discount?: string;
  hasFlashSale?: boolean;
  isFavorite?: boolean;
}

export interface Order {
  id: string;
  restaurant: Restaurant;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: Date;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}
