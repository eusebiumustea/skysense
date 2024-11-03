import { configureStore } from "@reduxjs/toolkit";
import { weatherDataReducer } from "./weather-data-reducer";
import { locationDataReducer } from "./location-data-reducer";

export const store = configureStore({
  reducer: {
    dataReducer: weatherDataReducer,
    locationNameReducer: locationDataReducer,
  },
});
