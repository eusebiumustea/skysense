import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useCallback, useState } from "react";
import { RefreshControl, ScrollView, ScrollViewProps } from "react-native";
import { useDispatch } from "react-redux";
import { useWeatherData } from "../../hooks";
import { newLocationData } from "../../store/location-data-reducer";
import { newWeatherData } from "../../store/weather-data-reducer";
import { fetchWeatherData } from "../../utils";
export function ScreenContainer({ ...props }: ScrollViewProps) {
  const dispatch = useDispatch();
  const weatherState = useWeatherData();
  const [refreshing, setRefreshing] = useState(false);
  async function refreshWeatherData() {
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();
    if (new Date().getTime() >= weatherState.savedTime + 480000) {
      const data = await fetchWeatherData(latitude, longitude);
      if (data) {
        dispatch(newWeatherData(data));
        await AsyncStorage.setItem("weather-data", JSON.stringify(data));
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
      await AsyncStorage.setItem("location", currentLocation);
    }
  }
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshWeatherData();
    setRefreshing(false);
  }, [weatherState]);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          style={{ zIndex: 1 }}
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={"#fff"}
        />
      }
      contentContainerStyle={{ padding: 16 }}
      style={{ flex: 1 }}
      {...props}
    />
  );
}
