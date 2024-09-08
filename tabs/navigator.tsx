import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { Header } from "../components";
import { useWeatherData } from "../hooks";
import { newWeatherData } from "../store/weather-data-slice";
import { fetchData } from "../utils";
import { Forecast, Home } from "./screens";

export function Navigator() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <NavigationContainer>
      <LinearGradient
        colors={["#484B5B", "#2C2D35"]}
        dither={true}
        style={{
          flex: 1,
        }}
      >
        <Header />
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: "#868794",
            tabBarIndicatorStyle: {
              width: 26,
              marginHorizontal: 50,
              backgroundColor: "white",
              borderRadius: 100,
              height: 1,
              bottom: -1,
            },
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
          }}
          sceneContainerStyle={{ backgroundColor: "transparent" }}
          initialRouteName="Today"
        >
          <Tab.Screen name="Today" component={Home} />
          <Tab.Screen name="Forecast" component={Forecast} />
          <Tab.Screen name="Precipitation" component={Forecast} />
        </Tab.Navigator>
      </LinearGradient>
    </NavigationContainer>
  );
}
