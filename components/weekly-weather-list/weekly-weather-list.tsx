import { memo, useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { weekDays } from "../../config/date";
import { IconNames } from "../../models/ui/types";
import { DailyWeather, HourlyWeather } from "../../models/weather/types";
import { getIconName, RenderIcon } from "../../utils/render-icon";
import { BackgroundGradientCard } from "../background-gradient-card";
import { WeeklyWeatherItem } from "../weekly-weather-item";
interface WeeklyWeatherListProps {
  daily: DailyWeather;
  hourly: HourlyWeather;
}
interface RenderListProps {
  data: {
    time: string;
    max: number;
    min: number;
    precipitation: number;
    iconName: IconNames;
  }[];
}
export const WeeklyWeatherList = memo(
  ({ daily, hourly }: WeeklyWeatherListProps) => {
    const weeklyWeatherList = useMemo(
      () =>
        daily.time.map((time, dailyIndex) => ({
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
        })) || [],
      [daily]
    );

    return (
      <BackgroundGradientCard>
        {/* <FlatList
          data={weeklyWeatherList}
          scrollEnabled={false}
          updateCellsBatchingPeriod={1000}
          keyExtractor={(_, i) => i.toString()}
          ListHeaderComponent={
            
          }
          contentContainerStyle={{ gap: 6 }}
          renderItem={({ item }) => (
            <WeeklyWeatherItem
              time={item.time}
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
        /> */}
        <View style={styles.header}>
          <Text style={styles.headerText}>High</Text>
          <Text style={styles.headerText}>|</Text>
          <Text style={styles.headerText}>Low</Text>
        </View>
        <View style={styles.container}>
          {weeklyWeatherList.map((item, i) => (
            <WeeklyWeatherItem
              key={i}
              time={item.time}
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
          ))}
        </View>
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
    marginBottom: 8,
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    rowGap: 10,
  },
});
