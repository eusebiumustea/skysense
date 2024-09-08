import { FC, PropsWithChildren } from "react";
import { FastTextProps, Text } from "react-native-fast-text";
import { shadow } from "../../ui-config/shadow";

export function Tag({ ...rest }: PropsWithChildren<FastTextProps>) {
  return (
    <Text
      {...rest}
      style={[
        {
          paddingHorizontal: 18,
          paddingVertical: 9,
          backgroundColor: "#32333E",
          borderRadius: 32,
          color: "#9B9EAD",
          ...shadow,
        },
        rest.style,
      ]}
    />
  );
}
