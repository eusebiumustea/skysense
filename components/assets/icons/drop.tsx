import Svg, { Path, SvgProps } from "react-native-svg";

export function Drop({ ...props }: SvgProps) {
  return (
    <Svg width={9} height={12} viewBox="0 0 9 12" fill="#fff" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.11.54c.17.246.35.507.545.783C6.996 3.213 9 6.05 9 7.68c0 1.19-.51 2.266-1.325 3.049A4.574 4.574 0 014.5 12c-1.24 0-2.36-.489-3.175-1.255C.509 9.962 0 8.887 0 7.697c0-1.63 2.004-4.483 3.345-6.374.306-.424.56-.782.781-1.125a.454.454 0 01.748 0l.236.343zm1.564 7.238a.43.43 0 01.458-.391c.238.016.425.212.408.44-.017.505-.17.994-.442 1.402a2.891 2.891 0 01-1.087 1.01.454.454 0 01-.611-.179c-.119-.195-.034-.456.17-.57a2.03 2.03 0 00.78-.718 2.04 2.04 0 00.324-.994z"
      />
    </Svg>
  );
}