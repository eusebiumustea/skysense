import { useEffect } from "react";
import { View } from "react-native";
import { fetchData } from "../../../utils";
import { useDispatch } from "react-redux";
import { newWeatherData } from "../../../store/weather-data-slice";
import { useWeatherData } from "../../../hooks";
import { Text } from "react-native-fast-text";

export function Home() {
  const dispatch = useDispatch();
  const data = useWeatherData();
  useEffect(() => {
    fetchData().then((data) => {
      if (data) dispatch(newWeatherData(data));
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Text>
        {data.city}, {data.country}
      </Text>
    </View>
  );
}
