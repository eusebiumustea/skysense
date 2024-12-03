import { MotiView } from "moti";
import { MotiPressable } from "moti/interactions";
import { memo, ReactNode, useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useWeatherData } from "../../hooks";
import { IconNames } from "../../models/ui/types";
import { WeatherData } from "../../models/weather/types";
import { getIconName } from "../../utils/render-icon";
import { Chevron } from "../assets";
import { DailyHourlyCard } from "../daily-hourly-card";
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
export const WeeklyWeatherItem = memo(
  ({ dayName, icon, high, low, time }: WeeklyWeatherItemProps) => {
    const {
      data: { hourly },
    } = useWeatherData() as { data: WeatherData };
    // const [showList, setShowList] = useState(false);
    // useEffect(() => {
    //   if (expanded) {
    //     setTimeout(() => setShowList(true), 260);
    //   } else {
    //     setShowList(false);
    //   }
    // }, [expanded]);
    const [expanded, setExpanded] = useState(false);
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

    return (
      <MotiView
        animate={{
          backgroundColor: expanded
            ? "rgba(248, 248, 248, 0.14)"
            : "transparent",
          height: expanded ? 140 : 40,
        }}
        transition={{
          type: "timing",
          duration: 180,
        }}
        style={styles.container}
      >
        <MotiPressable
          onPress={() => setExpanded((prev) => !prev)}
          style={styles.cardPreview}
          transition={{
            type: "timing",
            duration: 100,
          }}
          animate={useMemo(
            () =>
              ({ pressed }) => {
                "worklet";
                return {
                  scale: pressed ? 0.97 : 1,
                };
              },
            []
          )}
        >
          <View style={styles.day}>
            <Chevron direction={expanded ? "up" : "down"} />
            <Text style={styles.text}>{dayName}</Text>
          </View>
          {icon}
          <View style={styles.temp}>
            <Text style={styles.text}>{high}°</Text>
            <Text style={styles.text}>{low}°</Text>
          </View>
        </MotiPressable>

        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={hours}
          updateCellsBatchingPeriod={1000}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          style={[styles.listContainer]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <DailyHourlyCard
              temp={item.temp}
              time={item.time}
              iconName={item.iconName}
            />
          )}
        />
      </MotiView>
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
    paddingTop: 10,
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
  listContainer: {
    position: "absolute",

    paddingHorizontal: 8,
    marginTop: 40,
  },
});
