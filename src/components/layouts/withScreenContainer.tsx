import * as React from "react";
import ScreenContainer from "./ScreenContainer";

function withScreenContainer<P extends object>(Component: React.ComponentType<P>) {
  type StaticOpts = {
    useScreenScroll?: boolean;
  };

  return function Wrapper(props: P) {
    // Components can set a static boolean `useScreenScroll = false` to opt out of the
    // ScreenContainer's ScrollView (useful when the screen contains FlatList/SectionList).
    const ctor = Component as unknown as StaticOpts;
    const useScreenScroll = ctor.useScreenScroll !== false;

    return (
      <ScreenContainer scrollable={useScreenScroll}>
        <Component {...props} />
      </ScreenContainer>
    );
  };
}

export default withScreenContainer;
