export const ROUTES = {
  WELCOME: "Welcome",
  LOGIN: "Login",
  HOME: "Home",
  DAT_MON: "DatMon",
  TIN_MOI: "TinMoi",
  TAI_KHOAN: "TaiKhoan",
  THANH_TOAN: "ThanhToan",
} as const;

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES];
