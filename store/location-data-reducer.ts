import { createSlice } from "@reduxjs/toolkit";

const locationDataSlice = createSlice({
  initialState: "",
  name: "location-data",
  reducers: {
    newLocationData: (_, { payload }: { payload: string }) => {
      return payload;
    },
  },
});
export const { newLocationData } = locationDataSlice.actions;
export const locationDataReducer = locationDataSlice.reducer;
