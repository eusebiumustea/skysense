import { FlashList } from "@shopify/flash-list";
import { useEffect, useMemo, useRef } from "react";
import { View } from "react-native";
import { HourData } from "../../models/hourly-data/types";
import { WeatherData } from "../../models/weather/types";
import { Cloudy } from "../assets";
import { HourlyDataCard } from "../hourly-data-card";
interface HourlyDataListProps {
  data: WeatherData;
}
export function HourlyDataList({ data }: HourlyDataListProps) {
  const scrollRef = useRef<FlashList<HourData>>(null);

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

  const hourData = useMemo(() => {
    return data.hourly.time
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
          temperature: data.hourly.temperature_2m[i],
          isFocused: new Date(time).getHours() === new Date().getHours(),
          precipitationPropability:
            data.hourly.precipitation_probability[i] || 0,
        };
      });
  }, [data]);

  return (
    <View style={{ marginVertical: 16 }}>
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
        contentContainerStyle={{ paddingVertical: 8 }}
        renderItem={({ item }) => (
          <HourlyDataCard
            precipitationPropability={
              item.precipitationPropability > 0 && item.precipitationPropability
            }
            Icon={(props) => <Cloudy {...props} />}
            focused={item.isFocused}
            hour={new Date(item.time).getHours().toString()}
            temperature={item.temperature}
          />
        )}
      />
    </View>
  );
}
