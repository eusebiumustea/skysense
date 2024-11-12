import { memo, useMemo, useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { DailyWeather, HourlyWeather } from "../../models/weather/types";
import { Sunny } from "../assets";
import { BackgroundGradientCard } from "../background-gradient-card";
import { WeeklyWeatherItem } from "../weekly-weather-item";
import { weekDays } from "../../constants/date";
import { getIconName, RenderIcon } from "../../utils/render-icon";
interface WeeklyWeatherListProps {
  daily: DailyWeather;
  hourly: HourlyWeather;
}
export const WeeklyWeatherList = memo(
  ({ daily, hourly }: WeeklyWeatherListProps) => {
    const [expanded, setExpanded] = useState<number | null>(null);
    const weeklyWeatherList = useMemo(
      () =>
        daily?.time.map((time, dailyIndex) => ({
          time,
          max: daily.temperature_2m_max[dailyIndex],
          min: daily.temperature_2m_min[dailyIndex],
          precipitation: 0,
          iconName: getIconName(
            0,
            daily.temperature_2m_min[dailyIndex] +
              (daily.temperature_2m_max[dailyIndex] -
                daily.temperature_2m_min[dailyIndex]),
            hourly.precipitation_probability[(dailyIndex * 24) / 2],
            0,
            0
          ),
          hours: hourly.time
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
              console.log("recalc");

              // Ensure we match only hours belonging to the same day
              return (
                new Date(hourTime).setHours(0, 0, 0, 0) ===
                new Date(time).setHours(0, 0, 0, 0)
              );
            })
            .slice(0, 24),
        })) || [],
      [daily]
    );
    console.log(weeklyWeatherList);

    return (
      <BackgroundGradientCard>
        <FlatList
          data={weeklyWeatherList}
          scrollEnabled={false}
          keyExtractor={(_, i) => i.toString()}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.headerText}>High</Text>
              <Text style={styles.headerText}>|</Text>
              <Text style={styles.headerText}>Low</Text>
            </View>
          }
          renderItem={({ item, index }) => (
            <WeeklyWeatherItem
              hours={item.hours}
              onPress={() =>
                setExpanded((prev) => (prev === index ? null : index))
              }
              expanded={expanded === index}
              high={Math.round(item.max)}
              low={Math.round(item.min)}
              icon={
                <RenderIcon width={24} height={24} iconName={item.iconName} />
              }
              dayName={
                new Date(item.time).getDay() === new Date().getDay()
                  ? "Today"
                  : weekDays[new Date(item.time).getDay()]
              }
            />
          )}
        />
      </BackgroundGradientCard>
    );
  }
);
const styles = StyleSheet.create({
  headerText: { opacity: 0.5, color: "#fff", fontSize: 12 },
  header: {
    width: "100%",
    justifyContent: "flex-end",
    flexDirection: "row",
    columnGap: 10,
  },
});
