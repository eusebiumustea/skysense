import { memo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { IconNames } from "../../models/ui/types";
import { DailyHourlyCard } from "../daily-hourly-card";
interface DailyHourProps {
  temp: number;
  time: string;
  iconName: IconNames;
}
export const DailyList = memo(({ hours }: { hours: DailyHourProps[] }) => {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      data={hours}
      updateCellsBatchingPeriod={1000}
      initialNumToRender={3}
      maxToRenderPerBatch={3}
      style={[styles.listContainer]}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <DailyHourlyCard
          temp={item.temp}
          time={item.time}
          iconName={item.iconName}
        />
      )}
    />
  );
});
const styles = StyleSheet.create({
  listContainer: {
    position: "absolute",
    paddingHorizontal: 8,
    marginTop: 40,
  },
});
