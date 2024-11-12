import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DetailsDataProps } from "../../models/details/types";
import { BackgroundGradientCard } from "../background-gradient-card";
interface DetailsCardProps {
  detailsDataProps: DetailsDataProps;
  icon: ReactNode;
}
export function DetailsCard({ detailsDataProps, icon }: DetailsCardProps) {
  return (
    <BackgroundGradientCard title="Details" colors={["#232329", "#2F313A"]}>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          paddingTop: 16,
        }}
      >
        {icon}
        <View
          style={{
            flexDirection: "column",
            alignItems: "baseline",
            rowGap: 16,
          }}
        >
          {Object.entries(detailsDataProps).map((prop, i) => (
            <View key={i} style={styles.viewProp}>
              <Text style={styles.key}>{prop[0]}</Text>
              <Text style={styles.value}>{prop[1]}</Text>
            </View>
          ))}
        </View>
      </View>
    </BackgroundGradientCard>
  );
}
const styles = StyleSheet.create({
  viewProp: { flexDirection: "row", columnGap: 32 },
  key: { color: "#fff", opacity: 0.5, fontSize: 14 },
  value: { color: "#fff", fontSize: 14 },
});
