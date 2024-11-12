import { FlashList } from "@shopify/flash-list";
import { MotiView } from "moti";
import { MotiPressable } from "moti/interactions";
import { memo, ReactNode, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Chevron } from "../assets";
import { DailyHourlyCard } from "../daily-hourly-card";
import { IconNames } from "../../models/ui/types";
interface WeeklyWeatherItemProps {
  dayName: string;
  icon: ReactNode;
  high: number;
  low: number;
  expanded: boolean;
  onPress: () => void;
  hours: DailyHourProps[];
}
interface DailyHourProps {
  temp: number;
  time: string;
  iconName: IconNames;
}
export const WeeklyWeatherItem = memo(
  ({
    dayName,
    icon,
    high,
    low,
    expanded,
    onPress,
    hours,
  }: WeeklyWeatherItemProps) => {
    return (
      <MotiView
        animate={{
          paddingHorizontal: expanded ? 8 : 0,
          paddingBottom: expanded ? 108 : 0,
          paddingTop: expanded ? 8 : 0,
          borderRadius: expanded ? 10 : 0,
          backgroundColor: expanded
            ? "rgba(248, 248, 248, 0.14)"
            : "transparent",
        }}
        transition={{
          type: "timing",
          duration: 260,
        }}
        style={styles.container}
      >
        <MotiPressable
          onPress={onPress}
          transition={{
            type: "timing",
            duration: 100,
          }}
          style={styles.cardPreview}
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
        {expanded && (
          <MotiView
            style={styles.listContainer}
            transition={{ type: "timing", delay: 300, duration: 150 }}
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FlashList
              estimatedItemSize={40}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={hours}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => <DailyHourlyCard {...item} />}
            />
          </MotiView>
        )}
      </MotiView>
    );
  }
);
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  cardPreview: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  day: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    width: "22%",
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
  listContainer: { height: 92, position: "absolute", bottom: 8 },
});
