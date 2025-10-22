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
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"; // thêm import

const BG_COLOR = "#fff";

type ScreenContainerProps = ViewProps & {
  center?: boolean;
  scrollable?: boolean;
  showsVerticalScrollIndicator?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  keyboardAvoidingView?: boolean;
  /**
   * Extra spacing (px) to add to the bottom area after safe-area inset.
   * Default 0 to avoid large accidental gaps when used inside BottomTabs.
   */
  bottomSpacing?: number;
};

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
  center,
  scrollable = true,
  showsVerticalScrollIndicator = false,
  contentContainerStyle,
  bottomSpacing = 0, // <<--- default changed to 0
  ...props
}) => {
  const insets = useSafeAreaInsets();
  // useBottomTabBarHeight will throw if we're not inside a Bottom Tab Navigator.
  // Wrap in try/catch and fall back to 0 so ScreenContainer is safe to use everywhere.
  let tabBarHeight = 0;
  try {
    // call hook (will throw if no provider)
    tabBarHeight = useBottomTabBarHeight();
  } catch (caughtError: unknown) {
    // Not inside a BottomTab navigator — that's fine, default to 0
    // Keep a non-fatal warning to aid debugging in development
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      const e = caughtError as Error;
      console.warn(
        "ScreenContainer: useBottomTabBarHeight not available in this screen. Using 0.",
        e?.message ?? e
      );
    }
    tabBarHeight = 0;
  }
  const paddingTop = insets.top || 24;

  // CHÍNH: paddingBottom = max(tabBarHeight, insets.bottom) + bottomSpacing
  // - tabBarHeight thường là BASE_TABBAR_HEIGHT + inset (if BottomTabs sets height that way)
  // - Math.max guards against cases where tabBarHeight is 0 (screen outside tabs)
  const paddingBottom = Math.max(tabBarHeight, insets.bottom || 0) + (bottomSpacing || 0);

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
          style={styles.scrollView}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          // Disable overscroll/bounce to avoid 'spring back' behavior on iOS/Android
          bounces={false}
          alwaysBounceVertical={false}
          overScrollMode="never"
          // Improve tap handling for forms
          keyboardShouldPersistTaps="handled"
          // paddingTop is already applied to the outer container to handle safe-area.
          // Use flexGrow so short content doesn't cause overscroll bounce and centering works.
          contentContainerStyle={[
            centerContentStyle,
            contentContainerStyle,
            styles.contentFlexGrow,
          ]}
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
  contentFlexGrow: {
    flexGrow: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});

export default ScreenContainer;
