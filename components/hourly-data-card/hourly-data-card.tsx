import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SvgProps } from "react-native-svg";
import { Drop } from "../assets";
interface HourlyDataCardProps {
  focused: boolean;
  hour: string;
  Icon: (props: SvgProps) => React.JSX.Element;
  temperature: number;
  precipitationPropability: number | boolean;
}
export const HourlyDataCard = memo(
  ({
    focused,
    hour,
    Icon,
    temperature,
    precipitationPropability,
  }: HourlyDataCardProps) => {
    return (
      <View
        style={[
          {
            backgroundColor: focused
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(72, 75, 91, 0.8)",

            paddingVertical: precipitationPropability ? 0 : 18,
            paddingBottom: precipitationPropability ? 32 : 18,

            borderWidth: focused ? 1 : 0,
            rowGap: precipitationPropability ? 4 : 8,
            borderColor: focused ? "#fff" : undefined,
          },
          styles.container,
        ]}
      >
        <Text style={styles.hour}>{hour}:00</Text>
        <Icon width={24} height={24} />
        <Text style={styles.temp}>{Math.round(temperature)}°</Text>

        {precipitationPropability && (
          <View style={styles.precipitationDisplay}>
            <Drop fill={"#D4F1F8"} width={8} height={8} />
            <Text style={styles.precipitationDisplayText}>
              {precipitationPropability}%
            </Text>
          </View>
        )}
      </View>
    );
  }
);
const styles = StyleSheet.create({
  hour: { fontSize: 10, color: "#fff", opacity: 0.5 },
  temp: { color: "#fff", fontSize: 14 },
  precipitationDisplay: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    position: "absolute",
    bottom: 12,
  },
  precipitationDisplayText: {
    color: "#fff",
    fontSize: 10,
  },
  container: {
    alignSelf: "flex-start",
    alignItems: "center",
    paddingTop: 18,
    paddingHorizontal: 12,
    marginHorizontal: 8,
    borderRadius: 30,
  },
});
