export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
export const debounce = <T extends (...args: any[]) => any>(func: T, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Export menu adapter
export * from "./menuAdapter";
export * from "./tokenManager";