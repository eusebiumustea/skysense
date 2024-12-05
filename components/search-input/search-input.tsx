import { geocodeAsync, reverseGeocodeAsync } from "expo-location";
import { memo } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { SavedLocation } from "../../models/locations/types";
import { SearchStatus } from "../../models/ui/types";
import { shadow } from "../../ui-config/shadow";
import { debounce } from "../../utils/debounce";
import { Search } from "../assets";
interface SearchInputProps {
  onChange: (locationsFound: SavedLocation[]) => void;
  onSearchingStatusChange: (status: SearchStatus) => void;
}

export const SearchInput = memo(
  ({ onChange, onSearchingStatusChange }: SearchInputProps) => {
    return (
      <View style={[styles.container, shadow]}>
        <Search style={{ marginHorizontal: 12 }} />
        <TextInput
          style={[styles.input]}
          onChangeText={debounce(async (text: string) => {
            if (text.length > 0) {
              onSearchingStatusChange(null);
              onSearchingStatusChange("searching");
              const result = await geocodeAsync(text);
              if (result.length === 0) {
                onSearchingStatusChange("not-found");
              }
              if (result.length > 0) {
                let savedLocations: SavedLocation[] = [];
                for (let i = 0; i < result.length; i++) {
                  const { latitude, longitude } = result[i];
                  const reversedGeocode = await reverseGeocodeAsync({
                    latitude,
                    longitude,
                  });
                  if (reversedGeocode.length > 0) {
                    const newSavedLocations = await Promise.all(
                      reversedGeocode.map((address) => {
                        return {
                          coordinates: { lat: latitude, long: longitude },
                          name: `${
                            address.subregion || address.region || address.city
                          }, ${address.country}`,
                        };
                      })
                    );
                    savedLocations = [...savedLocations, ...newSavedLocations];
                  }
                }
                if (savedLocations.length === 0) {
                  onSearchingStatusChange("not-found");
                  return;
                }
                onChange(savedLocations);
                onSearchingStatusChange(null);
              }
            }
          }, 1000)}
          placeholder="Enter cities"
          placeholderTextColor={"#484B5B"}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: "100%",
    color: "#fff",
  },
  container: {
    height: 44,
    width: "100%",
    backgroundColor: "#232329",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
