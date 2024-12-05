import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function CheckIcon(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#e8eaed"
      {...props}
    >
      <Path d="M382-240L154-468l57-57 171 171 367-367 57 57-424 424z" />
    </Svg>
  );
}
