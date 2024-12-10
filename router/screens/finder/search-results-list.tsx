import { useNavigation } from "@react-navigation/native";
import { memo, useState } from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import { SearchCard, SearchInput } from "../../../components";
import { SavedLocation } from "../../../models/locations/types";
import { SearchStatus } from "../../../models/ui/types";
import {
  manageLocations,
  selectNewLocation,
} from "../../../store/location-data-reducer";
import { newLocationName } from "../../../store/location-name-reducer";
import { newWeatherData } from "../../../store/weather-data-reducer";
import { fetchCurrentWeather } from "../../../utils";
interface SearchState {
  status: SearchStatus;
  result: SavedLocation[];
}

export const SearchResultsList = memo(() => {
  const [{ status, result }, setSearch] = useState<SearchState>({
    result: [],
    status: null,
  });
  const dispatch = useDispatch();
  const nav = useNavigation();

  return (
    <>
      <SearchInput
        onChange={(result) => {
          setSearch((prev) => ({
            ...prev,
            result,
          }));
        }}
        onSearchingStatusChange={(status) =>
          setSearch((prev) => ({ ...prev, status }))
        }
      />
      {status === "searching" && (
        <ActivityIndicator style={styles.activity} color={"#fff"} />
      )}
      {status === "not-found" && (
        <Text style={styles.not_found}>Locations not found</Text>
      )}
      {result.map((locationFound, i) => (
        <SearchCard
          key={i}
          initialIconState="add"
          locationName={locationFound.name}
          onAction={(action) => {
            if (action === "add") {
              dispatch(
                manageLocations({ type: "add", location: locationFound })
              );
              setSearch((prev) => ({
                ...prev,
                result: prev.result.filter((_, index) => index !== i),
              }));
            }
          }}
        />
      ))}
      <SearchCard
        locationName="Find current location"
        onAction={(action) => {
          if (action === "open") {
            fetchCurrentWeather()
              .then(({ data, name, savedTime }) => {
                if (!data) return;
                dispatch(
                  selectNewLocation({
                    coordinates: {
                      lat: data.latitude,
                      long: data.longitude,
                    },
                    name: name,
                  })
                );
                dispatch(newWeatherData({ savedTime, data: data || null }));
                dispatch(newLocationName(name));
              })
              .then(() => nav.goBack());
          }
        }}
        initialIconState="open"
      />
    </>
  );
});
const styles = StyleSheet.create({
  activity: {
    alignSelf: "center",
  },
  not_found: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "700",
  },
});
