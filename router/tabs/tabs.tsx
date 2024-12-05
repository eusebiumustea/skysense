import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { Header } from "../../components";
import { Home } from "./home";
import { Precipitations } from "./precipitations";
import { Dimensions, Platform } from "react-native";

const screenOptions: MaterialTopTabNavigationOptions = {
  tabBarActiveTintColor: "#fff",
  tabBarInactiveTintColor: "#868794",
  tabBarScrollEnabled: false,

  tabBarIndicatorStyle: {
    width: 26,
    marginHorizontal: "21%",
    backgroundColor: "white",
    borderRadius: 100,
    height: 1,
    bottom: -1,
  },
  swipeEnabled: true,
  tabBarBounces: false,
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
export function Tabs() {
  return (
    <>
      <Header />
      <Tab.Navigator
        screenOptions={screenOptions}
        style={{ backgroundColor: "#484B5B" }}
        initialRouteName="Today"
      >
        <Tab.Screen name="Today" component={Home} />
        <Tab.Screen name="Precipitation" component={Precipitations} />
      </Tab.Navigator>
    </>
  );
}
