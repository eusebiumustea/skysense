import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Text } from "react-native-fast-text";
import { useDispatch } from "react-redux";
import {
  Cloudy,
  HourlyDataList,
  LineAsset,
  PropertyItemsLayout,
  ScreenContainer,
  Tag,
  TextGradient,
  WeeklyWeatherList,
} from "../../../components";
import { WeatherStateProps } from "../../../constants/types";
import { useWeatherData } from "../../../hooks";
import { newLocationData } from "../../../store/location-data-reducer";
import { newWeatherData } from "../../../store/weather-data-reducer";
import { fetchWeatherData } from "../../../utils";
export function Home() {
  const dispatch = useDispatch();
  const { data } = useWeatherData();
  const [status, request] = Location.useForegroundPermissions();
  useEffect(() => {
    async function getData() {
      try {
        if (status && !status.granted) {
          const newStatus = await request();
          if (!newStatus?.granted) {
            return;
          }
        }
        const storedLocation = await AsyncStorage.getItem("location");
        console.log(storedLocation);

        if (storedLocation) {
          dispatch(newLocationData(storedLocation));
        }

        const storedData = await AsyncStorage.getItem("weather-data");
        if (!storedData) {
          const {
            coords: { latitude, longitude },
          } = await Location.getCurrentPositionAsync();
          const data = await fetchWeatherData(latitude, longitude);

          if (data) {
            dispatch(newWeatherData(data));
            await AsyncStorage.setItem("weather-data", JSON.stringify(data));
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
          return;
        }
        const parsedStoredData: WeatherStateProps =
          storedData && JSON.parse(storedData);
        console.log(parsedStoredData);

        if (parsedStoredData) {
          dispatch(newWeatherData(parsedStoredData));
        }
        if (new Date().getTime() >= parsedStoredData.savedTime + 480000) {
          console.log("performing new fetching");
          const {
            coords: { latitude, longitude },
          } = await Location.getCurrentPositionAsync();

          const data = await fetchWeatherData(latitude, longitude);

          if (data) {
            dispatch(newWeatherData(data));
            await AsyncStorage.setItem("weather-data", JSON.stringify(data));
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
      } catch (error) {
        console.log(error);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    getData();
  }, []);

  if (!data)
    return (
      <ActivityIndicator
        size={"large"}
        style={{ alignSelf: "center", position: "absolute", top: "50%" }}
      />
    );
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
        <TextGradient>
          {Math.round(data.current.temperature_2m) || "?"}°
        </TextGradient>
      </View>
      <Text style={{ color: "#9B9EAD", textAlign: "center", fontSize: 12 }}>
        Min {Math.round(data.daily.apparent_temperature_min[0]) || ""}°/ Max{" "}
        {Math.round(data.daily.apparent_temperature_max[0]) || ""}°{" "}
        {" | Feels like "}
        <Text style={{ color: "#fff" }}>
          {Math.round(data.current.apparent_temperature) || ""}
          {data.current_units.apparent_temperature}
        </Text>
        {"      |      "}Wind{"  "}
        <Text style={{ color: "#fff", textTransform: "uppercase" }}>
          {data?.current.wind_speed_10m}
          {data?.current_units.wind_speed_10m}
        </Text>
      </Text>
      <LineAsset style={{ marginTop: 21 }} />
      {/* <PropertyItemsLayout data={data} />
      {data.hourly.time && <HourlyDataList data={data} />}
      {data.daily && <WeeklyWeatherList data={data.daily} />} */}
    </ScreenContainer>
  );
}
