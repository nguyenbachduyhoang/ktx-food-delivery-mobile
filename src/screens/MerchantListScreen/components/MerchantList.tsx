import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { merchantService } from "../../../services";
import { Merchant } from "../../../types/menu";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";
import MerchantCard from "./MerchantCard";

interface MerchantListProps {
  categoryId: number;
  categoryName: string;
  // eslint-disable-next-line no-unused-vars
  onMerchantPress: (_merchant: Merchant) => void;
}

const MerchantList: React.FC<MerchantListProps> = ({
  categoryId,
  categoryName,
  onMerchantPress,
}) => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMerchants = async () => {
    try {
      setError(null);
      const data = await merchantService.getMerchantsByCategory(categoryId.toString());
      setMerchants(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error fetching merchants:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMerchants();
  }, [categoryId]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchMerchants();
  };

  const renderMerchantItem = ({ item }: { item: Merchant }) => (
    <MerchantCard merchant={item} onPress={onMerchantPress} />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Không có quán nào trong danh mục này</Text>
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
      <Text style={styles.loadingText}>Đang tải danh sách quán...</Text>
    </View>
  );

  if (loading) {
    return renderLoading();
  }

  if (error) {
    return renderError();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {merchants.length} quán trong &quot;{categoryName}&quot;
      </Text>

      <FlatList
        data={merchants}
        renderItem={renderMerchantItem}
        keyExtractor={(item) => item.merchantId}
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
  headerText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SIZES.SPACING.MD,
    paddingHorizontal: SIZES.SPACING.MD,
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
});

export default MerchantList;
