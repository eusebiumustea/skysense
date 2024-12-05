import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
  SvgProps,
} from "react-native-svg";

export function Sunset({ ...props }: SvgProps) {
  return (
    <Svg width={12} height={15} viewBox="0 0 12 15" fill="none" {...props}>
      <G filter="url(#filter0_d_0_447)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.089 1.015C2.692 1.219 0 4.045 0 7.502 0 11.09 2.903 14 6.483 14c1.312 0 2.533-.39 3.554-1.063A7.001 7.001 0 016.089 1.015z"
          fill="url(#paint0_radial_0_447)"
        />
      </G>
      <Circle opacity={0.2} cx={11} cy={8.00317} r={1} fill="#D8D8D8" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 4l-1.176.618.225-1.309-.951-.927 1.314-.191L10 1l.588 1.191 1.314.191-.95.927.224 1.309L10 4z"
        fill="url(#paint1_linear_0_447)"
      />
      <Defs>
        <RadialGradient
          id="paint0_radial_0_447"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 15.2232 -11.7862 0 5.311 3.823)"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#DEE5EE" />
        </RadialGradient>
        <LinearGradient
          id="paint1_linear_0_447"
          x1={8.03968}
          y1={2.1059}
          x2={8.03968}
          y2={6.02655}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#CECECE" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
