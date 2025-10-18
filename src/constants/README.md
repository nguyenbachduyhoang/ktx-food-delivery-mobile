# HƯỚNG DẪN SỬ DỤNG COLORS VÀ TEXT_STYLES

## 📋 QUY TẮC QUAN TRỌNG
- **KHÔNG** được hardcode màu sắc hoặc style chữ trực tiếp trong component
- **PHẢI** import từ `@constants/index`
- **PHẢI** sử dụng COLORS và TEXT_STYLES cho tất cả component

## 🎨 COLORS Available

### Primary & Secondary
- `COLORS.PRIMARY` - Màu chính (#b51f28)
- `COLORS.PRIMARY_LIGHT` - Màu chính nhạt
- `COLORS.SECONDARY` - Màu phụ (#2196F3)

### Text Colors
- `COLORS.TEXT_PRIMARY` - Text chính (#333)
- `COLORS.TEXT_SECONDARY` - Text phụ (#666)
- `COLORS.TEXT_LIGHT` - Text nhạt (#888)

### Status Colors
- `COLORS.SUCCESS` - Thành công (#4CAF50)
- `COLORS.ERROR` - Lỗi (#F44336)
- `COLORS.WARNING` - Cảnh báo (#FF9800)

### UI Colors
- `COLORS.BACKGROUND` - Nền chính (#fff)
- `COLORS.BORDER` - Viền (#E0E0E0)
- `COLORS.BUTTON_PRIMARY` - Button chính

## ✍️ TEXT_STYLES Available

### Headers
- `TEXT_STYLES.H1` - Heading lớn nhất
- `TEXT_STYLES.H2` - Heading cấp 2
- `TEXT_STYLES.H3` - Heading cấp 3

### Body Text
- `TEXT_STYLES.BODY_LARGE` - Text body lớn
- `TEXT_STYLES.BODY_MEDIUM` - Text body vừa
- `TEXT_STYLES.BODY_SMALL` - Text body nhỏ

### Button Text
- `TEXT_STYLES.BUTTON_LARGE` - Text button lớn
- `TEXT_STYLES.BUTTON_MEDIUM` - Text button vừa

## 🔧 CÁCH SỬ DỤNG

### Import
```typescript
import { COLORS, TEXT_STYLES } from "@constants/index";
```

### Basic Usage
```typescript
const styles = StyleSheet.create({
  title: {
    ...TEXT_STYLES.H2,
    color: COLORS.TEXT_PRIMARY,
  },
  button: {
    backgroundColor: COLORS.BUTTON_PRIMARY,
  },
});
```

### Helper Functions
```typescript
import { createTextStyle, getTextStyle } from "@constants/index";

// Tạo style nhanh
const titleStyle = createTextStyle("H1", COLORS.PRIMARY);

// Get style theo type
const headingStyle = getTextStyle.heading(2);
```

## ❌ SAI
```typescript
// KHÔNG làm như này
const styles = StyleSheet.create({
  text: {
    color: "#333",          // ❌ Hardcode
    fontSize: 16,           // ❌ Hardcode
    fontWeight: "bold",     // ❌ Hardcode
  },
});
```

## ✅ ĐÚNG
```typescript
// Làm như này
const styles = StyleSheet.create({
  text: {
    ...TEXT_STYLES.H3,      // ✅ Sử dụng từ constants
    color: COLORS.TEXT_PRIMARY, // ✅ Sử dụng từ constants
  },
});
```