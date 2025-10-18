import React from "react";
import { View, StyleSheet, ViewProps, ScrollView } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, SIZES } from "@constants/index";

interface ScreenContainerProps extends ViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

/**
 * Centralized screen wrapper used by withScreenContainer.
 * - Default: scrollable (ScrollView inside SafeAreaView)
 * - If `scrollable` is false, renders a View that can safely contain VirtualizedLists (FlatList/SectionList).
 * This component also standardizes paddings and centers content with a maxWidth so all screens look consistent.
 */
const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
  scrollable = true,
  ...props
}) => {
  const insets = useSafeAreaInsets();

  const contentPadding = {
    paddingHorizontal: SIZES.SPACING.MD,
    paddingTop: insets.top + SIZES.SPACING.SM,
    paddingBottom: insets.bottom + SIZES.SPACING.LG,
  };

  if (scrollable) {
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: COLORS.BACKGROUND }]}
        edges={["bottom", "left", "right"]}
      >
        {/* Invisible blocker for status bar area: consumes touch events so taps there
            don't reach underlying app UI (prevents accidental interactions). */}
        <View
          style={[styles.statusBarBlocker, { height: insets.top }]}
          // capture touches in this region
          onStartShouldSetResponder={() => true}
        />
        <ScrollView
          style={[styles.scroll, { backgroundColor: COLORS.BACKGROUND }, style]}
          contentContainerStyle={[styles.contentContainer, contentPadding]}
          showsVerticalScrollIndicator={false}
          {...props}
        >
          <View style={styles.centered}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: COLORS.BACKGROUND }]}
      edges={["bottom", "left", "right"]}
      {...props}
    >
      {/* Invisible blocker for status bar area. */}
      <View
        style={[styles.statusBarBlocker, { height: insets.top }]}
        onStartShouldSetResponder={() => true}
      />
      <View
        style={[
          styles.innerContainer,
          {
            paddingTop: insets.top + SIZES.SPACING.SM,
            paddingBottom: insets.bottom + SIZES.SPACING.LG,
          },
          style,
        ]}
      >
        {/* allow the centered wrapper to grow so VirtualizedLists can expand to fill the screen */}
        <View style={styles.centered}>{children}</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centered: {
    alignSelf: "center",
    flex: 1,
    maxWidth: 900,
    width: "100%",
  },
  contentContainer: { flexGrow: 1 },
  innerContainer: { flex: 1 },
  safeArea: { flex: 1 },
  scroll: { flex: 1 },
  statusBarBlocker: {
    backgroundColor: COLORS.TRANSPARENT,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 50,
  },
});

export default ScreenContainer;
