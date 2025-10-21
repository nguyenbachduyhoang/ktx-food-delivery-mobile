import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Animated, { FadeIn, FadeOut, SlideInUp, SlideOutDown } from "react-native-reanimated";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

interface Voucher {
  id: string;
  code: string;
  title: string;
  description: string;
  discount: string;
  minOrder: string;
  isActive: boolean;
}

interface VoucherModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectVoucher: (voucher: Voucher) => void;
  selectedVoucher?: Voucher;
}

const VoucherModal: React.FC<VoucherModalProps> = ({
  visible,
  onClose,
  onSelectVoucher,
  selectedVoucher,
}) => {
  const [searchCode, setSearchCode] = useState("");

  // Mock data for vouchers
  const vouchers: Voucher[] = [
    {
      id: "1",
      code: "WELCOME10",
      title: "Giảm 10% cho đơn đầu tiên",
      description: "Tối đa 20k cho đơn từ 50k",
      discount: "10%",
      minOrder: "50k",
      isActive: true,
    },
    {
      id: "2",
      code: "FREESHIP",
      title: "Miễn phí giao hàng",
      description: "Cho đơn từ 100k",
      discount: "Miễn phí ship",
      minOrder: "100k",
      isActive: true,
    },
    {
      id: "3",
      code: "SAVE20",
      title: "Tiết kiệm 20k",
      description: "Cho đơn từ 150k",
      discount: "20k",
      minOrder: "150k",
      isActive: false,
    },
  ];

  const handleSelectVoucher = (voucher: Voucher) => {
    onSelectVoucher(voucher);
    onClose();
  };

  const renderVoucherItem = ({ item }: { item: Voucher }) => (
    <TouchableOpacity
      style={[
        styles.voucherItem,
        selectedVoucher?.id === item.id && styles.selectedVoucher,
        !item.isActive && styles.disabledVoucher,
      ]}
      onPress={() => item.isActive && handleSelectVoucher(item)}
      disabled={!item.isActive}
    >
      <View style={styles.voucherLeft}>
        <View style={styles.voucherIcon}>
          <Ionicons name="pricetag" size={20} color={COLORS.PRIMARY} />
        </View>
        <View style={styles.voucherContent}>
          <Text style={[styles.voucherTitle, !item.isActive && styles.disabledText]}>
            {item.title}
          </Text>
          <Text style={[styles.voucherDescription, !item.isActive && styles.disabledText]}>
            {item.description}
          </Text>
          <Text style={[styles.voucherCode, !item.isActive && styles.disabledText]}>
            Mã: {item.code}
          </Text>
        </View>
      </View>
      <View style={styles.voucherRight}>
        <Text style={[styles.discountText, !item.isActive && styles.disabledText]}>
          {item.discount}
        </Text>
        {selectedVoucher?.id === item.id && (
          <Ionicons name="checkmark-circle" size={24} color={COLORS.PRIMARY} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <BlurView intensity={20} style={styles.overlay}>
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          style={styles.modalContainer}
        >
          <Animated.View
            entering={SlideInUp.duration(300)}
            exiting={SlideOutDown.duration(300)}
            style={styles.modalContent}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Mã giảm giá</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={COLORS.TEXT_LIGHT} />
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            <View style={styles.searchContainer}>
              <Ionicons
                name="search"
                size={20}
                color={COLORS.TEXT_LIGHT}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Nhập mã giảm giá"
                value={searchCode}
                onChangeText={setSearchCode}
                placeholderTextColor={COLORS.TEXT_LIGHT}
              />
            </View>

            {/* Voucher List */}
            <FlatList
              data={vouchers}
              keyExtractor={(item) => item.id}
              renderItem={renderVoucherItem}
              style={styles.voucherList}
              showsVerticalScrollIndicator={false}
            />

            {/* Footer */}
            <View style={styles.footer}>
              <TouchableOpacity style={styles.applyButton} onPress={onClose}>
                <Text style={styles.applyButtonText}>Áp dụng</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: COLORS.BACKGROUND,
    borderTopLeftRadius: SIZES.RADIUS.LARGE,
    borderTopRightRadius: SIZES.RADIUS.LARGE,
    maxHeight: "80%",
    paddingBottom: SIZES.SPACING.XL,
  },
  header: {
    alignItems: "center",
    borderBottomColor: COLORS.DIVIDER,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SIZES.SPACING.MD,
  },
  title: {
    ...TEXT_STYLES.H4,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
  },
  closeButton: {
    padding: SIZES.SPACING.XS,
  },
  searchContainer: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: SIZES.RADIUS.MEDIUM,
    flexDirection: "row",
    margin: SIZES.SPACING.MD,
    paddingHorizontal: SIZES.SPACING.MD,
  },
  searchIcon: {
    marginRight: SIZES.SPACING.SM,
  },
  searchInput: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
    paddingVertical: SIZES.SPACING.SM,
  },
  voucherList: {
    flex: 1,
    paddingHorizontal: SIZES.SPACING.MD,
  },
  voucherItem: {
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: SIZES.RADIUS.MEDIUM,
    flexDirection: "row",
    marginBottom: SIZES.SPACING.SM,
    padding: SIZES.SPACING.MD,
  },
  selectedVoucher: {
    borderColor: COLORS.PRIMARY,
    borderWidth: 2,
  },
  disabledVoucher: {
    opacity: 0.5,
  },
  voucherLeft: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  voucherIcon: {
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY_LIGHT + "20",
    borderRadius: SIZES.RADIUS.SMALL,
    height: 40,
    justifyContent: "center",
    marginRight: SIZES.SPACING.SM,
    width: 40,
  },
  voucherContent: {
    flex: 1,
  },
  voucherTitle: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "600",
  },
  voucherDescription: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 2,
  },
  voucherCode: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.PRIMARY,
    fontWeight: "600",
    marginTop: 4,
  },
  voucherRight: {
    alignItems: "center",
  },
  discountText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.PRIMARY,
    fontWeight: "700",
    marginBottom: SIZES.SPACING.XS,
  },
  disabledText: {
    color: COLORS.TEXT_LIGHT,
  },
  footer: {
    paddingHorizontal: SIZES.SPACING.MD,
    paddingTop: SIZES.SPACING.MD,
  },
  applyButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: SIZES.RADIUS.MEDIUM,
    paddingVertical: SIZES.SPACING.MD,
  },
  applyButtonText: {
    ...TEXT_STYLES.BUTTON_LARGE,
    color: COLORS.BACKGROUND,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default VoucherModal;
