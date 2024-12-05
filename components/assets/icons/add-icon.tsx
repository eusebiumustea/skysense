import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function AddIcon(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#e8eaed"
      {...props}
    >
      <Path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240z" />
    </Svg>
  );
}
