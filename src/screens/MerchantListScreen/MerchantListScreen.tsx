import React from "react";
import { View, StyleSheet } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import BackHeader from "../../components/BackHeader";
import { MerchantList } from "./components";
import { MerchantCategory, Merchant } from "../../types/menu";
import withScreenContainer from "@components/layouts/withScreenContainer";

type RootStackParamList = {
  MerchantListScreen: {
    category: MerchantCategory;
  };
  MerchantDetailScreen: {
    merchant: Merchant;
  };
};

type MerchantListScreenRouteProp = RouteProp<RootStackParamList, "MerchantListScreen">;

const MerchantListScreen: React.FC = () => {
  const route = useRoute<MerchantListScreenRouteProp>();
  const navigation = useNavigation();
  const { category } = route.params;

  const handleMerchantPress = (merchant: Merchant) => {
    console.log("Merchant pressed:", merchant.name);
    // Navigate to MerchantDetailScreen with merchant data
    (navigation as any).navigate("MerchantDetailScreen", { merchant });
  };

  return (
    <View style={styles.container}>
      <BackHeader title={category.name} />
      <MerchantList
        categoryId={category.merchantCategoryId}
        categoryName={category.name}
        onMerchantPress={handleMerchantPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withScreenContainer(MerchantListScreen, {
  center: false,
  scrollable: false,
});