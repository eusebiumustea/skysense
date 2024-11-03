import Svg, { Path, SvgProps } from "react-native-svg";

export function Information({ ...props }: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.333 8a6.667 6.667 0 1013.334 0A6.667 6.667 0 001.334 8zm12 0A5.333 5.333 0 112.668 8a5.333 5.333 0 0110.667 0zM8.668 4.667V6H7.334V4.667h1.333zm0 6.666v-4H7.334v4h1.333z"
        fill="#fff"
      />
    </Svg>
  );
}
