import { useSelector } from "react-redux";

export const useLocationName = () =>
  useSelector(
    (state: { storedLocationNameReducer: string }) =>
      state.storedLocationNameReducer
  );
