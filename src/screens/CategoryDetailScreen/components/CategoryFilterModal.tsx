import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

interface Props {
  visible: boolean;
  onClose: () => void;
  onApply: () => void;
}

const CategoryFilterModal: React.FC<Props> = ({ visible, onClose, onApply }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Bộ lọc</Text>
          <Text style={styles.sub}>Khoảng cách / Giá / Đánh giá / Quán mở</Text>

          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose} style={styles.btnSecondary}>
              <Text>Huỷ</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onApply} style={styles.btnPrimary}>
              <Text style={{ color: COLORS.TEXT_WHITE }}>Áp dụng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  actions: { flexDirection: "row", justifyContent: "flex-end" },
  backdrop: { backgroundColor: COLORS.OVERLAY, flex: 1, justifyContent: "flex-end" },
  btnPrimary: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  btnSecondary: {
    borderRadius: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  sheet: {
    backgroundColor: COLORS.BACKGROUND,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: SIZES.SPACING.MD,
  },
  sub: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SIZES.SPACING.MD,
  },
  title: {
    ...TEXT_STYLES.H4,
    marginBottom: SIZES.SPACING.SM,
  },
});

export default CategoryFilterModal;
