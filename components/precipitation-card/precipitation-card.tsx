import { LinearGradient } from "expo-linear-gradient";
import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RenderIcon } from "../../utils/render-icon";
import { Drop } from "../assets";
interface PrecipitationCardProps {
  time: string;
  windSpeed: string;
  precipitation: string;
  temperatureLimits: string;
}
export const PrecipitationCard = memo(
  ({
    time,
    windSpeed,
    precipitation,
    temperatureLimits,
  }: PrecipitationCardProps) => {
    const date = new Date(time).toDateString();
    return (
      <LinearGradient
        style={[styles.container]}
        colors={["rgba(166, 168, 172, 0.01)", "rgba(166, 168, 172, 0.28)"]}
        end={{ x: 0, y: 0.1 }}
        start={{ x: 1, y: 1 }}
      >
        <View style={styles.dateView}>
          <Text style={styles.dayNameText}>
            {date.slice(0, 3).toUpperCase()}
          </Text>
          <Text style={styles.monthText}>
            {date.slice(3, 10).toUpperCase()}
          </Text>
        </View>
        <RenderIcon iconName="cloudy" width={70} height={61} />
        <View style={styles.centerTextView}>
          <Text style={styles.mainTitle}>{"Thunderstorms"}</Text>
          <Text style={styles.dayNameText}>{windSpeed}</Text>
        </View>
        <View style={styles.detailsView}>
          <Text style={styles.monthText}>{temperatureLimits}</Text>
          <View style={styles.precipitationView}>
            <Drop />
            <Text style={styles.monthText}>{precipitation}</Text>
          </View>
        </View>
      </LinearGradient>
    );
  }
);
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 6,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  dateView: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 12,
  },
  dayNameText: {
    color: "#fff",
    opacity: 0.5,
    fontSize: 12,
  },
  monthText: {
    color: "#fff",
    fontSize: 12.5,
  },
  centerTextView: {
    flexDirection: "column",
    rowGap: 12,
  },
  mainTitle: {
    color: "#FFBD00",
    fontSize: 14,
    fontWeight: "600",
  },
  detailsView: { flexDirection: "column", rowGap: 12 },
  precipitationView: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
});
