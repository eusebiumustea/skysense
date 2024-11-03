import Svg, { Path, SvgProps } from "react-native-svg";

export function LineAsset({ ...props }: SvgProps) {
  return (
    <Svg
      height={1}
      viewBox="0 0 310 1"
      fill="none"
      {...props}
      style={[{ width: "90%", alignSelf: "center" }, props.style]}
    >
      <Path
        d="M0 .5h309.5"
        stroke="#979797"
        strokeOpacity={0.165167}
        strokeWidth={0.5}
        strokeDasharray="5 5"
      />
    </Svg>
  );
}
