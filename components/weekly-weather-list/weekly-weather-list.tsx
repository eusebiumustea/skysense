import { memo, useMemo } from "react";
import { DailyWeather, HourlyWeather } from "../../models/weather/types";
import { getIconName } from "../../utils/render-icon";
import { BackgroundGradientCard } from "../background-gradient-card";
import { RenderList } from "./render-list";
interface WeeklyWeatherListProps {
  daily: DailyWeather;
  hourly: HourlyWeather;
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
        <RenderList data={weeklyWeatherList} />
      </BackgroundGradientCard>
    );
  }
);
