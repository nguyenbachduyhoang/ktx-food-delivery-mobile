import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import withScreenContainer from "@components/layouts/withScreenContainer";
import { SharedHeader } from "@components/shared";
import OrderTabs from "./components/OrderTabs";
import EmptyOrder from "./components/EmptyOrder";
import { OrderCard } from "./components";
import { SIZES } from "@constants/index";

const OrderScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("ongoing");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    // Sample data (replace with real orders)
    const data = [
      { id: "1", shopName: "Quán Cô Ốc", items: 3, total: "120.000đ", status: "Đang giao" },
      { id: "2", shopName: "Bếp Nhà", items: 2, total: "60.000đ", status: "Đang chuẩn bị" },
    ];

    if (data.length === 0) return <EmptyOrder />;

    return (
      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <OrderCard
            shopName={item.shopName}
            items={item.items}
            total={item.total}
            status={item.status}
          />
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SharedHeader
        title="Đơn hàng"
        showSearch={true}
        rightIcon="search-outline"
        onSearchPress={() => console.log("Search pressed")}
      />
      <OrderTabs activeTab={activeTab} onTabChange={handleTabChange} />
      <View style={styles.content}>{renderContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  list: {
    padding: SIZES.SPACING.MD,
  },
});

// Disable the ScreenContainer ScrollView for this screen because it uses FlatList
type _StaticOpts = { useScreenScroll?: boolean };
(OrderScreen as unknown as _StaticOpts).useScreenScroll = false;

export default withScreenContainer(OrderScreen);
