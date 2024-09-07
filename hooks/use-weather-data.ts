import { useSelector } from "react-redux";
import { WeatherStateProps } from "../constants/types";

export const useWeatherData = () =>
  useSelector((state: { dataReducer: WeatherStateProps }) => state.dataReducer);
