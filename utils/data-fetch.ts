import axios from "axios";
import * as Location from "expo-location";
import { WeatherStateProps } from "../constants/types";
import { WeatherData } from "../models/weather/types";
import { locationUrl } from "./location-utils";
export async function fetchData(): Promise<WeatherStateProps | undefined> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      const url = locationUrl(40, 74);
      const res = await axios.get<WeatherData>(url);
      if (res.status === 200) {
        return {
          city: "New York",
          country: "USA",
          data: res.data,
          savedTime: new Date().getTime(),
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
        savedTime: new Date().getTime(),
      };
    }
  } catch (error) {
    console.error(error);
  }
}
