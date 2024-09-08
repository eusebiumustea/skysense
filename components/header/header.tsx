import { View } from "react-native";
import { useWeatherData } from "../../hooks";
import { Text } from "react-native-fast-text";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Header() {
  const data = useWeatherData();
  const { top } = useSafeAreaInsets();
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
      <Text style={{ textAlign: "center", color: "#fff" }}>
        {data.city}, {data.country}
      </Text>
    </View>
  );
}
