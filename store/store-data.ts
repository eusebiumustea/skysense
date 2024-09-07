import { configureStore } from "@reduxjs/toolkit";
import { weatherDataReducer } from "./weather-data-slice";

export const store = configureStore({
  reducer: {
    dataReducer: weatherDataReducer,
  },
});
