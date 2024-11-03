import { useSelector } from "react-redux";

export const useLocationData = () =>
  useSelector(
    (state: { locationNameReducer: string }) => state.locationNameReducer
  );
