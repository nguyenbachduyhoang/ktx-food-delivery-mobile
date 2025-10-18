import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageSourcePropType,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Animated, { FadeInDown } from "react-native-reanimated";
import { HomeHeader } from "@components/shared";
import Label from "@components/Label";
import Carousel from "@components/Carousel";
import CategoryGrid, { CategoryItem } from "@components/CategoryGrid";
import FoodCard from "@components/FoodCard";
import AnimatedPressable from "@components/AnimatedPressable";
import { SkeletonCard } from "@components/SkeletonLoader";
import withScreenContainer from "@components/layouts/withScreenContainer";
import { useProducts } from "@hooks/useProducts";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

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
  const [refreshing, setRefreshing] = React.useState(false);

  // Local state for basic typeahead/search suggestions
  const [query] = React.useState("");
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refresh - in real app, refetch data
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

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

  const renderLoadingSkeleton = () => (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <FlatList
          data={[1, 2, 3]}
          keyExtractor={(item) => `skeleton-${item}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={() => <SkeletonCard />}
        />
      </View>
    </ScrollView>
  );

  if (loading) {
    return (
      <>
        <HomeHeader
          onNotificationPress={() => console.log("Notification pressed")}
          onCartPress={() => console.log("Cart pressed")}
          onSearchPress={handleSearchPress}
        />
        {renderLoadingSkeleton()}
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
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.PRIMARY]}
              tintColor={COLORS.PRIMARY}
            />
          }
        >
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>Có lỗi xảy ra: {error}</Text>
            <AnimatedPressable style={styles.retryButton} onPress={onRefresh}>
              <Text style={styles.retryText}>Thử lại</Text>
            </AnimatedPressable>
          </View>
        </ScrollView>
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
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.PRIMARY]}
            tintColor={COLORS.PRIMARY}
          />
        }
      >
        <Animated.View entering={FadeInDown.delay(100).duration(400)}>
          <Label title="Món ăn giảm giá" style={styles.section} allStyle={styles.labelAllBlue} />
          <Carousel style={styles.section} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(400)}>
          <CategoryGrid data={categories} style={styles.section} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(400)}>
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
              renderItem={({ item, index }) => (
                <Animated.View
                  entering={FadeInDown.delay(index * 50).duration(400)}
                  style={styles.foodCardWrapper}
                >
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
                </Animated.View>
              )}
            />
          ) : (
            <FlatList
              data={products.slice(0, 10)}
              keyExtractor={(item) => String(item.id)}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <Animated.View
                  entering={FadeInDown.delay(index * 50).duration(400)}
                  style={styles.merchantCard}
                >
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
                </Animated.View>
              )}
            />
          )}
        </Animated.View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: SIZES.SPACING.XL,
  },
  container: {
    flex: 1,
  },
  errorText: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.ERROR,
    marginBottom: SIZES.SPACING.MD,
    textAlign: "center",
  },
  foodCardWrapper: {
    marginBottom: SIZES.SPACING.SM,
    width: "48%",
  },
  labelAllBlue: {
    color: COLORS.SECONDARY,
  },
  labelAllRed: {
    color: COLORS.PRIMARY,
  },
  merchantCard: {
    marginRight: SIZES.SPACING.SM,
    width: 200,
  },

  retryButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: SIZES.RADIUS.MEDIUM,
    paddingHorizontal: SIZES.SPACING.XL,
    paddingVertical: SIZES.SPACING.SM,
  },
  retryText: {
    ...TEXT_STYLES.BUTTON_MEDIUM,
    color: COLORS.TEXT_WHITE,
    fontWeight: "600",
  },
  section: {
    marginVertical: SIZES.SPACING.SM,
  },
});

// Disable the ScreenContainer ScrollView for this screen because it uses FlatList (virtualized lists)
type _StaticOpts = { useScreenScroll?: boolean };
(HomeScreen as unknown as _StaticOpts).useScreenScroll = false;

export default withScreenContainer(HomeScreen);
