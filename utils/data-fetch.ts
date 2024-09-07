import axios from "axios";
import { locationUrl } from "./location-utils";
import { WeatherData } from "../models/weather/types";
import { WeatherStateProps } from "../constants/types";
import * as Location from "expo-location";
export async function fetchData(): Promise<WeatherStateProps | undefined> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    const url = locationUrl(40, 74);
    const res = await axios.get<WeatherData>(url);
    if (res.status === 200) {
      return {
        city: "New York",
        country: "USA",
        data: res.data,
      };
    }
  }
  const {
    coords: { latitude, longitude },
  } = await Location.getCurrentPositionAsync();
  const location = await Location.reverseGeocodeAsync({
    latitude,
    longitude,
  });

  const [{ city, country, region, subregion }] = location;

  const url = locationUrl(latitude, longitude);
  const res = await axios.get<WeatherData>(url);

  if (res.status === 200) {
    return {
      city: city || subregion || region,
      country: country,
      data: res.data,
    };
  }
}
