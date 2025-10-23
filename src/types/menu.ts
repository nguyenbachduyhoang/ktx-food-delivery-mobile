export interface MenuItemOptionValue {
  optionValueId: string;
  optionId: string;
  valueName: string;
  priceDelta: number;
  isActive: boolean;
}

export interface MenuItemOption {
  optionId: string;
  menuItemId: string;
  optionName: string;
  isMultipleChoice: boolean;
  required: boolean;
  isActive: boolean;
  values: MenuItemOptionValue[];
}

export interface MenuItem {
  menuItemId: string;
  merchantId: string;
  categoryId: string;
  name: string;
  imgUrl: string | null;
  description: string;
  price: number;
  prepTimeMinutes: number;
  supportsScheduling: boolean;
  availableFrom: string;
  availableTo: string;
  isAvailable: boolean;
  isSpecial: boolean;
  isActive: boolean;
  createdAt: string;
  options: MenuItemOption[];
}

export interface MenuItemResponse {
  data: MenuItem[];
  success: boolean;
  message?: string;
}

export interface MenuCategory {
  menuCategoryId: string;
  merchantId: string;
  name: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
  menuItems: MenuItem[];
}

export interface Merchant {
  merchantId: string;
  ownerUserId: string;
  merchantCategoryId: string | null;
  name: string;
  imgUrl: string | null;
  description: string;
  phone: string;
  createdAt: string;
  isActive: boolean;
  commissionRate: number;
  address: MerchantAddress | null;
  setting: MerchantSetting | null;
}

export interface MerchantAddress {
  streetNumber: string;
  streetName: string;
  ward: string;
  district: string;
  city: string;
}

export interface MerchantSetting {
  supportsScheduling: boolean;
  deliveryRadiusMeters: number;
}

export interface User {
  userId: string;
  username: string;
  phone: string;
  email: string;
  gender: string;
  displayName: string;
  birthDate: string;
  role: string;
  avatarUrl: string | null;
}

export interface MerchantCategory {
  merchantCategoryId: number;
  name: string;
  description: string;
  isActive: boolean;
  imageUrl: string;
}
