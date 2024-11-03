import { LinearGradient } from "expo-linear-gradient";
import { PropsWithChildren } from "react";
import { shadow } from "../../ui-config/shadow";
interface BackgroundGradientCardProps {
  colors?: string[];
}
export function BackgroundGradientCard({
  colors = ["#232329", "#2F313A"],
  children,
}: PropsWithChildren<BackgroundGradientCardProps>) {
  return (
    <LinearGradient
      style={{
        width: "100%",
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 10,
        ...shadow,
      }}
      colors={colors}
    >
      {children}
    </LinearGradient>
  );
}
