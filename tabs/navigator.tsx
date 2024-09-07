import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Forecast, Home } from "./screens";
import { ScreenLayout } from "./screen-layout";

const Tab = createMaterialTopTabNavigator();

export function Navigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Today"
        screenOptions={{}}
        screenLayout={ScreenLayout}
      >
        <Tab.Screen name="Today" component={Home} />
        <Tab.Screen name="Forecast" component={Forecast} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
