import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Finder } from "./screens";
import { Tabs } from "./tabs";

const Stack = createNativeStackNavigator({
  screens: { Tabs, Finder },
  initialRouteName: "Tabs",
  screenOptions: { headerShown: false },
});
const StaticNavigator = createStaticNavigation(Stack);
export function Navigator() {
  return <StaticNavigator />;
}
