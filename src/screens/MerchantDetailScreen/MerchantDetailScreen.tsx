import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { useRoute } from "@react-navigation/native";
import BackHeader from "../../components/BackHeader";
import { Merchant, MenuItem } from "../../types/menu";
import { menuService } from "../../services";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";
import { MenuItemCard } from "./components";
import withScreenContainer from "@components/layouts/withScreenContainer";

const MerchantDetailScreen: React.FC = () => {
  const route = useRoute();
  const { merchant } = route.params as { merchant: Merchant };

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMenuItems = async () => {
    try {
      setError(null);
      const data = await menuService.getMenuItemsByMerchant(merchant.merchantId);
      setMenuItems(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error fetching menu items:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [merchant.merchantId]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchMenuItems();
  };

  const handleAddToCart = (menuItem: MenuItem) => {
    console.log("Added to cart:", menuItem.name);
    // TODO: Implement add to cart functionality
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <MenuItemCard menuItem={item} onAddToCart={handleAddToCart} />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Quán này chưa có món ăn nào</Text>
    </View>
  );

  const renderError = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>Có lỗi xảy ra: {error}</Text>
    </View>
  );

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      <Text style={styles.loadingText}>Đang tải thực đơn...</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <BackHeader title={merchant.name} />
        {renderLoading()}
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <BackHeader title={merchant.name} />
        {renderError()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackHeader title={merchant.name} />

      <View style={styles.merchantInfo}>
        <View style={styles.merchantHeader}>
          <View style={styles.merchantImageContainer}>
            <Text style={styles.merchantImagePlaceholder}>🏪</Text>
          </View>
          <View style={styles.merchantDetails}>
            <Text style={styles.merchantName}>{merchant.name}</Text>
            <Text style={styles.merchantDescription}>{merchant.description}</Text>
            <View style={styles.merchantStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{menuItems.length}</Text>
                <Text style={styles.statLabel}>món ăn</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>4.5</Text>
                <Text style={styles.statLabel}>⭐ đánh giá</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>15</Text>
                <Text style={styles.statLabel}>phút</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.menuTitle}>Thực đơn</Text>
        <FlatList
          data={menuItems}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.menuItemId}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[COLORS.PRIMARY]}
              tintColor={COLORS.PRIMARY}
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingVertical: SIZES.SPACING.XL,
  },
  emptyText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    textAlign: "center",
  },
  errorContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingVertical: SIZES.SPACING.XL,
  },
  errorText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.ERROR,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: SIZES.SPACING.XL,
    paddingHorizontal: SIZES.SPACING.MD,
  },
  loadingContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingVertical: SIZES.SPACING.XL,
  },
  loadingText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SIZES.SPACING.MD,
    textAlign: "center",
  },
  menuSection: {
    flex: 1,
  },
  menuTitle: {
    ...TEXT_STYLES.H3,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "600",
    marginBottom: SIZES.SPACING.MD,
    paddingHorizontal: SIZES.SPACING.MD,
  },
  merchantDescription: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SIZES.SPACING.SM,
  },
  merchantDetails: {
    flex: 1,
    marginLeft: SIZES.SPACING.MD,
  },
  merchantHeader: {
    alignItems: "center",
    flexDirection: "row",
  },
  merchantImageContainer: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: SIZES.RADIUS.MEDIUM,
    height: 80,
    justifyContent: "center",
    width: 80,
  },
  merchantImagePlaceholder: {
    fontSize: 40,
  },
  merchantInfo: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    paddingHorizontal: SIZES.SPACING.MD,
    paddingVertical: SIZES.SPACING.LG,
  },
  merchantName: {
    ...TEXT_STYLES.H3,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
    marginBottom: SIZES.SPACING.XS,
  },
  merchantStats: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SIZES.SPACING.SM,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statLabel: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SIZES.SPACING.XS,
  },
  statValue: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.PRIMARY,
    fontWeight: "700",
  },
});

export default withScreenContainer(MerchantDetailScreen, {
  center: false,
  scrollable: false,
});
