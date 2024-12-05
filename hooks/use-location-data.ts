import { useSelector } from "react-redux";
import { LocationProps } from "../models/locations/types";

export const useLocationData = () =>
  useSelector(
    (state: { locationDataReducer: LocationProps }) => state.locationDataReducer
  );
