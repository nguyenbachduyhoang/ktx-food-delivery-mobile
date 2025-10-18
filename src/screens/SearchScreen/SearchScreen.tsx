import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import withScreenContainer from "@components/layouts/withScreenContainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
  const [searchSuggestions] = useState([
    "Cơm Tấm",
    "Bún Bò",
    "Mì trộn",
    "Ăn vặt",
    "Trà sữa",
    "Bánh mì",
  ]);

  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSearch = (text: string) => {
    if (text.trim()) {
      // Add to recent searches if not already there
      if (!recentSearches.includes(text.trim())) {
        setRecentSearches([text.trim(), ...recentSearches.slice(0, 5)]);
      }
      // Navigate to search results or perform search
      console.log("Searching for:", text);
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    setSearchText(suggestion);
    handleSearch(suggestion);
  };

  const clearSearch = () => {
    setSearchText("");
  };

  const renderSearchTag = (text: string, onPress: () => void) => (
    <TouchableOpacity key={text} style={styles.searchTag} onPress={onPress}>
      <Text style={styles.searchTagText}>{text}</Text>
    </TouchableOpacity>
  );

  const showSuggestions = searchText.length > 0;

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color={COLORS.TEXT_LIGHT} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Mì Ý"
              placeholderTextColor={COLORS.TEXT_LIGHT}
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={() => handleSearch(searchText)}
              autoFocus
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                <Ionicons name="close" size={20} color={COLORS.TEXT_LIGHT} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {showSuggestions ? (
          /* Search Suggestions */
          <View style={styles.section}>
            <View style={styles.tagsContainer}>
              {searchSuggestions.map((suggestion) =>
                renderSearchTag(suggestion, () => handleSuggestionPress(suggestion))
              )}
            </View>
          </View>
        ) : (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tìm kiếm gần đây</Text>
                <View style={styles.tagsContainer}>
                  {recentSearches.map((search) =>
                    renderSearchTag(search, () => handleSuggestionPress(search))
                  )}
                </View>
              </View>
            )}

            {/* Popular Searches */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Phổ biến</Text>
              <View style={styles.tagsContainer}>
                {popularSearches.map((search) =>
                  renderSearchTag(search, () => handleSuggestionPress(search))
                )}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    marginRight: SIZES.SPACING.SM,
    width: 40,
  },
  clearButton: {
    padding: 4,
  },
  container: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SIZES.SPACING.MD,
  },
  header: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    flexDirection: "row",
    paddingHorizontal: SIZES.SPACING.MD,
    paddingVertical: SIZES.SPACING.SM,
  },
  searchBox: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    borderColor: COLORS.ERROR,
    borderRadius: SIZES.RADIUS.MEDIUM,
    borderWidth: 1,
    flexDirection: "row",
    height: 44,
    paddingHorizontal: SIZES.SPACING.SM,
  },
  searchContainer: {
    flex: 1,
  },
  searchIcon: {
    marginRight: SIZES.SPACING.XS,
  },
  searchInput: {
    flex: 1,
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    padding: 0,
  },
  searchTag: {
    backgroundColor: COLORS.BACKGROUND,
    borderColor: COLORS.ERROR,
    borderRadius: SIZES.RADIUS.EXTRA_LARGE,
    borderWidth: 1,
    paddingHorizontal: SIZES.SPACING.MD,
    paddingVertical: SIZES.SPACING.XS,
  },
  searchTagText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.ERROR,
  },
  section: {
    marginBottom: SIZES.SPACING.LG,
  },
  sectionTitle: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "600",
    marginBottom: SIZES.SPACING.MD,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SIZES.SPACING.SM,
  },
});

export default withScreenContainer(SearchScreen);
