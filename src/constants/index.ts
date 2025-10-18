export const COLORS = {
  // Primary colors
  PRIMARY: "#b51f28",
  PRIMARY_LIGHT: "#e53e47",
  PRIMARY_DARK: "#8b1720",

  // Secondary colors
  SECONDARY: "#2196F3",
  SECONDARY_LIGHT: "#64b5f6",
  SECONDARY_DARK: "#1976d2",

  // Background colors
  BACKGROUND: "#fff",
  BACKGROUND_LIGHT: "#f8f9fa",
  BACKGROUND_DARK: "#f5f5f5",
  SURFACE: "#ffffff",
  CARD: "#ffffff",

  // Text colors
  TEXT_PRIMARY: "#333",
  TEXT_SECONDARY: "#666",
  TEXT_LIGHT: "#888",
  TEXT_HINT: "#bbb",
  TEXT_DISABLED: "#ccc",
  TEXT_WHITE: "#ffffff",
  TEXT_INVERSE: "#ffffff",

  // Status colors
  SUCCESS: "#4CAF50",
  SUCCESS_LIGHT: "#81c784",
  SUCCESS_DARK: "#388e3c",

  ERROR: "#F44336",
  ERROR_LIGHT: "#e57373",
  ERROR_DARK: "#d32f2f",

  WARNING: "#FF9800",
  WARNING_LIGHT: "#ffb74d",
  WARNING_DARK: "#f57c00",

  INFO: "#2196F3",
  INFO_LIGHT: "#64b5f6",
  INFO_DARK: "#1976d2",

  // Border colors
  BORDER: "#E0E0E0",
  BORDER_LIGHT: "#f0f0f0",
  BORDER_DARK: "#d0d0d0",
  DIVIDER: "#e8e8e8",

  // Special colors
  TRANSPARENT: "transparent",
  OVERLAY: "rgba(0, 0, 0, 0.5)",
  SHADOW: "rgba(0, 0, 0, 0.1)",

  // Notification colors
  UNREAD_BACKGROUND: "#FFF8F0",
  NOTIFICATION_DOT: "#FF4444",

  // Tab colors
  TAB_ACTIVE: "#b51f28",
  TAB_INACTIVE: "#888",
  TAB_BACKGROUND: "#ffffff",

  // Input colors
  INPUT_BACKGROUND: "#f8f9fa",
  INPUT_BORDER: "#e0e0e0",
  INPUT_FOCUS: "#b51f28",
  INPUT_ERROR: "#F44336",

  // Button colors
  BUTTON_PRIMARY: "#b51f28",
  BUTTON_PRIMARY_DISABLED: "#ffcdd2",
  BUTTON_SECONDARY: "#f5f5f5",
  BUTTON_OUTLINE: "transparent",

  // Icon colors
  ICON_PRIMARY: "#333",
  ICON_SECONDARY: "#666",
  ICON_LIGHT: "#888",
  ICON_WHITE: "#ffffff",

  // Food category colors
  FOOD_CATEGORY_1: "#FF6B35",
  FOOD_CATEGORY_2: "#4CAF50",
  FOOD_CATEGORY_3: "#2196F3",
  FOOD_CATEGORY_4: "#FF9800",
  FOOD_CATEGORY_5: "#9C27B0",
  FOOD_CATEGORY_6: "#607D8B",
} as const;

export const SIZES = {
  RADIUS: {
    SMALL: 8,
    MEDIUM: 12,
    LARGE: 16,
    EXTRA_LARGE: 24,
  },
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
  },
  HEADER: {
    HEIGHT: 56,
    PADDING_HORIZONTAL: 16,
    PADDING_VERTICAL: 12,
    TITLE_SIZE: 20,
    ICON_SIZE: 24,
    BUTTON_SIZE: 40,
  },
  FONT: {
    SMALL: 12,
    MEDIUM: 14,
    LARGE: 16,
    EXTRA_LARGE: 18,
    TITLE: 20,
    HEADING: 24,
  },
} as const;

export const ROUTES = {
  WELCOME: "Welcome",
  LOGIN: "Login",
  HOME: "Home",
  DAT_MON: "DatMon",
  TIN_MOI: "TinMoi",
  TAI_KHOAN: "TaiKhoan",
  THANH_TOAN: "ThanhToan",
} as const;

// Export text styles
export { TEXT_STYLES, FONT_FAMILIES, createTextStyle, getTextStyle } from "./text";
