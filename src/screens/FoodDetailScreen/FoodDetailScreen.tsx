import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, TEXT_STYLES } from "@constants/index";
import phoImg from "../../../assets/category/pho.png";
import banhmiImg from "../../../assets/category/banhmi.png";
import goicuonImg from "../../../assets/category/goicuon.png";
import capheImg from "../../../assets/category/caphe.png";
import FoodCard from "@components/FoodCard";
import Button from "@components/Button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FoodDetailScreen = ({ navigation }: any) => {
  const [isFavorite, setIsFavorite] = useState(false);
  // quantity removed (not used in this screen)

  // Sample data for suggested items
  const suggestedItems = [
    {
      id: 1,
      image: phoImg,
      title: "Phở bò",
      subtitle: "Cổ Sen",
      rating: 4.8,
      ratingCount: "1.5k",
      time: "15 phút",
      kcal: "350",
      price: "30.000đ",
      isFavorite: false,
    },
    {
      id: 2,
      image: banhmiImg,
      title: "Phở gà",
      subtitle: "Cổ Sen",
      rating: 4.6,
      ratingCount: "1.2k",
      time: "12 phút",
      kcal: "320",
      price: "30.000đ",
      isFavorite: false,
    },
    {
      id: 3,
      image: goicuonImg,
      title: "Phở bò đặc biệt",
      subtitle: "Cổ Sen",
      rating: 4.9,
      ratingCount: "2k",
      time: "18 phút",
      kcal: "400",
      price: "38.000đ",
      isFavorite: false,
    },
    {
      id: 4,
      image: capheImg,
      title: "Phở gà đặc biệt",
      subtitle: "Cổ Sen",
      rating: 4.7,
      ratingCount: "1.8k",
      time: "15 phút",
      kcal: "370",
      price: "38.000đ",
      isFavorite: false,
    },
  ];

  // removed unused handler

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="share-social-outline" size={24} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="ellipsis-horizontal" size={24} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Food Image */}
        <Image source={phoImg} style={styles.heroImage} resizeMode="cover" />

        {/* Restaurant Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.restaurantRow}>
            <View style={styles.restaurantInfo}>
              <View style={styles.restaurantIcon}>
                <Text style={styles.restaurantIconText}>🍜</Text>
              </View>
              <View style={styles.restaurantDetails}>
                <Text style={styles.restaurantName}>Cổ Sen</Text>
                <View style={styles.badgeContainer}>
                  <View style={styles.badge}>
                    <Ionicons name="location" size={12} color={COLORS.ERROR} />
                  </View>
                  <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                    <Ionicons
                      name={isFavorite ? "heart" : "heart-outline"}
                      size={20}
                      color={isFavorite ? COLORS.ERROR : COLORS.TEXT_LIGHT}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Food Title */}
          <Text style={styles.foodTitle}>Phở bò</Text>
          <Text style={styles.foodLabel}>Thô-bò</Text>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="star" size={16} color={COLORS.WARNING} />
              <Text style={styles.statText}>4.8 Rating</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="bag-outline" size={16} color={COLORS.TEXT_SECONDARY} />
              <Text style={styles.statText}>300+ Đơn</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={16} color={COLORS.TEXT_SECONDARY} />
              <Text style={styles.statText}>15 phút</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>
            Phở bò là món ăn truyền thống nổi tiếng của Việt Nam, với nước dùng được hầm từ xương bò
            cùng các gia vị như quế, hồi, gừng, tạo nên hương vị đậm đà. Bánh phở mềm mại, thịt bò
            tươi ngon, ăn kèm với rau thơm và sa tế làm món ăn này trở thành lựa chọn yêu thích.
          </Text>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Button title="Thêm vào đơn hàng" onPress={() => {}} style={styles.addButton} />
            <Button
              title="Thanh toán"
              onPress={() => {}}
              style={styles.payButton}
              textStyle={styles.payButtonText}
            />
          </View>
        </View>

        {/* Suggested Items */}
        <View style={styles.suggestedSection}>
          <Text style={styles.sectionTitle}>Gợi ý cho bạn</Text>
          <View style={styles.suggestedGrid}>
            {suggestedItems.map((item) => (
              <FoodCard
                key={item.id}
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                rating={item.rating}
                ratingCount={item.ratingCount}
                time={item.time}
                kcal={item.kcal}
                price={item.price}
                isFavorite={item.isFavorite}
                onAdd={() => {}}
                onFavorite={() => {}}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: "row",
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: COLORS.ERROR_LIGHT || "#FEE",
    flex: 1,
    marginRight: 12,
    marginTop: 0,
  },
  badge: {
    alignItems: "center",
    backgroundColor: COLORS.ERROR_LIGHT || "#FEE",
    borderRadius: 4,
    flexDirection: "row",
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  container: {
    backgroundColor: COLORS.BACKGROUND,
    flex: 1,
  },
  description: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 20,
    marginBottom: 20,
  },
  foodLabel: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.ERROR,
    marginBottom: 12,
  },
  foodTitle: {
    ...TEXT_STYLES.H2,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
    marginBottom: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 10,
  },
  headerBtn: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 20,
    elevation: 3,
    height: 40,
    justifyContent: "center",
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: 40,
  },
  heroImage: {
    height: 250,
    width: "100%",
  },
  infoCard: {
    backgroundColor: COLORS.BACKGROUND,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  payButton: {
    backgroundColor: COLORS.ERROR || COLORS.BUTTON_PRIMARY,
    flex: 1,
    marginTop: 0,
  },
  payButtonText: {
    color: COLORS.TEXT_WHITE,
  },
  restaurantDetails: {
    flex: 1,
  },
  restaurantIcon: {
    alignItems: "center",
    backgroundColor: COLORS.WARNING_LIGHT || "#FFF4E6",
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    marginRight: 12,
    width: 40,
  },
  restaurantIconText: {
    fontSize: 20,
  },
  restaurantInfo: {
    alignItems: "center",
    flexDirection: "row",
  },
  restaurantName: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
    marginBottom: 4,
  },
  restaurantRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    ...TEXT_STYLES.H3,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
    marginBottom: 16,
  },
  statItem: {
    alignItems: "center",
    flexDirection: "row",
    marginRight: 12,
  },
  statText: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
  },
  statsRow: {
    alignItems: "center",
    borderBottomColor: COLORS.BORDER,
    borderBottomWidth: 1,
    flexDirection: "row",
    marginBottom: 16,
    paddingBottom: 16,
  },
  suggestedGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  suggestedSection: {
    paddingBottom: 32,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
});

export default FoodDetailScreen;
