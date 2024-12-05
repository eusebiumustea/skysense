import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export function Back(props: SvgProps) {
  return (
    <Svg width={10} height={16} viewBox="0 0 10 16" fill="none" {...props}>
      <Path
        d="M9.4 2.5L3.9 8l5.5 5.5-1.1 2.2L.6 8 8.3.3l1.1 2.2z"
        fill="#fff"
      />
    </Svg>
  );
}
