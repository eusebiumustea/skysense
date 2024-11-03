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
    <Svg width={27} height={31} viewBox="0 0 27 31" fill="none" {...props}>
      <G filter="url(#filter0_d_0_220)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24.219 18.911c-4.831-.664-8.552-4.81-8.552-9.823a9.886 9.886 0 012.96-7.067C13.813 2.311 10 6.314 10 11.211c0 5.084 4.112 9.206 9.184 9.206a9.125 9.125 0 005.035-1.506z"
          fill="url(#paint0_radial_0_220)"
        />
      </G>
      <Circle
        opacity={0.2}
        cx={25.5834}
        cy={11.9211}
        r={1.41667}
        fill="#D8D8D8"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.167 6.25l-1.666.876.318-1.855-1.347-1.313 1.862-.27L24.167 2l.832 1.687 1.862.27-1.347 1.314.318 1.855-1.665-.876z"
        fill="url(#paint1_linear_0_220)"
      />
      <Defs>
        <RadialGradient
          id="paint0_radial_0_220"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 21.5659 -16.699 0 17.525 6)"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#DEE5EE" />
        </RadialGradient>
        <LinearGradient
          id="paint1_linear_0_220"
          x1={21.3895}
          y1={3.5667}
          x2={21.3895}
          y2={9.12094}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#CECECE" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
