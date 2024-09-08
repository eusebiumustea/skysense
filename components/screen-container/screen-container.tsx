import { useState, useCallback } from "react";
import { RefreshControl, ScrollView, ScrollViewProps } from "react-native";
import { newWeatherData } from "../../store/weather-data-slice";
import { fetchData } from "../../utils";
import { useDispatch } from "react-redux";
import { useWeatherData } from "../../hooks";

export function ScreenContainer({ ...props }: ScrollViewProps) {
  const dispatch = useDispatch();
  const { savedTime } = useWeatherData();
  const [refreshing, setRefreshing] = useState(false);
  async function refreshWeatherData() {
    if (new Date().getTime() >= savedTime + 900000) {
      console.log("fetching");

      const data = await fetchData();
      if (data) dispatch(newWeatherData(data));
    }
    console.log("not fetching");
  }
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshWeatherData();
    setRefreshing(false);
  }, []);
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
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16 }}
      {...props}
    />
  );
}
