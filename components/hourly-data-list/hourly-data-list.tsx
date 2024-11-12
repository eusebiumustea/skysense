import { FlashList } from "@shopify/flash-list";
import { useEffect, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import { HourData } from "../../models/hourly-data/types";
import { HourlyWeather, WeatherData } from "../../models/weather/types";
import { getIconName, RenderIcon } from "../../utils/render-icon";
import { HourlyDataCard } from "../hourly-data-card";
interface HourlyDataListProps {
  data: HourlyWeather;
}
export function HourlyDataList({ data }: HourlyDataListProps) {
  const scrollRef = useRef<FlashList<HourData>>(null);

  const hourData = useMemo(() => {
    return data.time
      .filter((time) => {
        const dateInMillis = new Date(time).getTime();
        return (
          new Date().getTime() - 43200000 <= dateInMillis &&
          dateInMillis <= new Date().getTime() + 82800000
        );
      })
      .map((time, i) => {
        return {
          time,
          temperature: data.temperature_2m[i],
          isFocused: new Date(time).getHours() === new Date().getHours(),
          precipitationPropability: data.precipitation_probability[i] || 0,
          iconName: getIconName(
            0,
            data.temperature_2m[i],
            data.precipitation_probability[i] || 0,
            0,
            0
          ),
        };
      });
  }, [data]);
  useEffect(() => {
    setTimeout(
      () =>
        scrollRef.current?.scrollToIndex({
          index: hourData?.findIndex(({ isFocused }) => isFocused),
          animated: true,
        }),
      400
    );
  }, [data]);
  return (
    <FlashList
      ref={scrollRef}
      estimatedItemSize={56}
      horizontal
      initialScrollIndex={
        hourData?.findIndex(({ isFocused }) => isFocused) || 0
      }
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, i) => i.toString()}
      data={hourData}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => (
        <HourlyDataCard
          precipitationPropability={
            item.precipitationPropability > 0 && item.precipitationPropability
          }
          Icon={(props) => (
            <RenderIcon
              width={props.width as number}
              height={props.height as number}
              iconName={item.iconName}
            />
          )}
          focused={item.isFocused}
          hour={new Date(item.time).getHours().toString()}
          temperature={item.temperature}
        />
      )}
    />
  );
}
const styles = StyleSheet.create({
  content: { paddingVertical: 8 },
});
