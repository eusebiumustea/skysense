import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableFreeze } from "react-native-screens";
import { Finder } from "./screens";
import { Tabs } from "./tabs";

const Stack = createNativeStackNavigator();
enableFreeze(true);
export function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Tabs"
        screenOptions={{
          animation: "default",

          headerShown: false,
        }}
      >
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Finder" component={Finder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
