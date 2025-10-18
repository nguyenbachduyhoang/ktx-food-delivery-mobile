import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "@components/Button";
import AnimatedPressable from "@components/AnimatedPressable";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";
import type { FilterOptions } from "@screens/FoodOrderScreen/types";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
  currentFilters,
}) => {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(currentFilters);

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleReset = () => {
    const defaultFilters: FilterOptions = {
      sortBy: "popular",
      distance: "all",
      priceRange: "all",
      openNow: false,
    };
    setLocalFilters(defaultFilters);
  };

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const FilterOption = ({
    label,
    selected,
    onPress,
    icon,
  }: {
    label: string;
    selected: boolean;
    onPress: () => void;
    icon?: string;
  }) => (
    <AnimatedPressable
      style={[styles.option, selected && styles.optionSelected]}
      onPress={onPress}
      scaleValue={0.98}
      hapticType="light"
    >
      {icon && (
        <View style={styles.optionIconContainer}>
          <Ionicons
            name={icon as any}
            size={20}
            color={selected ? COLORS.PRIMARY : COLORS.TEXT_SECONDARY}
          />
        </View>
      )}
      <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{label}</Text>
      {selected && (
        <View style={styles.checkContainer}>
          <Ionicons name="checkmark-circle" size={22} color={COLORS.PRIMARY} />
        </View>
      )}
    </AnimatedPressable>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Ionicons name="options" size={24} color={COLORS.PRIMARY} />
              <Text style={styles.headerTitle}>Bộ lọc & sắp xếp</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={SIZES.HEADER.ICON_SIZE} color={COLORS.TEXT_PRIMARY} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            {/* Sắp xếp */}
            <FilterSection title="📊 Sắp xếp theo">
              <FilterOption
                label="Phổ biến nhất"
                icon="flame"
                selected={localFilters.sortBy === "popular"}
                onPress={() => setLocalFilters({ ...localFilters, sortBy: "popular" })}
              />
              <FilterOption
                label="Gần tôi nhất"
                icon="location"
                selected={localFilters.sortBy === "distance"}
                onPress={() => setLocalFilters({ ...localFilters, sortBy: "distance" })}
              />
              <FilterOption
                label="Giá: Thấp đến cao"
                icon="arrow-up"
                selected={localFilters.sortBy === "priceAsc"}
                onPress={() => setLocalFilters({ ...localFilters, sortBy: "priceAsc" })}
              />
              <FilterOption
                label="Giá: Cao đến thấp"
                icon="arrow-down"
                selected={localFilters.sortBy === "priceDesc"}
                onPress={() => setLocalFilters({ ...localFilters, sortBy: "priceDesc" })}
              />
              <FilterOption
                label="Đánh giá cao nhất"
                icon="star"
                selected={localFilters.sortBy === "rating"}
                onPress={() => setLocalFilters({ ...localFilters, sortBy: "rating" })}
              />
            </FilterSection>

            {/* Khoảng cách */}
            <FilterSection title="📍 Khoảng cách">
              <FilterOption
                label="Tất cả"
                selected={localFilters.distance === "all"}
                onPress={() => setLocalFilters({ ...localFilters, distance: "all" })}
              />
              <FilterOption
                label="Dưới 1 km"
                selected={localFilters.distance === "1km"}
                onPress={() => setLocalFilters({ ...localFilters, distance: "1km" })}
              />
              <FilterOption
                label="Dưới 3 km"
                selected={localFilters.distance === "3km"}
                onPress={() => setLocalFilters({ ...localFilters, distance: "3km" })}
              />
              <FilterOption
                label="Dưới 5 km"
                selected={localFilters.distance === "5km"}
                onPress={() => setLocalFilters({ ...localFilters, distance: "5km" })}
              />
            </FilterSection>

            {/* Giá */}
            <FilterSection title="💰 Khoảng giá">
              <FilterOption
                label="Tất cả"
                selected={localFilters.priceRange === "all"}
                onPress={() => setLocalFilters({ ...localFilters, priceRange: "all" })}
              />
              <FilterOption
                label="Dưới 50k"
                selected={localFilters.priceRange === "under50"}
                onPress={() => setLocalFilters({ ...localFilters, priceRange: "under50" })}
              />
              <FilterOption
                label="50k - 100k"
                selected={localFilters.priceRange === "50to100"}
                onPress={() => setLocalFilters({ ...localFilters, priceRange: "50to100" })}
              />
              <FilterOption
                label="Trên 100k"
                selected={localFilters.priceRange === "over100"}
                onPress={() => setLocalFilters({ ...localFilters, priceRange: "over100" })}
              />
            </FilterSection>

            {/* Trạng thái */}
            <FilterSection title="🕐 Trạng thái">
              <AnimatedPressable
                style={styles.checkboxOption}
                onPress={() => setLocalFilters({ ...localFilters, openNow: !localFilters.openNow })}
                scaleValue={0.98}
                hapticType="light"
              >
                <View style={[styles.checkbox, localFilters.openNow && styles.checkboxChecked]}>
                  {localFilters.openNow && (
                    <Ionicons name="checkmark" size={18} color={COLORS.BACKGROUND} />
                  )}
                </View>
                <View style={styles.checkboxContent}>
                  <Text style={styles.checkboxLabel}>Chỉ hiển thị quán đang mở</Text>
                  <Text style={styles.checkboxDesc}>Lọc các quán đang hoạt động</Text>
                </View>
              </AnimatedPressable>
            </FilterSection>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Ionicons name="refresh" size={20} color={COLORS.TEXT_PRIMARY} />
              <Text style={styles.resetText}>Đặt lại</Text>
            </TouchableOpacity>
            <Button title="Áp dụng" onPress={handleApply} style={styles.applyButton} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  applyButton: {
    flex: 1,
    marginLeft: SIZES.SPACING.SM,
  },
  checkContainer: {
    marginLeft: "auto",
  },
  checkbox: {
    alignItems: "center",
    borderColor: COLORS.BORDER,
    borderRadius: SIZES.RADIUS.SMALL,
    borderWidth: 2,
    height: 24,
    justifyContent: "center",
    marginRight: SIZES.SPACING.MD,
    width: 24,
  },
  checkboxChecked: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  checkboxContent: {
    flex: 1,
  },
  checkboxDesc: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_LIGHT,
    marginTop: 2,
  },
  checkboxLabel: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "600",
  },
  checkboxOption: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: SIZES.RADIUS.MEDIUM,
    flexDirection: "row",
    marginBottom: SIZES.SPACING.SM,
    padding: SIZES.SPACING.MD,
  },
  closeButton: {
    padding: SIZES.SPACING.XS,
  },
  footer: {
    borderTopColor: COLORS.DIVIDER,
    borderTopWidth: 1,
    flexDirection: "row",
    paddingBottom: SIZES.SPACING.MD,
    paddingHorizontal: SIZES.SPACING.MD,
    paddingTop: SIZES.SPACING.MD,
  },
  header: {
    alignItems: "center",
    borderBottomColor: COLORS.DIVIDER,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.SPACING.MD,
    paddingVertical: SIZES.SPACING.MD,
  },
  headerLeft: {
    alignItems: "center",
    flexDirection: "row",
  },
  headerTitle: {
    ...TEXT_STYLES.H5,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
    marginLeft: SIZES.SPACING.SM,
  },
  modalContent: {
    backgroundColor: COLORS.BACKGROUND,
    borderTopLeftRadius: SIZES.RADIUS.EXTRA_LARGE,
    borderTopRightRadius: SIZES.RADIUS.EXTRA_LARGE,
    flex: 1,
    marginTop: "15%",
  },
  modalOverlay: {
    backgroundColor: COLORS.OVERLAY,
    flex: 1,
    justifyContent: "flex-end",
  },
  option: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    borderColor: COLORS.BORDER,
    borderRadius: SIZES.RADIUS.MEDIUM,
    borderWidth: 1,
    elevation: 1,
    flexDirection: "row",
    marginBottom: SIZES.SPACING.SM,
    paddingHorizontal: SIZES.SPACING.MD,
    paddingVertical: SIZES.SPACING.MD,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  optionIconContainer: {
    marginRight: SIZES.SPACING.SM,
  },
  optionSelected: {
    backgroundColor: COLORS.PRIMARY_LIGHT + "15",
    borderColor: COLORS.PRIMARY,
    borderWidth: 2,
  },
  optionText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
  },
  optionTextSelected: {
    color: COLORS.PRIMARY,
    fontWeight: "700",
  },
  resetButton: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: SIZES.RADIUS.MEDIUM,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginRight: SIZES.SPACING.SM,
    paddingVertical: SIZES.SPACING.MD,
  },
  resetText: {
    ...TEXT_STYLES.BUTTON_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "600",
    marginLeft: SIZES.SPACING.XS,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: SIZES.SPACING.LG,
    paddingHorizontal: SIZES.SPACING.MD,
    paddingTop: SIZES.SPACING.MD,
  },
  sectionTitle: {
    ...TEXT_STYLES.H6,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
    marginBottom: SIZES.SPACING.MD,
  },
});

export default FilterModal;

