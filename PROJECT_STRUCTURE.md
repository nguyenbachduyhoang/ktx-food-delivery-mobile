# Cấu trúc dự án React Native KTX Food Delivery

## Cấu trúc thư mục đã tạo

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Icon.tsx
│   │   └── Input.tsx
│   └── layouts/
│       ├── ScreenContainer.tsx
│       └── withScreenContainer.tsx
├── screens/
│   ├── HomeScreen/
│   │   ├── HomeScreen.tsx
│   │   └── components/
│   │       └── HomeHero.tsx
│   ├── WelcomeScreen.tsx
│   ├── LoginScreen.tsx
│   ├── DatMonScreen.tsx
│   ├── TinMoiScreen.tsx
│   ├── TaiKhoanScreen.tsx
│   └── ThanhToanScreen.tsx
├── navigation/
│   ├── AppNavigator.tsx
│   ├── BottomTabs.tsx
│   └── routes.ts
├── hooks/
│   └── useProducts.ts
├── services/
│   └── productService.ts
├── store/
│   └── authSlice.ts
├── constants/
│   └── index.ts
├── types/
│   └── index.ts
└── utils/
    └── index.ts
```

## Path Aliases đã cấu hình

### tsconfig.json

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@app/*": ["src/app/*"],
      "@buyer/*": ["src/buyer/*"],
      "@components/*": ["src/components/*"],
      "@services/*": ["src/services/*"],
      "@hooks/*": ["src/hooks/*"],
      "@store/*": ["src/store/*"],
      "@assets/*": ["assets/*"],
      "@constants/*": ["src/constants/*"],
      "@types/*": ["src/types/*"],
      "@utils/*": ["src/utils/*"],
      "@navigation/*": ["src/navigation/*"],
      "@screens/*": ["src/screens/*"]
    }
  }
}
```

### babel.config.js

```js
module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@app": "./src/app",
          "@buyer": "./src/buyer",
          "@components": "./src/components",
          "@services": "./src/services",
          "@hooks": "./src/hooks",
          "@store": "./src/store",
          "@assets": "./assets",
          "@constants": "./src/constants",
          "@types": "./src/types",
          "@utils": "./src/utils",
          "@navigation": "./src/navigation",
          "@screens": "./src/screens",
        },
      },
    ],
  ],
};
```

## Công việc cần hoàn thiện

### 1. Di chuyển components còn lại

Cần di chuyển các components từ `src/components/` cũ vào cấu trúc mới:

- Avatar.tsx → src/components/ui/
- Carousel.tsx → src/components/ui/
- CategoryGrid.tsx → src/components/ui/
- FoodCard.tsx → src/components/ui/
- Header.tsx → src/components/ui/
- IconButton.tsx → src/components/ui/
- Label.tsx → src/components/ui/
- LabelText.tsx → src/components/ui/
- LoginForm.tsx → src/components/ui/
- MenuItem.tsx → src/components/ui/
- SearchBox.tsx → src/components/ui/
- SocialLoginButtons.tsx → src/components/ui/
- UserInfo.tsx → src/components/ui/

### 2. Cập nhật import paths

Cập nhật tất cả các file để sử dụng path aliases thay vì relative imports:

```tsx
// Thay vì
import Header from "../components/Header";

// Sử dụng
import Header from "@components/ui/Header";
```

### 3. Cài đặt babel-plugin-module-resolver

```bash
npm install --save-dev babel-plugin-module-resolver
```

### 4. Cập nhật navigation

- Sử dụng ROUTES constants từ routes.ts
- Cập nhật BottomTabs để import từ cấu trúc mới

### 5. Hoàn thiện state management

- Có thể thay thế simple store bằng Redux Toolkit
- Hoặc sử dụng Context API cho các state đơn giản

### 6. Xóa các file và thư mục cũ

Sau khi di chuyển xong, xóa:

- src/layouts/ (cũ)
- src/components/ (files cũ đã di chuyển)

## Lợi ích của cấu trúc mới

1. **Tổ chức rõ ràng**: Components được phân loại theo chức năng
2. **Path aliases**: Import ngắn gọn và dễ maintain
3. **Separation of concerns**: Business logic tách biệt khỏi UI
4. **Scalability**: Dễ mở rộng khi dự án phát triển
5. **Reusability**: Components UI có thể tái sử dụng
6. **Type safety**: TypeScript với types được định nghĩa rõ ràng

## Cách sử dụng

### Import components

```tsx
import Button from "@components/ui/Button";
import ScreenContainer from "@components/layouts/ScreenContainer";
```

### Sử dụng hooks

```tsx
import { useProducts } from "@hooks/useProducts";

const MyComponent = () => {
  const { products, loading, error } = useProducts();
  // ...
};
```

### Sử dụng services

```tsx
import { productService } from "@services/productService";
```

### Sử dụng constants và types

```tsx
import { COLORS, SIZES } from "@constants/index";
import { Product, User } from "@types/index";
```
