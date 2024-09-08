import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Text } from "react-native-fast-text";
import { useDispatch } from "react-redux";
import {
  Cloudy,
  ScreenContainer,
  Tag,
  TextGradient,
} from "../../../components";
import { useWeatherData } from "../../../hooks";
import { newWeatherData } from "../../../store/weather-data-slice";
import { fetchData } from "../../../utils";
export function Home() {
  const dispatch = useDispatch();
  const { data } = useWeatherData();
  async function getData() {
    try {
      const data = await fetchData();
      if (data) {
        dispatch(newWeatherData(data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      SplashScreen.hideAsync();
    }
  }

  useEffect(() => {
    getData();
  }, []);
  if (!data) return <ActivityIndicator />;
  return (
    <ScreenContainer>
      <Tag style={{ alignSelf: "center" }}>{new Date().toDateString()}</Tag>
      <View
        style={{
          justifyContent: "space-between",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Cloudy />
        <TextGradient>{data?.current.temperature_2m || "?"}°</TextGradient>
      </View>

      <Text style={{ color: "#9B9EAD", textAlign: "center", fontSize: 12 }}>
        {data?.daily.temperature_2m_min[0] || ""}°/{" "}
        {data?.daily.temperature_2m_max[0] || ""}° {" |  Feels like "}
        <Text style={{ color: "#fff" }}>
          {data?.current.apparent_temperature || ""}°C
        </Text>
        {"     |    "}Wind{" "}
        <Text style={{ color: "#fff", textTransform: "uppercase" }}>
          {data?.current.wind_speed_10m}
          {data?.current_units.wind_speed_10m}
        </Text>
      </Text>
    </ScreenContainer>
  );
}
