import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Forecast, Home } from "./screens";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

export function Navigator() {
  const { top } = useSafeAreaInsets();
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Today" style={{ paddingTop: top }}>
        <Tab.Screen name="Today" component={Home} />
        <Tab.Screen name="Forecast" component={Forecast} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
