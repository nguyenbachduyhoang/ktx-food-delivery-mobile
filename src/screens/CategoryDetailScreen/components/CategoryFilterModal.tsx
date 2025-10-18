import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "@components/Button";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

interface CategoryFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

export interface FilterOptions {
  sortBy: "popular" | "distance" | "priceAsc" | "priceDesc" | "rating";
  distance: "all" | "1km" | "3km" | "5km";
  priceRange: "all" | "under50" | "50to100" | "over100";
  openNow: boolean;
}

const CategoryFilterModal: React.FC<CategoryFilterModalProps> = ({
  visible,
  onClose,
  onApply,
  currentFilters,
}) => {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    const defaultFilters: FilterOptions = {
      sortBy: "popular",
      distance: "all",
      priceRange: "all",
      openNow: false,
    };
    setFilters(defaultFilters);
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
  }: {
    label: string;
    selected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[styles.option, selected && styles.optionSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{label}</Text>
      {selected && <Ionicons name="checkmark" size={20} color={COLORS.PRIMARY} />}
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Bộ lọc & sắp xếp</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={SIZES.HEADER.ICON_SIZE} color={COLORS.TEXT_PRIMARY} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Sắp xếp */}
            <FilterSection title="Sắp xếp theo">
              <FilterOption
                label="Phổ biến nhất"
                selected={filters.sortBy === "popular"}
                onPress={() => setFilters({ ...filters, sortBy: "popular" })}
              />
              <FilterOption
                label="Gần tôi nhất"
                selected={filters.sortBy === "distance"}
                onPress={() => setFilters({ ...filters, sortBy: "distance" })}
              />
              <FilterOption
                label="Giá: Thấp đến cao"
                selected={filters.sortBy === "priceAsc"}
                onPress={() => setFilters({ ...filters, sortBy: "priceAsc" })}
              />
              <FilterOption
                label="Giá: Cao đến thấp"
                selected={filters.sortBy === "priceDesc"}
                onPress={() => setFilters({ ...filters, sortBy: "priceDesc" })}
              />
              <FilterOption
                label="Đánh giá cao nhất"
                selected={filters.sortBy === "rating"}
                onPress={() => setFilters({ ...filters, sortBy: "rating" })}
              />
            </FilterSection>

            {/* Khoảng cách */}
            <FilterSection title="Khoảng cách">
              <FilterOption
                label="Tất cả"
                selected={filters.distance === "all"}
                onPress={() => setFilters({ ...filters, distance: "all" })}
              />
              <FilterOption
                label="Dưới 1 km"
                selected={filters.distance === "1km"}
                onPress={() => setFilters({ ...filters, distance: "1km" })}
              />
              <FilterOption
                label="Dưới 3 km"
                selected={filters.distance === "3km"}
                onPress={() => setFilters({ ...filters, distance: "3km" })}
              />
              <FilterOption
                label="Dưới 5 km"
                selected={filters.distance === "5km"}
                onPress={() => setFilters({ ...filters, distance: "5km" })}
              />
            </FilterSection>

            {/* Giá */}
            <FilterSection title="Khoảng giá">
              <FilterOption
                label="Tất cả"
                selected={filters.priceRange === "all"}
                onPress={() => setFilters({ ...filters, priceRange: "all" })}
              />
              <FilterOption
                label="Dưới 50k"
                selected={filters.priceRange === "under50"}
                onPress={() => setFilters({ ...filters, priceRange: "under50" })}
              />
              <FilterOption
                label="50k - 100k"
                selected={filters.priceRange === "50to100"}
                onPress={() => setFilters({ ...filters, priceRange: "50to100" })}
              />
              <FilterOption
                label="Trên 100k"
                selected={filters.priceRange === "over100"}
                onPress={() => setFilters({ ...filters, priceRange: "over100" })}
              />
            </FilterSection>

            {/* Trạng thái */}
            <FilterSection title="Trạng thái">
              <TouchableOpacity
                style={styles.checkboxOption}
                onPress={() => setFilters({ ...filters, openNow: !filters.openNow})}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, filters.openNow && styles.checkboxChecked]}>
                  {filters.openNow && <Ionicons name="checkmark" size={18} color={COLORS.BACKGROUND} />}
                </View>
                <Text style={styles.checkboxLabel}>Chỉ hiển thị quán đang mở</Text>
              </TouchableOpacity>
            </FilterSection>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
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
  checkbox: {
    alignItems: "center",
    borderColor: COLORS.BORDER,
    borderRadius: SIZES.RADIUS.SMALL / 2,
    borderWidth: 2,
    height: 24,
    justifyContent: "center",
    marginRight: SIZES.SPACING.SM,
    width: 24,
  },
  checkboxChecked: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  checkboxLabel: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
  },
  checkboxOption: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    borderColor: COLORS.BORDER,
    borderRadius: SIZES.RADIUS.MEDIUM,
    borderWidth: 1,
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
    paddingHorizontal: SIZES.SPACING.MD,
    paddingTop: SIZES.SPACING.MD,
    paddingBottom: SIZES.SPACING.MD,
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
  headerTitle: {
    ...TEXT_STYLES.H5,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "600",
  },
  modalContent: {
    backgroundColor: COLORS.BACKGROUND,
    borderTopLeftRadius: SIZES.RADIUS.EXTRA_LARGE,
    borderTopRightRadius: SIZES.RADIUS.EXTRA_LARGE,
    flex: 1,
    marginTop: "20%",
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.SPACING.SM,
    paddingHorizontal: SIZES.SPACING.MD,
    paddingVertical: SIZES.SPACING.MD,
  },
  optionSelected: {
    backgroundColor: COLORS.PRIMARY_LIGHT + "20",
    borderColor: COLORS.PRIMARY,
    borderWidth: 2,
  },
  optionText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
  },
  optionTextSelected: {
    color: COLORS.PRIMARY,
    fontWeight: "600",
  },
  resetButton: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: SIZES.RADIUS.MEDIUM,
    flex: 1,
    justifyContent: "center",
    marginRight: SIZES.SPACING.SM,
    paddingVertical: SIZES.SPACING.MD,
  },
  resetText: {
    ...TEXT_STYLES.BUTTON_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "600",
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

export default CategoryFilterModal;
