import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";
import { MenuItem } from "../../../types/menu";

interface MenuItemCardProps {
  menuItem: MenuItem;
  // eslint-disable-next-line no-unused-vars
  onAddToCart: (_menuItem: MenuItem) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ menuItem, onAddToCart }) => {
  const [quantity, setQuantity] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatTime = (minutes: number) => {
    return `${minutes} phút`;
  };

  const getImageSource = () => {
    if (menuItem.imgUrl) {
      // Nếu là relative path, thêm base URL
      if (menuItem.imgUrl.startsWith("/")) {
        return { uri: `http://160.187.1.18:5000${menuItem.imgUrl}` };
      }
      return { uri: menuItem.imgUrl };
    }
    // Fallback image nếu không có ảnh
    return { uri: "https://via.placeholder.com/100x100/cccccc/666666?text=🍽️" };
  };

  const handleAddToCart = () => {
    setQuantity(quantity + 1);
    onAddToCart(menuItem);
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={getImageSource()}
          style={styles.menuItemImage}
          resizeMode="cover"
        />
        {menuItem.isSpecial && (
          <View style={styles.specialBadge}>
            <Text style={styles.specialText}>Đặc biệt</Text>
          </View>
        )}
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.menuItemName} numberOfLines={1}>
            {menuItem.name}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatPrice(menuItem.price)}</Text>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {menuItem.description}
        </Text>

        <View style={styles.infoRow}>
          <View style={styles.availabilityContainer}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: menuItem.isAvailable ? COLORS.SUCCESS : COLORS.ERROR },
              ]}
            />
            <Text style={styles.statusText}>
              {menuItem.isAvailable ? "Có sẵn" : "Hết hàng"}
            </Text>
          </View>

          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={14} color={COLORS.TEXT_SECONDARY} />
            <Text style={styles.prepTime}>{formatTime(menuItem.prepTimeMinutes)}</Text>
          </View>
        </View>

        <View style={styles.timeRangeContainer}>
          <Ionicons name="time-outline" size={12} color={COLORS.TEXT_SECONDARY} />
          <Text style={styles.timeRange}>
            {menuItem.availableFrom} - {menuItem.availableTo}
          </Text>
        </View>

        <View style={styles.actionRow}>
          <View style={styles.quantityContainer}>
            {quantity > 0 ? (
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={handleRemoveFromCart}
                  disabled={!menuItem.isAvailable}
                >
                  <Ionicons name="remove" size={16} color={COLORS.PRIMARY} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={handleAddToCart}
                  disabled={!menuItem.isAvailable}
                >
                  <Ionicons name="add" size={16} color={COLORS.PRIMARY} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={[
                  styles.addButton,
                  { opacity: menuItem.isAvailable ? 1 : 0.5 },
                ]}
                onPress={handleAddToCart}
                disabled={!menuItem.isAvailable}
              >
                <Ionicons name="add" size={20} color={COLORS.TEXT_WHITE} />
                <Text style={styles.addButtonText}>Thêm</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: SIZES.SPACING.SM,
  },
  addButton: {
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY,
    borderRadius: SIZES.RADIUS.MEDIUM,
    flexDirection: "row",
    paddingHorizontal: SIZES.SPACING.MD,
    paddingVertical: SIZES.SPACING.SM,
  },
  addButtonText: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_WHITE,
    fontWeight: "600",
    marginLeft: SIZES.SPACING.XS,
  },
  availabilityContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  container: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: SIZES.RADIUS.MEDIUM,
    elevation: 3,
    flexDirection: "row",
    marginBottom: SIZES.SPACING.MD,
    padding: SIZES.SPACING.MD,
    shadowColor: COLORS.SHADOW,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contentContainer: {
    flex: 1,
    marginLeft: SIZES.SPACING.MD,
  },
  description: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SIZES.SPACING.SM,
  },
  headerRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.SPACING.XS,
  },
  imageContainer: {
    position: "relative",
  },
  infoRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.SPACING.XS,
  },
  menuItemImage: {
    borderRadius: SIZES.RADIUS.SMALL,
    height: 80,
    width: 80,
  },
  menuItemName: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
    fontWeight: "600",
    marginRight: SIZES.SPACING.SM,
  },
  prepTime: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginLeft: SIZES.SPACING.XS,
  },
  price: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.PRIMARY,
    fontWeight: "700",
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  quantityButton: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: SIZES.RADIUS.SMALL,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  quantityContainer: {
    alignItems: "center",
  },
  quantityControls: {
    alignItems: "center",
    flexDirection: "row",
  },
  quantityText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "600",
    marginHorizontal: SIZES.SPACING.MD,
    minWidth: 24,
    textAlign: "center",
  },
  specialBadge: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: SIZES.RADIUS.SMALL,
    paddingHorizontal: SIZES.SPACING.SM,
    paddingVertical: 2,
    position: "absolute",
    right: -SIZES.SPACING.XS,
    top: -SIZES.SPACING.XS,
  },
  specialText: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_WHITE,
    fontWeight: "600",
  },
  statusDot: {
    borderRadius: 4,
    height: 8,
    marginRight: SIZES.SPACING.XS,
    width: 8,
  },
  statusText: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
  },
  timeContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  timeRange: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginLeft: SIZES.SPACING.XS,
  },
  timeRangeContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: SIZES.SPACING.XS,
  },
});

export default MenuItemCard;
