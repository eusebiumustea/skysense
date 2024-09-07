import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "../constants/weather-initial";
import { WeatherStateProps } from "../constants/types";

const weatherDataSlice = createSlice({
  initialState: INITIAL_STATE,
  name: "weather-data",
  reducers: {
    newWeatherData: (state, action: { payload: WeatherStateProps }) => {
      return { ...state, ...action.payload };
    },
  },
});
export const { newWeatherData } = weatherDataSlice.actions;
export const weatherDataReducer = weatherDataSlice.reducer;
