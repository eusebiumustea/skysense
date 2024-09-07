import { WeatherData } from "../models/weather/types";

export interface WeatherStateProps {
  city: string | null;
  country: string | null;
  data: WeatherData | null;
}
