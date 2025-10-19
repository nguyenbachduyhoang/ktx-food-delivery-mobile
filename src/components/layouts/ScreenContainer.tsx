import React from "react";
import {
  View,
  StyleSheet,
  ViewProps,
  ScrollView,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BG_COLOR = "#fff";

type ScreenContainerProps = ViewProps & {
  center?: boolean;
  scrollable?: boolean;
  showsVerticalScrollIndicator?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  keyboardAvoidingView?: boolean;
  bottomSpacing?: number;
};

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
  center,
  scrollable = true,
  showsVerticalScrollIndicator = false,
  contentContainerStyle,
  bottomSpacing = 100,
  ...props
}) => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top || 24;
  const paddingBottom = (insets.bottom || 24) + bottomSpacing;

  const containerStyle = [styles.container, { paddingTop, paddingBottom }, style];

  // If centering is requested, and scrollable, center via contentContainerStyle so it works with ScrollView
  const centerContentStyle: StyleProp<ViewStyle> = center
    ? ({ flexGrow: 1, justifyContent: "center", alignItems: "center" } as ViewStyle)
    : undefined;

  const Inner = () => {
    if (!scrollable) {
      const nonScrollStyle: StyleProp<ViewStyle> = center
        ? ({ justifyContent: "center", alignItems: "center" } as ViewStyle)
        : undefined;

      return (
        <View style={[containerStyle, nonScrollStyle]} {...props}>
          {children}
        </View>
      );
    }

    return (
      <View style={containerStyle} {...props}>
        <ScrollView
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          // paddingTop is already applied to the outer container to handle safe-area.
          // Keep the ScrollView content container free of duplicate top padding to avoid extra gap.
          contentContainerStyle={[centerContentStyle, contentContainerStyle]}
        >
          {children}
        </ScrollView>
      </View>
    );
  };

  // props may include keyboardAvoidingView from HOC via extra props
  const useKeyboardAvoiding = (props as ScreenContainerProps).keyboardAvoidingView;

  if (useKeyboardAvoiding) {
    // If caller passed keyboardAvoidingView prop or HOC set it, wrap with KeyboardAvoidingView
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <Inner />
      </KeyboardAvoidingView>
    );
  }

  return <Inner />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR,
    flex: 1,
    paddingHorizontal: 16,
  },
  keyboardAvoid: {
    flex: 1,
  },
});

export default ScreenContainer;
