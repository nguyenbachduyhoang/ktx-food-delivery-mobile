import React from "react";
import ScreenContainer from "./ScreenContainer";
import { StyleProp, ViewStyle } from "react-native";

type ScreenOptions = {
  center?: boolean;
  scrollable?: boolean;
  showsVerticalScrollIndicator?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  keyboardAvoidingView?: boolean;
  bottomSpacing?: number;
};

function withScreenContainer<P extends object>(
  Component: React.ComponentType<P>,
  options?: ScreenOptions
) {
  const Wrapper: React.FC<P> = (props) => {
    // allow component to override scroll behavior via a static flag
    const compWithStatic = Component as unknown as { useScreenScroll?: boolean };
    const scrollableFromStatic =
      typeof compWithStatic.useScreenScroll === "boolean"
        ? compWithStatic.useScreenScroll
        : undefined;

    return (
      <ScreenContainer
        center={options?.center}
        scrollable={scrollableFromStatic ?? options?.scrollable}
        showsVerticalScrollIndicator={options?.showsVerticalScrollIndicator}
        contentContainerStyle={options?.contentContainerStyle}
        bottomSpacing={options?.bottomSpacing}
      >
        <Component {...props} />
      </ScreenContainer>
    );
  };

  return Wrapper;
}

export default withScreenContainer;
