import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "../constants/weather-initial";
import { WeatherData } from "../models/weather/types";
interface PayloadActionProps {
  locationName?: string | null;
  data?: WeatherData | null;
  savedTime?: number;
}
const weatherDataSlice = createSlice({
  initialState: INITIAL_STATE,
  name: "weather-data",
  reducers: {
    newWeatherData: (state, action: { payload: PayloadActionProps }) => {
      return { ...state, ...action.payload };
    },
  },
});
export const { newWeatherData } = weatherDataSlice.actions;
export const weatherDataReducer = weatherDataSlice.reducer;
