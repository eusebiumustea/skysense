import { memo, ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-fast-text";
import { Chevron } from "../assets";
interface WeeklyWeatherItemProps {
  dayName: string;
  icon: ReactNode;
  high: number;
  low: number;
}
export const WeeklyWeatherItem = memo(
  ({ dayName, icon, high, low }: WeeklyWeatherItemProps) => {
    return (
      <View style={styles.container}>
        <View style={styles.day}>
          <Chevron direction="down" />
          <Text style={styles.text}>{dayName}</Text>
        </View>
        {icon}
        <View style={styles.temp}>
          <Text style={styles.text}>{high}</Text>
          <Text style={styles.text}>{low}</Text>
        </View>
      </View>
    );
  }
);
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  day: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  text: {
    fontSize: 12,
    color: "#fff",
  },
  temp: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 24,
  },
});
