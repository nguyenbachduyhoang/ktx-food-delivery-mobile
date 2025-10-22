/* eslint-disable react-native/sort-styles */
import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Animated, { FadeIn, FadeOut, SlideInUp, SlideOutDown } from "react-native-reanimated";
import { COLORS, SIZES, TEXT_STYLES } from "@constants/index";

interface ConfirmationDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: "delete" | "warning" | "info";
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  visible,
  title,
  message,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  onConfirm,
  onCancel,
  type = "delete",
}) => {
  const getIconAndColor = () => {
    switch (type) {
      case "delete":
        return { icon: "trash", color: COLORS.ERROR };
      case "warning":
        return { icon: "warning", color: COLORS.WARNING };
      case "info":
        return { icon: "information-circle", color: COLORS.PRIMARY };
      default:
        return { icon: "help-circle", color: COLORS.TEXT_LIGHT };
    }
  };

  const { icon, color } = getIconAndColor();

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
            style={styles.dialogContent}
          >
            {/* Icon */}
            <View style={[styles.iconContainer, { backgroundColor: color + "20" }]}>
              {/* cast to any because icon is chosen at runtime */}
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Ionicons name={icon as any} size={32} color={color} />
            </View>

            {/* Title */}
            <Text style={styles.title}>{title}</Text>

            {/* Message */}
            <Text style={styles.message}>{message}</Text>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onCancel}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelButtonText}>{cancelText}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.confirmButton, { backgroundColor: color }]}
                onPress={onConfirm}
                activeOpacity={0.8}
              >
                <Text style={styles.confirmButtonText}>{confirmText}</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SIZES.SPACING.XL,
  },
  dialogContent: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: SIZES.RADIUS.LARGE,
    padding: SIZES.SPACING.XL,
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
    elevation: 8,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  iconContainer: {
    alignItems: "center",
    borderRadius: 40,
    height: 80,
    justifyContent: "center",
    marginBottom: SIZES.SPACING.LG,
    width: 80,
  },
  title: {
    ...TEXT_STYLES.H4,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
    marginBottom: SIZES.SPACING.SM,
    textAlign: "center",
  },
  message: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 22,
    marginBottom: SIZES.SPACING.XL,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: SIZES.SPACING.MD,
    width: "100%",
  },
  button: {
    borderRadius: SIZES.RADIUS.MEDIUM,
    flex: 1,
    paddingVertical: SIZES.SPACING.MD,
  },
  cancelButton: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderColor: COLORS.BORDER,
    borderWidth: 1,
  },
  confirmButton: {
    // backgroundColor will be set dynamically
  },
  cancelButtonText: {
    ...TEXT_STYLES.BUTTON_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "600",
    textAlign: "center",
  },
  confirmButtonText: {
    ...TEXT_STYLES.BUTTON_MEDIUM,
    color: COLORS.BACKGROUND,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default ConfirmationDialog;
