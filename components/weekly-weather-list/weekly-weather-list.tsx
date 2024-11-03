import { memo, useMemo } from "react";
import { FlatList } from "react-native";
import { Sunny } from "../assets";
import { BackgroundGradientCard } from "../background-gradient-card";
import { WeeklyWeatherItem } from "../weekly-weather-item";
interface WeeklyWeatherListProps {
  data: {
    time: string[];
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];
    precipitation_sum: number[];
  };
}
export const WeeklyWeatherList = memo(({ data }: WeeklyWeatherListProps) => {
  const weeklyWeatherList = useMemo(
    () =>
      data?.time.map((time, i) => ({
        time,
        max: data.apparent_temperature_max[i],
        min: data.apparent_temperature_min[i],
        precipitation: data?.precipitation_sum[i] || 0,
      })) || [],
    [data]
  );
  return (
    <BackgroundGradientCard>
      <FlatList
        data={weeklyWeatherList}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ gap: 16 }}
        renderItem={({ item }) => (
          <WeeklyWeatherItem
            high={item.max}
            low={item.min}
            icon={<Sunny />}
            dayName={new Date(item.time).toDateString()}
          />
        )}
      />
    </BackgroundGradientCard>
  );
});
