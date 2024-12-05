import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationHelpers } from "@react-navigation/native-stack/lib/typescript/commonjs/src/types";
import { memo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { Back, SearchCard, SearchInput } from "../../../components";
import { useLocationData } from "../../../hooks/use-location-data";
import { SavedLocation } from "../../../models/locations/types";
import { SearchStatus } from "../../../models/ui/types";
import {
  manageLocations,
  selectNewLocation,
} from "../../../store/location-data-reducer";
import { newLocationName } from "../../../store/location-name-reducer";
import { newWeatherData } from "../../../store/weather-data-reducer";
import { fetchCurrentWeather, fetchWeatherData } from "../../../utils";
interface SearchState {
  status: SearchStatus;
  result: SavedLocation[];
}
const FinderHeader = memo(() => {
  const nav = useNavigation<NativeStackNavigationHelpers>();
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.header, { paddingTop: top + 16 }]}>
      <TouchableOpacity
        style={styles.headerBack}
        onPress={() => nav.goBack()}
        activeOpacity={0.5}
      >
        <Back />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Add city</Text>
    </View>
  );
});
export function Finder() {
  const dispatch = useDispatch();
  const locationData = useLocationData();
  const nav = useNavigation();
  const { top } = useSafeAreaInsets();
  const [{ status, result }, setSearch] = useState<SearchState>({
    result: [],
    status: null,
  });

  return (
    <View style={[styles.fill, { paddingTop: top + 44 }]}>
      <FinderHeader />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.scrollView}
        contentContainerStyle={{ padding: 16, gap: 16 }}
      >
        <SearchInput
          onChange={(result) => {
            setSearch((prev) => ({
              ...prev,
              result: result.filter(
                (e) => !locationData.savedLocations.includes(e)
              ),
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
                      coordinates: { lat: data.latitude, long: data.longitude },
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
        {locationData.savedLocations.length > 0 && (
          <Text style={styles.saved}>Saved locations</Text>
        )}
        {locationData.savedLocations.map((savedLocation, i) => (
          <SearchCard
            key={i}
            initialIconState="open"
            locationName={savedLocation.name}
            onAction={(action) => {
              if (action === "open") {
                fetchWeatherData(
                  savedLocation.coordinates.lat,
                  savedLocation.coordinates.long
                )
                  .then((data) => {
                    dispatch(selectNewLocation(savedLocation));
                    dispatch(newWeatherData(data));
                    dispatch(newLocationName(savedLocation.name));
                  })
                  .then(() => nav.goBack());
              }
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  fill: { backgroundColor: "#484B5B", height: "100%", width: "100%" },
  scrollView: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 8,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: "35%",
  },
  headerBack: {
    padding: 6,
  },
  activity: {
    alignSelf: "center",
  },
  not_found: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "700",
  },
  saved: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    marginHorizontal: 12,
  },
});
