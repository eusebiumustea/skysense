import { memo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { weekDays } from "../../config/date";
import { IconNames } from "../../models/ui/types";
import { RenderIcon } from "../../utils/render-icon";
import { WeeklyWeatherItem } from "../weekly-weather-item";
interface RenderListProps {
  data: {
    time: string;
    max: number;
    min: number;
    precipitation: number;
    iconName: IconNames;
  }[];
}
export const RenderList = memo(({ data }: RenderListProps) => {
  return (
    // <View style={styles.container}>
    //   {data.map((item, index) => (
    //     <WeeklyWeatherItem
    //       key={index}
    //       time={item.time}
    //       onPress={() => setExpanded((prev) => (prev === index ? null : index))}
    //       expanded={expanded === index}
    //       high={Math.round(item.max)}
    //       low={Math.round(item.min)}
    //       icon={<RenderIcon width={24} height={24} iconName={item.iconName} />}
    //       dayName={
    //         new Date(item.time).getDay() === new Date().getDay()
    //           ? "Today"
    //           : weekDays[new Date(item.time).getDay()]
    //       }
    //     />
    //   ))}
    // </View>
    <FlatList
      data={data}
      scrollEnabled={false}
      updateCellsBatchingPeriod={1000}
      keyExtractor={(_, i) => i.toString()}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.headerText}>High</Text>
          <Text style={styles.headerText}>|</Text>
          <Text style={styles.headerText}>Low</Text>
        </View>
      }
      contentContainerStyle={{ gap: 6 }}
      renderItem={({ item }) => (
        <WeeklyWeatherItem
          time={item.time}
          high={Math.round(item.max)}
          low={Math.round(item.min)}
          icon={<RenderIcon width={24} height={24} iconName={item.iconName} />}
          dayName={
            new Date(item.time).getDay() === new Date().getDay()
              ? "Today"
              : weekDays[new Date(item.time).getDay()]
          }
        />
      )}
    />
  );
});
const styles = StyleSheet.create({
  headerText: { opacity: 0.5, color: "#fff", fontSize: 12 },
  header: {
    width: "100%",
    justifyContent: "flex-end",
    flexDirection: "row",
    columnGap: 10,
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
});
