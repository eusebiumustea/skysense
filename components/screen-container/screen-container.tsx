import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { PropsWithChildren, useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { SavedLocation } from "../../models/locations/types";
import { newLocationName } from "../../store/location-name-reducer";
import { newWeatherData } from "../../store/weather-data-reducer";
import { fetchCurrentWeather, fetchWeatherData } from "../../utils";
interface ScreenContainerProps {
  savedTime: number;
  scrollViewProps?: ScrollViewProps;
  selectedLocation: SavedLocation | null;
}
export function ScreenContainer({
  children,
  savedTime,
  selectedLocation,
  scrollViewProps,
}: PropsWithChildren<ScreenContainerProps>) {
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);
  async function refreshWeatherData() {
    try {
      if (!selectedLocation) {
        if (new Date().getTime() >= savedTime + 480000) {
          const { data, savedTime, name } = await fetchCurrentWeather();
          if (data) {
            dispatch(newWeatherData({ data, savedTime }));
          }
          if (name.length > 0) {
            dispatch(newLocationName(name));
          }
        }

        return;
      }
      if (new Date().getTime() >= savedTime + 480000) {
        const data = await fetchWeatherData(
          selectedLocation.coordinates.lat,
          selectedLocation.coordinates.long
        );
        if (data) {
          dispatch(newWeatherData(data));
          dispatch(newLocationName(selectedLocation.name));
        }
      }
    } catch (error) {}
  }
  const { bottom } = useSafeAreaInsets();
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshWeatherData();
    setRefreshing(false);
  }, [savedTime, selectedLocation]);
  return (
    <LinearGradient colors={["#484B5B", "#2C2D35"]} style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            style={styles.refreshControl}
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={"#fff"}
          />
        }
        {...scrollViewProps}
        style={[styles.scrollView, scrollViewProps?.style]}
        contentContainerStyle={[
          styles.contentContainerStyle,
          { paddingBottom: 16 + bottom },
          scrollViewProps?.contentContainerStyle,
        ]}
      >
        {children}
      </ScrollView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  contentContainerStyle: { padding: 16 },
  scrollView: { flex: 1, backgroundColor: "transparent" },
  refreshControl: { zIndex: 1 },
  container: {
    flex: 1,
  },
});
