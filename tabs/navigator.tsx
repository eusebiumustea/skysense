import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Header } from "../components";
import { Forecast, Home } from "./screens";
const screenOptions: MaterialTopTabNavigationOptions = {
  tabBarActiveTintColor: "#fff",
  tabBarInactiveTintColor: "#868794",
  tabBarIndicatorStyle: {
    width: 26,
    marginHorizontal: 85,
    backgroundColor: "white",
    borderRadius: 100,
    height: 1,
    bottom: -1,
  },
  swipeEnabled: false,
  tabBarBounces: false,
  tabBarAndroidRipple: { color: "#484B5B", borderless: false },
  tabBarStyle: {
    backgroundColor: "transparent",
    elevation: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    borderBottomWidth: 1,
    borderBottomColor: "#868794",
  },
  lazy: true,
};
const Tab = createMaterialTopTabNavigator();
export function Navigator() {
  return (
    <NavigationContainer>
      <Header />
      <Tab.Navigator
        screenOptions={screenOptions}
        style={{ backgroundColor: "#484B5B" }}
        initialRouteName="Today"
      >
        <Tab.Screen name="Today" component={Home} />
        <Tab.Screen name="Precipitation" component={Forecast} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
