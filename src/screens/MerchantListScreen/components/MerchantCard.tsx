import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";
import { Merchant } from "../../../types/menu";

interface MerchantCardProps {
  merchant: Merchant;
  // eslint-disable-next-line no-unused-vars
  onPress: (_merchant: Merchant) => void;
}

const MerchantCard: React.FC<MerchantCardProps> = ({ merchant, onPress }) => {
  const getImageSource = () => {
    if (merchant.imgUrl) {
      // Nếu là relative path, thêm base URL
      if (merchant.imgUrl.startsWith("/")) {
        return { uri: `http://160.187.1.18:5000${merchant.imgUrl}` };
      }
      return { uri: merchant.imgUrl };
    }
    // Fallback image nếu không có ảnh
    return { uri: "https://via.placeholder.com/60x60/cccccc/666666?text=No+Image" };
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(merchant)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image source={getImageSource()} style={styles.merchantImage} resizeMode="cover" />
        <View style={styles.statusBadge}>
          <Ionicons
            name={merchant.isActive ? "checkmark-circle" : "close-circle"}
            size={16}
            color={merchant.isActive ? COLORS.SUCCESS : COLORS.ERROR}
          />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.merchantName} numberOfLines={1}>
          {merchant.name}
        </Text>

        {merchant.description && (
          <Text style={styles.description} numberOfLines={2}>
            {merchant.description}
          </Text>
        )}

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="call" size={14} color={COLORS.TEXT_SECONDARY} />
            <Text style={styles.infoText}>{merchant.phone}</Text>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="star" size={14} color={COLORS.WARNING} />
            <Text style={styles.infoText}>4.5</Text>
          </View>
        </View>

        {merchant.commissionRate > 0 && (
          <View style={styles.commissionBadge}>
            <Text style={styles.commissionText}>
              {Math.round(merchant.commissionRate * 100)}% commission
            </Text>
          </View>
        )}
      </View>

      <View style={styles.arrowContainer}>
        <Ionicons name="chevron-forward" size={20} color={COLORS.TEXT_SECONDARY} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  arrowContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: SIZES.SPACING.SM,
  },
  commissionBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.PRIMARY_LIGHT,
    borderRadius: SIZES.RADIUS.SMALL,
    marginTop: SIZES.SPACING.XS,
    paddingHorizontal: SIZES.SPACING.SM,
    paddingVertical: 2,
  },
  commissionText: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.PRIMARY,
    fontWeight: "500",
  },
  container: {
    alignItems: "center",
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
  imageContainer: {
    position: "relative",
  },
  infoItem: {
    alignItems: "center",
    flexDirection: "row",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoText: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginLeft: SIZES.SPACING.XS,
  },
  merchantImage: {
    borderRadius: SIZES.RADIUS.SMALL,
    height: 60,
    width: 60,
  },
  merchantName: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "600",
    marginBottom: SIZES.SPACING.XS,
  },
  statusBadge: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: 10,
    bottom: -2,
    height: 20,
    justifyContent: "center",
    position: "absolute",
    right: -2,
    width: 20,
  },
});

export default MerchantCard;
