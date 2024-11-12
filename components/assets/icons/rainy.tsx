import Svg, {
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  Pattern,
  RadialGradient,
  Stop,
  SvgProps,
  Use,
  Image,
} from "react-native-svg";

export function Rainy({ ...props }: SvgProps) {
  return (
    <Svg width={28} height={25} viewBox="0 0 28 25" fill="none" {...props}>
      <Ellipse
        cx={19.7627}
        cy={5.41109}
        rx={5.28814}
        ry={5.41109}
        fill="url(#paint0_linear_0_143)"
      />
      <G filter="url(#filter0_d_0_143)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.407 18.002H11.424v-.008C7.292 17.805 4 14.34 4 10.094c0-4.368 3.483-7.909 7.78-7.909 3.443 0 6.365 2.275 7.389 5.427a5.482 5.482 0 013.238-1.056c3.089 0 5.593 2.562 5.593 5.723 0 3.091-2.395 5.61-5.39 5.72v.003h-.203z"
          fill="url(#paint1_radial_0_143)"
        />
      </G>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.407 18.002H11.424v-.008C7.292 17.805 4 14.34 4 10.094c0-4.368 3.483-7.909 7.78-7.909 3.443 0 6.365 2.275 7.389 5.427a5.482 5.482 0 013.238-1.056c3.089 0 5.593 2.562 5.593 5.723 0 3.091-2.395 5.61-5.39 5.72v.003h-.203z"
        fill="url(#pattern0_0_143)"
      />
      <G filter="url(#filter1_i_0_143)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.407 18.002H11.424v-.008C7.292 17.805 4 14.34 4 10.094c0-4.368 3.483-7.909 7.78-7.909 3.443 0 6.365 2.275 7.389 5.427a5.482 5.482 0 013.238-1.056c3.089 0 5.593 2.562 5.593 5.723 0 3.091-2.395 5.61-5.39 5.72v.003h-.203z"
          fill="url(#paint2_radial_0_143)"
        />
      </G>
      <Ellipse
        cx={16}
        cy={23.1745}
        rx={1.2}
        ry={1.82549}
        fill="url(#paint3_linear_0_143)"
      />
      <Ellipse
        cx={11.2}
        cy={20.7405}
        rx={1.2}
        ry={1.82549}
        fill="url(#paint4_linear_0_143)"
      />
      <Ellipse
        cx={20.8001}
        cy={20.7405}
        rx={1.2}
        ry={1.82549}
        fill="url(#paint5_linear_0_143)"
      />
      <Defs>
        <Pattern
          id="pattern0_0_143"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use xlinkHref="#image0_0_143" transform="scale(.00195)" />
        </Pattern>
        <LinearGradient
          id="paint0_linear_0_143"
          x1={16.8375}
          y1={0.436195}
          x2={16.8375}
          y2={6.4227}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFC100" />
          <Stop offset={1} stopColor="#FF8E00" />
        </LinearGradient>
        <RadialGradient
          id="paint1_radial_0_143"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 18.5475 -28.143 0 16.682 5.603)"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#DEE5EE" />
        </RadialGradient>
        <RadialGradient
          id="paint2_radial_0_143"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 18.5475 -28.143 0 16.682 5.603)"
        >
          <Stop stopColor="#fff" stopOpacity={0.103027} />
          <Stop offset={1} stopColor="#DEE5EE" />
        </RadialGradient>
        <LinearGradient
          id="paint3_linear_0_143"
          x1={15.4775}
          y1={22.4242}
          x2={15.4775}
          y2={24.0142}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#fff" />
        </LinearGradient>
        <LinearGradient
          id="paint4_linear_0_143"
          x1={10.6774}
          y1={19.9903}
          x2={10.6774}
          y2={21.5802}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#fff" />
        </LinearGradient>
        <LinearGradient
          id="paint5_linear_0_143"
          x1={20.2775}
          y1={19.9903}
          x2={20.2775}
          y2={21.5802}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#fff" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
