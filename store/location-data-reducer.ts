import { createSlice } from "@reduxjs/toolkit";
import { LocationProps, SavedLocation } from "../models/locations/types";

const locationDataSlice = createSlice({
  initialState: {
    savedLocations: [],
    selectedLocation: "current",
  } as LocationProps,
  name: "location-data",

  reducers: {
    selectNewLocation: (state, { payload }: { payload: SavedLocation }) => {
      return { ...state, selectedLocation: payload };
    },
    manageLocations: (
      state,
      {
        payload,
      }: {
        payload:
          | { location: SavedLocation; type: "add" }
          | { removeItemIndex: number; type: "remove" };
      }
    ) => {
      if (payload.type === "add") {
        return {
          ...state,
          savedLocations: [...state.savedLocations, payload.location],
        };
      }
      if (payload.type === "remove") {
        return {
          ...state,
          savedLocations: state.savedLocations.filter(
            (_, i) => i !== payload.removeItemIndex
          ),
        };
      }
    },
  },
});
export const { selectNewLocation, manageLocations } = locationDataSlice.actions;
export const locationDataReducer = locationDataSlice.reducer;
