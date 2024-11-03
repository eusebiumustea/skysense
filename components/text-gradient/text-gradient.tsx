import React, { PropsWithChildren } from "react";

import Svg, {
  Defs,
  G,
  Stop,
  LinearGradient as SvgLinearGradient,
  Text as SvgText,
} from "react-native-svg";
import { shadow } from "../../ui-config/shadow";
import { View } from "react-native";

export function TextGradient({ children }: PropsWithChildren) {
  return (
    <Svg
      style={{
        height: 80,
        width: "32%",
      }}
    >
      <Defs>
        <SvgLinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#A2A4B5" stopOpacity="1" />
          <Stop offset="1" stopColor="#545760" stopOpacity="1" />
        </SvgLinearGradient>
      </Defs>
      <G>
        <SvgText fill="url(#grad)" fontSize={56} fontWeight="bold" x="0" y="62">
          {children}
        </SvgText>
      </G>
    </Svg>
  );
}
