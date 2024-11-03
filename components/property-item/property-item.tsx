import React, { ReactNode } from "react";
import { View } from "react-native";
import { Text } from "react-native-fast-text";

interface PropertyItemProps {
  icon: ReactNode;
  property: string;
  value: string;
}

export function PropertyItem({ icon, property, value }: PropertyItemProps) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", columnGap: 10 }}>
      {icon}
      <Text style={{ color: "#9B9EAD", fontSize: 12 }}>
        {property}: <Text style={{ color: "#FFF" }}>{value}</Text>
      </Text>
    </View>
  );
}
