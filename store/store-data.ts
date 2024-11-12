import { configureStore } from "@reduxjs/toolkit";
import { initStore, persistReducer } from "react-native-redux-persist2";
import { locationDataReducer } from "./location-data-reducer";
import { weatherDataReducer } from "./weather-data-reducer";
const reducers = {
  dataReducer: weatherDataReducer,
  locationNameReducer: locationDataReducer,
};
const rootReducers = persistReducer(reducers);

export const store = configureStore({
  reducer: rootReducers,
});
initStore(store, { key: "root", storage: { type: "AsyncStorage" } });
