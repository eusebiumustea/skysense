import * as React from "react";
import Animated from "react-native-reanimated";
import Svg, { Path, SvgProps } from "react-native-svg";

export function Search(props: SvgProps) {
  return (
    <AnimatedSvg
      width={20}
      height={19}
      viewBox="0 0 20 19"
      fill="#fff"
      sharedTransitionTag="search"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.026 12.905a8 8 0 10-1.412 1.41l.043.046 4.242 4.243a1.003 1.003 0 001.415 0 .998.998 0 000-1.415l-4.243-4.242a1.117 1.117 0 00-.045-.042zm-2.076-9.15a5.999 5.999 0 11-8.414 8.553 5.999 5.999 0 018.414-8.553z"
      />
    </AnimatedSvg>
  );
}
export const AnimatedSvg = Animated.createAnimatedComponent(Svg);
