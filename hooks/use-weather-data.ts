import { useSelector } from "react-redux";
import { WeatherStateProps } from "../config/types";

export const useWeatherData = () =>
  useSelector(
    (state: { weatherDataReducer: WeatherStateProps }) =>
      state.weatherDataReducer
  );
