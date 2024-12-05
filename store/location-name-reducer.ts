import { createSlice } from "@reduxjs/toolkit";

const locationNameReducer = createSlice({
  name: "current-location-name",
  initialState: "",
  reducers: {
    newLocationName: (_, { payload }: { payload: string }) => payload,
  },
});
export const { newLocationName } = locationNameReducer.actions;
export const storedLocationNameReducer = locationNameReducer.reducer;
