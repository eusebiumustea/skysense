import { StyleSheet, Text, View } from "react-native";
import { getClock } from "../../utils/date-utils";
import { Cloudy } from "../assets";
import { RenderIcon } from "../../utils/render-icon";
import { IconNames } from "../../models/ui/types";
import { memo } from "react";
interface DailyHourlyCardProps {
  temp: number;
  time: string;
  iconName: IconNames;
}
export const DailyHourlyCard = memo(
  ({ temp, time, iconName }: DailyHourlyCardProps) => {
    return (
      <View style={styles.container}>
        <RenderIcon width={24} height={19} iconName={iconName} />
        <Text style={styles.tempLabel}>{Math.round(temp)}°</Text>
        <Text style={styles.clockLabel}>{getClock(new Date(time))}</Text>
      </View>
    );
  }
);
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    height: 92,
    justifyContent: "space-evenly",
    paddingHorizontal: 8,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 8,
    marginRight: 10,
  },
  clockLabel: {
    color: "#fff",
    opacity: 0.5,
    fontSize: 10,
  },
  tempLabel: {
    color: "#fff",

    fontSize: 12,
    fontWeight: "700",
  },
});
