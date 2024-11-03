import { WeatherStateProps } from "./types";

export const INITIAL_STATE: WeatherStateProps = {
  data: null,
  savedTime: new Date().getTime(),
};
