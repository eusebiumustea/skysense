import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface PropertyItemProps {
  icon: ReactNode;
  property: string;
  value: string;
}

export function PropertyItem({ icon, property, value }: PropertyItemProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,
      }}
    >
      {icon}
      <Text style={styles.labelContainer}>
        {property}: <Text style={styles.label}>{value}</Text>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  labelContainer: { color: "#9B9EAD", fontSize: 12 },
  label: { color: "#FFF" },
});
