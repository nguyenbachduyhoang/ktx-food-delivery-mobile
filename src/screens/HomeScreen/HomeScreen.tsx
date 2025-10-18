import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ImageSourcePropType,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeHeader } from "@components/shared";
import { Ionicons } from "@expo/vector-icons";
import Label from "@components/Label";
import Carousel from "@components/Carousel";
import CategoryGrid, { CategoryItem } from "@components/CategoryGrid";
import FoodCard from "@components/FoodCard";
import withScreenContainer from "@components/layouts/withScreenContainer";
import { useProducts } from "@hooks/useProducts";
import { COLORS, SIZES } from "@constants/index";

import phoIcon from "@assets/category/pho.png";
import goicuonIcon from "@assets/category/goicuon.png";
import comtamIcon from "@assets/category/comtam.png";
import bundauIcon from "@assets/category/bundau.png";
import banhmiIcon from "@assets/category/banhmi.png";
import comcuonIcon from "@assets/category/comcuon.png";
import trasuaIcon from "@assets/category/trasua.png";
import capheIcon from "@assets/category/caphe.png";

type RootStackParamList = {
  CategoryDetail: {
    categoryName: string;
    categoryImage: ImageSourcePropType;
  };
  Search: undefined;
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { products, loading, error } = useProducts();

  // Local state for basic typeahead/search suggestions
  const [query, setQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<typeof products>([]);

  React.useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const q = query.trim().toLowerCase();
    const results = products.filter((p) => p.title.toLowerCase().includes(q)).slice(0, 8);
    setSuggestions(results);
  }, [query, products]);

  const handleCategoryPress = (category: CategoryItem) => {
    navigation.navigate("CategoryDetail", {
      categoryName: category.label,
      categoryImage: category.icon,
    });
  };

  const handleSearchPress = () => {
    navigation.navigate("Search");
  };

  const categories: CategoryItem[] = [
    {
      label: "Phở",
      icon: phoIcon,
      onPress: () => handleCategoryPress({ label: "Phở", icon: phoIcon }),
    },
    {
      label: "Gỏi cuốn",
      icon: goicuonIcon,
      onPress: () => handleCategoryPress({ label: "Gỏi cuốn", icon: goicuonIcon }),
    },
    {
      label: "Cơm tấm",
      icon: comtamIcon,
      onPress: () => handleCategoryPress({ label: "Cơm tấm", icon: comtamIcon }),
    },
    {
      label: "Bún đậu",
      icon: bundauIcon,
      onPress: () => handleCategoryPress({ label: "Bún đậu", icon: bundauIcon }),
    },
    {
      label: "Bánh mì",
      icon: banhmiIcon,
      onPress: () => handleCategoryPress({ label: "Bánh mì", icon: banhmiIcon }),
    },
    {
      label: "Cơm cuộn",
      icon: comcuonIcon,
      onPress: () => handleCategoryPress({ label: "Cơm cuộn", icon: comcuonIcon }),
    },
    {
      label: "Trà sữa",
      icon: trasuaIcon,
      onPress: () => handleCategoryPress({ label: "Trà sữa", icon: trasuaIcon }),
    },
    {
      label: "Cà phê",
      icon: capheIcon,
      onPress: () => handleCategoryPress({ label: "Cà phê", icon: capheIcon }),
    },
  ];

  if (loading) {
    return (
      <>
        <HomeHeader
          onNotificationPress={() => console.log("Notification pressed")}
          onCartPress={() => console.log("Cart pressed")}
          onSearchPress={handleSearchPress}
        />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
          <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
        </View>
      </>
    );
  }

  if (error) {
    return (
      <>
        <HomeHeader
          onNotificationPress={() => console.log("Notification pressed")}
          onCartPress={() => console.log("Cart pressed")}
          onSearchPress={handleSearchPress}
        />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Có lỗi xảy ra: {error}</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <HomeHeader
        onNotificationPress={() => console.log("Notification pressed")}
        onCartPress={() => console.log("Cart pressed")}
        onSearchPress={handleSearchPress}
      />

      {/* Search row */}
      <View style={styles.headerRow}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Tìm món, quán..."
          style={styles.searchInput}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.filterButton} onPress={() => console.log("Filter")}>
          <Ionicons name="filter" size={20} color={COLORS.ICON_PRIMARY} />
        </TouchableOpacity>
      </View>

      <Label title="Món ăn giảm giá" style={styles.section} allStyle={styles.labelAllBlue} />
      <Carousel style={styles.section} />
      <CategoryGrid data={categories} style={styles.section} />

      {/* Quick actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickActionCard} onPress={() => console.log("Favorites")}>
          <Text style={styles.quickActionText}>Quán yêu thích</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionCard} onPress={() => console.log("Repeat")}>
          <Text style={styles.quickActionText}>Đặt lại đơn trước</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionCard} onPress={() => console.log("Recent")}>
          <Text style={styles.quickActionText}>Gần đây</Text>
        </TouchableOpacity>
      </View>

      <Label
        title="Món ăn nổi bật"
        allText="Tất cả"
        style={styles.section}
        allStyle={styles.labelAllRed}
      />

      {/* Suggestions (typeahead) or merchant list */}
      {query ? (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.foodCardWrapper}>
              <FoodCard
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                rating={item.rating}
                ratingCount={item.ratingCount}
                isFavorite={item.isFavorite}
                time={item.time}
                kcal={item.kcal}
                price={item.price}
                onAdd={() => {}}
                onFavorite={() => {}}
              />
            </View>
          )}
        />
      ) : (
        <FlatList
          data={products.slice(0, 10)}
          keyExtractor={(item) => String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.merchantCard}>
              <FoodCard
                image={item.image}
                title={item.title}
                subtitle={`${item.kcal} • ${item.time} phút`}
                rating={item.rating}
                ratingCount={item.ratingCount}
                isFavorite={item.isFavorite}
                time={item.time}
                kcal={item.kcal}
                price={item.price}
                onAdd={() => {}}
                onFavorite={() => {}}
              />
            </View>
          )}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: SIZES.SPACING.MD,
  },
  errorText: {
    color: COLORS.ERROR,
    fontSize: SIZES.FONT.MEDIUM,
    textAlign: "center",
  },
  filterButton: {
    marginLeft: SIZES.SPACING.SM,
    padding: SIZES.SPACING.SM,
  },
  foodCardWrapper: {
    marginBottom: SIZES.SPACING.SM,
    width: "48%",
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.SPACING.SM,
    paddingHorizontal: SIZES.SPACING.MD,
  },
  labelAllBlue: {
    color: COLORS.SECONDARY,
  },
  labelAllRed: {
    color: COLORS.PRIMARY,
  },
  loadingText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: SIZES.FONT.MEDIUM,
    marginTop: SIZES.SPACING.SM,
  },
  merchantCard: {
    marginRight: SIZES.SPACING.SM,
    width: 200,
  },
  quickActionCard: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: SIZES.RADIUS.MEDIUM,
    minWidth: 100,
    padding: SIZES.SPACING.SM,
  },
  quickActionText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: SIZES.FONT.MEDIUM,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SIZES.SPACING.SM,
    paddingHorizontal: SIZES.SPACING.MD,
  },
  searchInput: {
    backgroundColor: COLORS.INPUT_BACKGROUND,
    borderRadius: SIZES.RADIUS.MEDIUM,
    flex: 1,
    padding: SIZES.SPACING.SM,
  },
  section: {
    marginVertical: SIZES.SPACING.SM,
  },
});

export default withScreenContainer(HomeScreen);

// Disable the ScreenContainer ScrollView for this screen because it uses FlatList (virtualized lists)
type _StaticOpts = { useScreenScroll?: boolean };
(HomeScreen as unknown as _StaticOpts).useScreenScroll = false;
