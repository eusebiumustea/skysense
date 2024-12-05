import axios from "axios";
import { WeatherStateProps } from "../config/types";
import { FetchWeatherResult, WeatherData } from "../models/weather/types";
import { locationUrl } from "./location-utils";
import { getCurrentPositionAsync, reverseGeocodeAsync } from "expo-location";
export async function fetchWeatherData(
  latitude: number,
  longitude: number
): Promise<WeatherStateProps> {
  const url = locationUrl(latitude, longitude);
  const res = await axios.get<WeatherData>(url);

  return {
    data: res.status === 200 ? res.data : null,
    savedTime: new Date().getTime(),
  };
}
export async function fetchWeather(
  latitude: number,
  longitude: number
): Promise<FetchWeatherResult> {
  const url = locationUrl(latitude, longitude);
  const res = await axios.get<WeatherData>(url);
  const location = await reverseGeocodeAsync({ latitude, longitude });
  return {
    data: res.status === 200 ? res.data : null,
    savedTime: new Date().getTime(),
    name:
      location.length > 0
        ? `${
            location[0].city || location[0].subregion || location[0].region
          }, ${location[0].country}`
        : "",
  };
}
export async function fetchCurrentWeather(): Promise<FetchWeatherResult> {
  const {
    coords: { latitude, longitude },
  } = await getCurrentPositionAsync();
  const url = locationUrl(latitude, longitude);
  const res = await axios.get<WeatherData>(url);
  const location = await reverseGeocodeAsync({ latitude, longitude });
  return {
    data: res.status === 200 ? res.data : null,
    savedTime: new Date().getTime(),
    name:
      location.length > 0
        ? `${
            location[0].city || location[0].subregion || location[0].region
          }, ${location[0].country}`
        : "",
  };
}
