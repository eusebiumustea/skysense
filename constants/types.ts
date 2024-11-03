import { WeatherData } from "../models/weather/types";

export interface WeatherStateProps {
  data: WeatherData | null;
  savedTime: number;
}
