import Svg, { Path, SvgProps } from "react-native-svg";
interface ChevronIconProps extends SvgProps {
  direction: "down" | "up";
}
export function Chevron({ direction = "down", ...props }: ChevronIconProps) {
  return (
    <Svg
      opacity={0.5}
      width={12}
      height={7}
      viewBox="0 0 12 7"
      fill="none"
      {...props}
    >
      {direction === "up" && (
        <Path
          d="M6.24 2.42l4.126 4.124 1.178-1.178L6.24.063.937 5.366l1.179 1.178L6.24 2.42z"
          fill="#fff"
        />
      )}
      {direction === "down" && (
        <Path
          d="M6.24 4.188L10.367.063l1.178 1.178L6.24 6.544.937 1.241 2.116.062 6.24 4.188z"
          fill="#fff"
        />
      )}
    </Svg>
  );
}
