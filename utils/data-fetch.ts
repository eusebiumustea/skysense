import axios from "axios";
import * as Location from "expo-location";
import { WeatherStateProps } from "../config/types";
import { WeatherData } from "../models/weather/types";
import { locationUrl } from "./location-utils";
export async function fetchWeatherData(
  latitude: number,
  longitude: number
): Promise<WeatherStateProps | undefined> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    const url = locationUrl(40, 74);
    const res = await axios.get<WeatherData>(url);
    return {
      data: res.status === 200 ? res.data : null,
      savedTime: new Date().getTime(),
    };
  }

  const url = locationUrl(latitude, longitude);
  const res = await axios.get<WeatherData>(url);

  return {
    data: res.status === 200 ? res.data : null,
    savedTime: new Date().getTime(),
  };
}
