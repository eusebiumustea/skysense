import { configureStore } from "@reduxjs/toolkit";
import { initStore, persistReducer } from "react-native-redux-persist2";
import { locationDataReducer } from "./location-data-reducer";
import { storedLocationNameReducer } from "./location-name-reducer";
import { weatherDataReducer } from "./weather-data-reducer";
const reducers = {
  weatherDataReducer,
  locationDataReducer,
  storedLocationNameReducer,
};
const rootReducers = persistReducer(reducers);

export const store = configureStore({
  reducer: rootReducers,
});
initStore(store, { key: "root", storage: { type: "AsyncStorage" } });
