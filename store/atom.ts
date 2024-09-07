import { atom, selector } from "recoil";
import { WeatherStateProps } from "../constants/types";
import { INITIAL_STATE } from "../constants/weather-initial";

export const weatherState = atom<WeatherStateProps>({
  default: INITIAL_STATE,
  key: "weather-data",
});

export const currentLocation = selector({
  get({ get }) {
    const state = get(weatherState);
    return `${state.city}, ${state.country}`;
  },
  key: "weather",
});
