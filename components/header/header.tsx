import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocationData } from "../../hooks";

export function Header() {
  const { top } = useSafeAreaInsets();
  const locationName = useLocationData();
  return (
    <View style={[styles.container, { paddingTop: top + 16 }]}>
      <StatusBar style="light" />
      {locationName.length === 0 && (
        <ActivityIndicator style={styles.activity} />
      )}
      {locationName.length > 0 && (
        <Text style={styles.label}>{locationName}</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  label: { textAlign: "center", color: "#fff" },
  activity: { alignSelf: "center" },
  container: {
    paddingBottom: 16,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#484B5B",
  },
});
