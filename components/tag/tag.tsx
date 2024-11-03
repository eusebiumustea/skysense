import { PropsWithChildren } from "react";
import { View } from "react-native";
import { FastTextProps, Text } from "react-native-fast-text";
import { shadow } from "../../ui-config/shadow";

export function Tag({ ...rest }: PropsWithChildren<FastTextProps>) {
  return (
    <View
      style={[
        {
          ...shadow,
          borderRadius: 32,
          paddingHorizontal: 18,
          paddingVertical: 9,
          backgroundColor: "#32333E",
        },
        rest.style,
      ]}
    >
      <Text
        {...rest}
        style={[
          {
            color: "#9B9EAD",
          },
        ]}
      />
    </View>
  );
}
