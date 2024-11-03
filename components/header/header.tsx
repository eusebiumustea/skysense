import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import { Text } from "react-native-fast-text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocationData } from "../../hooks";

export function Header() {
  const { top } = useSafeAreaInsets();
  const locationName = useLocationData();
  return (
    <View
      style={{
        paddingTop: top + 16,
        paddingBottom: 16,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar style="light" />
      {locationName.length === 0 && (
        <ActivityIndicator style={{ alignSelf: "center" }} />
      )}
      {locationName.length > 0 && (
        <Text style={{ textAlign: "center", color: "#fff" }}>
          {locationName}
        </Text>
      )}
    </View>
  );
}
