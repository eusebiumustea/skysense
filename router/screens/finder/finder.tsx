import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationHelpers } from "@react-navigation/native-stack/lib/typescript/commonjs/src/types";
import { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { CurvedTransition } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { Back, SearchCard } from "../../../components";
import { useLocationData } from "../../../hooks/use-location-data";
import {
  manageLocations,
  selectNewLocation,
} from "../../../store/location-data-reducer";
import { newLocationName } from "../../../store/location-name-reducer";
import { newWeatherData } from "../../../store/weather-data-reducer";
import { fetchWeatherData } from "../../../utils";
import { SearchResultsList } from "./search-results-list";

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

  return (
    <>
      <FinderHeader />
      <Animated.ScrollView
        layout={CurvedTransition}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        style={styles.scrollView}
        contentContainerStyle={{
          padding: 16,
          gap: 16,
          paddingTop: top + 64,
          paddingBottom: 85,
        }}
      >
        <SearchResultsList />
        {locationData.savedLocations.length > 0 && (
          <Text style={styles.saved}>Saved locations</Text>
        )}

        {locationData.savedLocations.map((savedLocation, index) => (
          <SearchCard
            initialIconState="open"
            key={savedLocation.name}
            enableDelete
            onDelete={() =>
              dispatch(
                manageLocations({ type: "remove", removeItemIndex: index })
              )
            }
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
      </Animated.ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  fill: { backgroundColor: "#484B5B", height: "100%", width: "100%" },
  scrollView: { backgroundColor: "#484B5B", height: "100%", width: "100%" },
  header: {
    paddingHorizontal: 16,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 8,
    zIndex: 1,
    backgroundColor: "#484B5B",
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
