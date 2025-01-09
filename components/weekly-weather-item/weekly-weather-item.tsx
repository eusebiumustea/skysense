import { MotiView } from "moti";
import { memo, ReactNode, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useWeatherData } from "../../hooks";
import { IconNames } from "../../models/ui/types";
import { WeatherData } from "../../models/weather/types";
import { getIconName } from "../../utils/render-icon";
import { Chevron } from "../assets";
import { DailyList } from "./daily-list";
import React from "react";
interface WeeklyWeatherItemProps {
  dayName: string;
  icon: ReactNode;
  high: number;
  low: number;
  // expanded: boolean;
  // onPress: () => void;

  time: string;
}
interface DailyHourProps {
  temp: number;
  time: string;
  iconName: IconNames;
}
const Contents = memo((props: any) => (
  <>
    {props.icon}
    <View style={styles.temp}>
      <Text style={styles.text}>{props.high}°</Text>
      <Text style={styles.text}>{props.low}°</Text>
    </View>
  </>
));
export const WeeklyWeatherItem = memo(
  ({ dayName, icon, high, low, time }: WeeklyWeatherItemProps) => {
    const {
      data: { hourly },
    } = useWeatherData() as { data: WeatherData };

    const hours: DailyHourProps[] = useMemo(
      () =>
        hourly.time
          .map((time, i) => ({
            time,
            temp: hourly.temperature_2m[i],
            iconName: getIconName(
              0,
              hourly.temperature_2m[i],
              hourly.precipitation_probability[i],
              0,
              0
            ),
          }))
          .filter(({ time: hourTime }) => {
            return (
              new Date(hourTime).setHours(0, 0, 0, 0) ===
              new Date(time).setHours(0, 0, 0, 0)
            );
          })
          .slice(0, 24),
      [hourly]
    );
    const { control } = useForm({ defaultValues: { expanded: false } });

    return (
      <Controller
        name="expanded"
        control={control}
        render={({
          field: { value: expanded, onChange: setExpanded, ref },
        }) => (
          <MotiView
            animate={{
              backgroundColor: expanded
                ? "rgba(248, 248, 248, 0.14)"
                : "transparent",
              height: expanded ? 140 : 40,
              paddingTop: expanded ? 5 : 0,
              paddingBottom: expanded ? 5 : 0,
            }}
            transition={{
              type: "timing",
              duration: 200,
            }}
            style={styles.container}
          >
            <Pressable
              onPress={() => setExpanded(!expanded)}
              style={[styles.cardPreview]}
            >
              <View style={styles.day}>
                <Chevron direction={expanded ? "up" : "down"} />
                <Text style={styles.text}>{dayName}</Text>
              </View>
              <Contents high={high} low={low} icon={icon} />
            </Pressable>
            <DailyList hours={hours} />
          </MotiView>
        )}
      />
    );
  }
);
const styles = StyleSheet.create({
  container: {
    // flexDirection: "column",
    // alignItems: "center",
    borderRadius: 10,
    // height: 26,
    overflow: "hidden",

    // height: 40,
  },
  cardPreview: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 4,
  },
  day: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    width: "26%",
  },
  text: {
    fontSize: 12,
    color: "#fff",
  },
  temp: {
    flexDirection: "row",
    alignItems: "center",
    width: "22%",
    justifyContent: "space-between",
  },
});
