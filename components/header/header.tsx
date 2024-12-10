import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationHelpers } from "@react-navigation/native-stack/lib/typescript/commonjs/src/types";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocationName } from "../../hooks";
import { Search } from "../assets";

export function Header() {
  const { top } = useSafeAreaInsets();
  const locationName = useLocationName();
  const nav = useNavigation<NativeStackNavigationHelpers>();
  return (
    <View style={[styles.container, { paddingTop: top + 16 }]}>
      <StatusBar style="light" />
      {locationName.length === 0 && (
        <ActivityIndicator style={styles.activity} />
      )}
      {locationName.length > 0 && (
        <Text style={styles.label}>{locationName}</Text>
      )}
      <TouchableOpacity
        onPress={() => nav.navigate("Finder")}
        style={[styles.searchButton, { top: top + 16 }]}
        activeOpacity={0.5}
      >
        <Search />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  label: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    maxWidth: "70%",
  },
  activity: { alignSelf: "center" },
  container: {
    paddingBottom: 16,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#484B5B",
    flexDirection: "row",
  },
  searchButton: {
    position: "absolute",
    right: 16,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
});
