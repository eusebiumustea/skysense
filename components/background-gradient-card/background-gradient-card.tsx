import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import { PropsWithChildren } from "react";
import { StyleSheet, Text } from "react-native";
import { shadow } from "../../ui-config/shadow";
interface BackgroundGradientCardProps {
  colors?: readonly [string, string, ...string[]];
  title?: string;
  linearGradientProps?: LinearGradientProps;
}
export function BackgroundGradientCard({
  colors = ["#232329", "#2F313A"],
  children,
  title,
  linearGradientProps,
}: PropsWithChildren<BackgroundGradientCardProps>) {
  return (
    <LinearGradient
      style={[
        {
          width: "100%",
          paddingVertical: title ? 32 : 16,
          paddingHorizontal: 24,
          borderRadius: 10,
        },
        shadow,
      ]}
      colors={colors}
      {...linearGradientProps}
    >
      {title && <Text style={styles.cardTite}>{title}</Text>}
      {children}
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  cardTite: {
    fontSize: 16,
    fontWeight: "700",
    position: "absolute",
    top: 10,
    left: 22,
    color: "#fff",
  },
});
