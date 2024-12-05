import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export function LocateIcon(props: SvgProps) {
  return (
    <Svg width={14} height={20} viewBox="0 0 14 20" fill="none" {...props}>
      <Path
        d="M7 .5c-3.87 0-7 3.13-7 7 0 4.17 4.42 9.92 6.24 12.11.4.48 1.13.48 1.53 0C9.58 17.42 14 11.67 14 7.5c0-3.87-3.13-7-7-7zM7 10a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
        fill="#fff"
      />
    </Svg>
  );
}
