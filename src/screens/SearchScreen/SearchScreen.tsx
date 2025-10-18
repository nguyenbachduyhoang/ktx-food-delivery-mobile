import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeIn, FadeOut } from "react-native-reanimated";
import AnimatedPressable from "@components/AnimatedPressable";
import withScreenContainer from "@components/layouts/withScreenContainer";
import { SharedHeader } from "@components/shared";
import { StackNavigationProp } from "@react-navigation/stack";
import { COLORS, TEXT_STYLES, SIZES } from "@constants/index";

type RootStackParamList = {
  Search: undefined;
};

interface SearchScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "Search">;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    "Cơm Tấm",
    "Bún Bò",
    "Mì trộn",
    "Ăn vặt",
    "Trà sữa",
    "Bánh mì",
  ]);
  const [popularSearches] = useState([
    "Cơm Tấm",
    "Bún Bò",
    "Mì trộn",
    "Ăn vặt",
    "Trà sữa",
    "Bánh mì",
  ]);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);

  // Debounce search text
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
      setIsSearching(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText]);

  // Filter suggestions based on debounced search text
  useEffect(() => {
    if (debouncedSearchText.trim()) {
      const allItems = [...recentSearches, ...popularSearches];
      const filtered = allItems.filter((item) =>
        item.toLowerCase().includes(debouncedSearchText.toLowerCase())
      );
      setSearchSuggestions([...new Set(filtered)]);
    } else {
      setSearchSuggestions([]);
    }
  }, [debouncedSearchText, recentSearches, popularSearches]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSearch = useCallback((text: string) => {
    if (text.trim()) {
      // Add to recent searches if not already there
      if (!recentSearches.includes(text.trim())) {
        setRecentSearches([text.trim(), ...recentSearches.slice(0, 5)]);
      }
      // Navigate to search results or perform search
      console.log("Searching for:", text);
    }
  }, [recentSearches]);

  const handleSuggestionPress = useCallback((suggestion: string) => {
    setSearchText(suggestion);
    handleSearch(suggestion);
  }, [handleSearch]);

  const clearSearch = useCallback(() => {
    setSearchText("");
    setDebouncedSearchText("");
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, []);

  const renderSearchTag = (text: string, onPress: () => void, index: number) => (
    <Animated.View 
      key={text} 
      entering={FadeInDown.delay(index * 50).duration(300)}
    >
      <AnimatedPressable 
        style={styles.searchTag} 
        onPress={onPress}
        scaleValue={0.95}
        hapticType="light"
      >
        <Text style={styles.searchTagText}>{text}</Text>
      </AnimatedPressable>
    </Animated.View>
  );

  const showSuggestions = debouncedSearchText.length > 0;

  return (
    <View style={styles.wrapper}>
      <SharedHeader title="Tìm kiếm" showBackButton onBackPress={handleBackPress} />
      
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={SIZES.HEADER.ICON_SIZE} color={COLORS.TEXT_LIGHT} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm món ăn, quán ăn..."
              placeholderTextColor={COLORS.TEXT_LIGHT}
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={() => handleSearch(searchText)}
              autoFocus
              returnKeyType="search"
            />
            {isSearching && (
              <ActivityIndicator size="small" color={COLORS.PRIMARY} />
            )}
            {searchText.length > 0 && !isSearching && (
              <Animated.View entering={FadeIn} exiting={FadeOut}>
                <AnimatedPressable 
                  onPress={clearSearch} 
                  style={styles.clearButton}
                  enableHaptic={false}
                >
                  <Ionicons name="close-circle" size={SIZES.HEADER.ICON_SIZE} color={COLORS.TEXT_LIGHT} />
                </AnimatedPressable>
              </Animated.View>
            )}
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {showSuggestions ? (
          /* Search Suggestions */
          <Animated.View entering={FadeIn} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Kết quả cho "{debouncedSearchText}"
              </Text>
              <Text style={styles.resultCount}>
                {searchSuggestions.length} kết quả
              </Text>
            </View>
            {searchSuggestions.length > 0 ? (
              <View style={styles.tagsContainer}>
                {searchSuggestions.map((suggestion, index) =>
                  renderSearchTag(suggestion, () => handleSuggestionPress(suggestion), index)
                )}
              </View>
            ) : (
              <Animated.View entering={FadeInDown} style={styles.emptyState}>
                <Ionicons name="search-outline" size={48} color={COLORS.TEXT_LIGHT} />
                <Text style={styles.emptyText}>Không tìm thấy kết quả</Text>
                <Text style={styles.emptySubtext}>Thử tìm kiếm với từ khóa khác</Text>
              </Animated.View>
            )}
          </Animated.View>
        ) : (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <Animated.View entering={FadeInDown.delay(100)} style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Tìm kiếm gần đây</Text>
                  <AnimatedPressable onPress={clearRecentSearches}>
                    <Text style={styles.clearAllText}>Xóa tất cả</Text>
                  </AnimatedPressable>
                </View>
                <View style={styles.tagsContainer}>
                  {recentSearches.map((search, index) =>
                    renderSearchTag(search, () => handleSuggestionPress(search), index)
                  )}
                </View>
              </Animated.View>
            )}

            {/* Popular Searches */}
            <Animated.View entering={FadeInDown.delay(200)} style={styles.section}>
              <Text style={styles.sectionTitle}>Phổ biến</Text>
              <View style={styles.tagsContainer}>
                {popularSearches.map((search, index) =>
                  renderSearchTag(search, () => handleSuggestionPress(search), index)
                )}
              </View>
            </Animated.View>
          </>
        )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  clearAllText: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.PRIMARY,
    fontWeight: "600",
  },
  clearButton: {
    alignItems: "center",
    height: SIZES.HEADER.BUTTON_SIZE,
    justifyContent: "center",
    marginLeft: SIZES.SPACING.XS,
    width: SIZES.HEADER.BUTTON_SIZE,
  },
  container: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SIZES.SPACING.MD,
    paddingTop: SIZES.SPACING.SM,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: SIZES.SPACING.XL * 2,
  },
  emptySubtext: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_LIGHT,
    marginTop: SIZES.SPACING.XS,
  },
  emptyText: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SIZES.SPACING.MD,
  },
  resultCount: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
  },
  searchBox: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    borderColor: COLORS.PRIMARY,
    borderRadius: SIZES.RADIUS.MEDIUM,
    borderWidth: 1.5,
    elevation: 2,
    flexDirection: "row",
    height: 48,
    paddingHorizontal: SIZES.SPACING.MD,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchContainer: {
    backgroundColor: COLORS.BACKGROUND,
    paddingBottom: SIZES.SPACING.MD,
    paddingHorizontal: SIZES.SPACING.MD,
    paddingTop: SIZES.SPACING.SM,
  },
  searchIcon: {
    marginRight: SIZES.SPACING.SM,
  },
  searchInput: {
    ...TEXT_STYLES.INPUT_TEXT,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
    padding: 0,
  },
  searchTag: {
    backgroundColor: COLORS.BACKGROUND,
    borderColor: COLORS.PRIMARY,
    borderRadius: SIZES.RADIUS.EXTRA_LARGE,
    borderWidth: 1.5,
    paddingHorizontal: SIZES.SPACING.MD,
    paddingVertical: SIZES.SPACING.SM,
  },
  searchTagText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.PRIMARY,
    fontWeight: "600",
  },
  section: {
    marginBottom: SIZES.SPACING.LG,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.SPACING.MD,
  },
  sectionTitle: {
    ...TEXT_STYLES.H6,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SIZES.SPACING.SM,
  },
  wrapper: {
    flex: 1,
  },
});

export default withScreenContainer(SearchScreen);
