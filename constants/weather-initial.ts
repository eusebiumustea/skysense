import { WeatherStateProps } from "./types";

export const INITIAL_STATE: WeatherStateProps = {
  city: "New York",
  country: "USA",
  data: null,
  savedTime: new Date().getTime(),
};
