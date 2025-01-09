import { geocodeAsync, reverseGeocodeAsync } from "expo-location";
import { memo, useCallback } from "react";
import { StyleSheet, TextInput } from "react-native";
import Animated, { SequencedTransition } from "react-native-reanimated";
import { useLocationData } from "../../hooks/use-location-data";
import { SavedLocation } from "../../models/locations/types";
import { SearchStatus } from "../../models/ui/types";
import { shadow } from "../../ui-config/shadow";
import { debounce } from "../../utils/debounce";
import { Button } from "../assets";
interface SearchInputProps {
  onChange: (locationsFound: SavedLocation[]) => void;
  onSearchingStatusChange: (status: SearchStatus) => void;
}
const removeKeyNamesDuplicates = (input: string) => {
  const acc: string[] = [];
  input.split(", ").forEach((e) => !acc.includes(e) && acc.push(e));
  return acc.join(", ");
};

export const SearchInput = memo(
  ({ onChange, onSearchingStatusChange }: SearchInputProps) => {
    const { savedLocations } = useLocationData();
    const sendResult = useCallback(
      debounce(async (text: string) => {
        if (text.length > 0) {
          onSearchingStatusChange(null);
          onSearchingStatusChange("searching");
          const result = await geocodeAsync(text);

          if (result.length === 0) {
            onSearchingStatusChange("not-found");
          }

          if (result.length > 0) {
            let savedLocationsResults: SavedLocation[] = [];
            for (let i = 0; i < result.length; i++) {
              const { latitude, longitude } = result[i];
              const reversedGeocode = await reverseGeocodeAsync({
                latitude,
                longitude,
              });
              if (reversedGeocode.length > 0) {
                const newSavedLocations = await Promise.all(
                  reversedGeocode.map((address) => {
                    const regionSelector = `${
                      (address.region && `${address.region}, `) || ""
                    }${(address.city && `${address.city}, `) || ""}`;
                    const formattedAdress = `${removeKeyNamesDuplicates(
                      regionSelector
                    )}${address.country}`;

                    return {
                      coordinates: { lat: latitude, long: longitude },
                      name: formattedAdress,
                    };
                  })
                );
                savedLocationsResults = [
                  ...savedLocationsResults,
                  ...newSavedLocations,
                ];
              }
            }
            const filteredSavedLocationsResults = savedLocationsResults.filter(
              (resultItem) =>
                !savedLocations.some((e) => e.name === resultItem.name)
            );
            if (filteredSavedLocationsResults.length === 0) {
              onSearchingStatusChange("not-found");
              return;
            }

            onChange(filteredSavedLocationsResults);
            onSearchingStatusChange(null);
          }
        }
      }, 1200),
      [savedLocations]
    );
    return (
      <Animated.View
        layout={SequencedTransition}
        style={[styles.container, shadow]}
      >
        <TextInput
          style={styles.input}
          onChangeText={sendResult}
          placeholder="Enter cities"
          placeholderTextColor={"#484B5B"}
        />
        <Button icon="search" />
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  input: {
    height: "100%",
    color: "#fff",
    flexGrow: 1,
  },
  container: {
    height: 44,
    width: "100%",
    backgroundColor: "#232329",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    paddingHorizontal: 16,
  },
});
