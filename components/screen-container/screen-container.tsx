import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { newLocationData } from "../../store/location-data-reducer";
import { newWeatherData } from "../../store/weather-data-reducer";
import { fetchWeatherData } from "../../utils";
interface ScreenContainerProps extends ScrollViewProps {
  savedTime: number;
}
export function ScreenContainer({ savedTime, ...props }: ScreenContainerProps) {
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);
  async function refreshWeatherData() {
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();
    if (new Date().getTime() >= savedTime + 480000) {
      const data = await fetchWeatherData(latitude, longitude);
      if (data) {
        dispatch(newWeatherData(data));
      }
    }
    const location = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    if (location.length > 0) {
      const currentLocation = `${
        location[0].city || location[0].subregion || location[0].region
      }, ${location[0].country}`;
      dispatch(newLocationData(currentLocation));
    }
  }
  const { bottom } = useSafeAreaInsets();
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshWeatherData();
    setRefreshing(false);
  }, [savedTime]);
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
        {...props}
        style={[styles.scrollView, props.style]}
        contentContainerStyle={[
          styles.contentContainerStyle,
          { paddingBottom: 16 + bottom },
          props.contentContainerStyle,
        ]}
      />
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
