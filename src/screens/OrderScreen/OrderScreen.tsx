import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import withScreenContainer from "@components/layouts/withScreenContainer";
import { SharedHeader } from "@components/shared";
import OrderTabs from "./components/OrderTabs";
import EmptyOrder from "./components/EmptyOrder";

const OrderScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("ongoing");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    // Hiện tại chỉ hiển thị EmptyOrder cho tất cả tabs
    // Sau này có thể thêm logic để hiển thị danh sách đơn hàng thực tế
    return <EmptyOrder />;
  };

  return (
    <>
      <SharedHeader
        title="Đơn hàng"
        showSearch={true}
        rightIcon="search-outline"
        onSearchPress={() => console.log("Search pressed")}
      />
      <OrderTabs activeTab={activeTab} onTabChange={handleTabChange} />
      <View style={styles.content}>{renderContent()}</View>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

export default withScreenContainer(OrderScreen);
