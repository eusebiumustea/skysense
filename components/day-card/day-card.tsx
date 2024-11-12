import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CircularProgress } from "react-native-circular-progress";
import { getClock } from "../../utils/date-utils";
import { BackgroundGradientCard } from "../background-gradient-card";
interface DayCardProps {
  sunrise: string;
  sunset: string;
}
export function DayCard(props: DayCardProps) {
  const sunrise = useMemo(
    () => getClock(new Date(props.sunrise)),
    [props.sunrise]
  );
  const sunset = useMemo(
    () => getClock(new Date(props.sunset)),
    [props.sunset]
  );
  return (
    <BackgroundGradientCard title="Sun & Moon">
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 16,
        }}
      >
        <View style={{ flexDirection: "column", rowGap: 12 }}>
          <Text style={styles.clock}>{sunrise}</Text>
          <Text style={styles.label}>Sunrise</Text>
        </View>
        <CircularProgress
          size={100}
          width={15}
          lineCap="round"
          fill={
            (new Date().getHours() / new Date(props.sunset).getHours()) * 100
          }
          tintColor="#FFC100"
          backgroundColor="#3d5875"
          arcSweepAngle={180}
          style={{ transform: [{ rotate: "180deg" }], top: 22 }}
        />
        <View style={{ flexDirection: "column", rowGap: 12 }}>
          <Text style={styles.clock}>{sunset}</Text>
          <Text style={styles.label}>Sunset</Text>
        </View>
      </View>
    </BackgroundGradientCard>
  );
}
const styles = StyleSheet.create({
  label: { color: "#fff", fontSize: 14, opacity: 0.5, textAlign: "center" },
  clock: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
