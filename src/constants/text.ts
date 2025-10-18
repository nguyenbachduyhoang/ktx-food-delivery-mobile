// Text styles và typography constants
export const TEXT_STYLES = {
  // Headers
  H1: {
    fontSize: 28,
    fontWeight: "700" as const,
    lineHeight: 34,
  },
  H2: {
    fontSize: 24,
    fontWeight: "600" as const,
    lineHeight: 30,
  },
  H3: {
    fontSize: 20,
    fontWeight: "600" as const,
    lineHeight: 26,
  },
  H4: {
    fontSize: 18,
    fontWeight: "600" as const,
    lineHeight: 24,
  },
  H5: {
    fontSize: 16,
    fontWeight: "600" as const,
    lineHeight: 22,
  },
  H6: {
    fontSize: 14,
    fontWeight: "600" as const,
    lineHeight: 20,
  },

  // Body text
  BODY_LARGE: {
    fontSize: 16,
    fontWeight: "400" as const,
    lineHeight: 24,
  },
  BODY_MEDIUM: {
    fontSize: 14,
    fontWeight: "400" as const,
    lineHeight: 20,
  },
  BODY_SMALL: {
    fontSize: 12,
    fontWeight: "400" as const,
    lineHeight: 18,
  },

  // Button text
  BUTTON_LARGE: {
    fontSize: 16,
    fontWeight: "600" as const,
    lineHeight: 20,
  },
  BUTTON_MEDIUM: {
    fontSize: 14,
    fontWeight: "600" as const,
    lineHeight: 18,
  },
  BUTTON_SMALL: {
    fontSize: 12,
    fontWeight: "600" as const,
    lineHeight: 16,
  },

  // Caption và label
  CAPTION: {
    fontSize: 12,
    fontWeight: "400" as const,
    lineHeight: 16,
  },
  LABEL: {
    fontSize: 14,
    fontWeight: "500" as const,
    lineHeight: 18,
  },
  OVERLINE: {
    fontSize: 10,
    fontWeight: "600" as const,
    lineHeight: 14,
    letterSpacing: 1.5,
  },

  // Tab text
  TAB_ACTIVE: {
    fontSize: 14,
    fontWeight: "600" as const,
    lineHeight: 18,
  },
  TAB_INACTIVE: {
    fontSize: 14,
    fontWeight: "400" as const,
    lineHeight: 18,
  },

  // Input text
  INPUT_TEXT: {
    fontSize: 16,
    fontWeight: "400" as const,
    lineHeight: 22,
  },
  INPUT_PLACEHOLDER: {
    fontSize: 16,
    fontWeight: "400" as const,
    lineHeight: 22,
  },
  INPUT_LABEL: {
    fontSize: 14,
    fontWeight: "500" as const,
    lineHeight: 18,
  },
} as const;

// Font families (có thể customize theo project)
export const FONT_FAMILIES = {
  REGULAR: "System",
  MEDIUM: "System",
  BOLD: "System",
  LIGHT: "System",
} as const;

// Utility function để tạo text style với màu
export const createTextStyle = (
  baseStyle: keyof typeof TEXT_STYLES,
  color?: string,
  additionalProps?: object
) => ({
  ...TEXT_STYLES[baseStyle],
  ...(color && { color }),
  ...additionalProps,
});

// Helper functions cho các trường hợp thường dùng
export const getTextStyle = {
  heading: (size: 1 | 2 | 3 | 4 | 5 | 6 = 1) => TEXT_STYLES[`H${size}` as keyof typeof TEXT_STYLES],
  body: (size: "large" | "medium" | "small" = "medium") =>
    TEXT_STYLES[`BODY_${size.toUpperCase()}` as keyof typeof TEXT_STYLES],
  button: (size: "large" | "medium" | "small" = "medium") =>
    TEXT_STYLES[`BUTTON_${size.toUpperCase()}` as keyof typeof TEXT_STYLES],
};

export default TEXT_STYLES;
