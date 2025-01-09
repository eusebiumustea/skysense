import * as Location from "expo-location";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useMemo } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import {
  DayCard,
  DetailsCard,
  HourlyDataList,
  LineAsset,
  PropertyItemsLayout,
  ScreenContainer,
  Tag,
  TextGradient,
  WeeklyWeatherList,
} from "../../../components";
import { useWeatherData } from "../../../hooks";
import { DetailsDataProps } from "../../../models/details/types";

import { useLocationData } from "../../../hooks/use-location-data";
import { newLocationName } from "../../../store/location-name-reducer";
import { newWeatherData } from "../../../store/weather-data-reducer";
import { fetchCurrentWeather, fetchWeather } from "../../../utils";
import { getIconName, RenderIcon } from "../../../utils/render-icon";
import React from "react";
export function Home() {
  const dispatch = useDispatch();
  const { data, savedTime } = useWeatherData();
  const locationData = useLocationData();
  const [status, request] = Location.useForegroundPermissions();
  useEffect(() => {
    async function getData() {
      try {
        if (!status?.granted) {
          const newStatus = await request();
          if (!newStatus?.granted) {
            return;
          }
        }
        await SplashScreen.hideAsync();
        if (locationData.selectedLocation === "current") {
          const { name, savedTime, data } = await fetchCurrentWeather();

          if (data) {
            dispatch(newWeatherData({ data, savedTime }));
          }

          if (name.length > 0) {
            dispatch(newLocationName(name));
          }
          return;
        }
        const coords = locationData.selectedLocation.coordinates;
        const { name, savedTime, data } = await fetchWeather(
          coords.lat,
          coords.long
        );
        if (data) {
          dispatch(newWeatherData({ savedTime, data: data || null }));
        }
        if (name.length > 0) {
          dispatch(newLocationName(locationData.selectedLocation.name));
        }
      } catch (error) {
        SplashScreen.hide();
      }
    }

    getData();
  }, []);

  const details = useMemo((): DetailsDataProps | undefined => {
    if (!data) {
      return;
    }
    const hourlyIndex = new Date().getHours();
    const daylyIndex = new Date().getDay();
    return {
      Visibility: `${data.hourly.visibility[hourlyIndex]}${data.hourly_units.visibility}`,
      "Dew point": `${data.hourly.dew_point_2m[hourlyIndex]}${data.hourly_units.dew_point_2m}`,
      "Feels like": `${data.current.apparent_temperature}°`,
      Humidity: `${data.current.relative_humidity_2m}${data.current_units.relative_humidity_2m}`,
      "UV Index": `${data.daily.uv_index_max[daylyIndex]}${data.daily_units.uv_index_max}`,
    };
  }, [data]);
  const iconName = useMemo(
    () =>
      (data &&
        getIconName(
          data.current.wind_speed_10m,
          data.current.temperature_2m,
          data.current.precipitation,
          data.current.relative_humidity_2m,
          data.current.cloud_cover
        )) ||
      "cloudy",
    [data]
  );

  return (
    <ScreenContainer
      selectedLocation={
        (locationData.selectedLocation !== "current" &&
          locationData.selectedLocation) ||
        null
      }
      savedTime={savedTime}
      scrollViewProps={{ contentContainerStyle: styles.screenContainer }}
    >
      {!data && <ActivityIndicator size="large" style={styles.activity} />}
      {data && (
        <>
          <Tag style={styles.dateTag}>{new Date().toDateString()}</Tag>
          <View style={styles.header}>
            <RenderIcon iconName={iconName} width={120} height={90} />
            <TextGradient>
              {Math.round(data.current.temperature_2m)}°
            </TextGradient>
          </View>
          <Text style={styles.temperatureText}>
            Min {Math.round(data.daily.temperature_2m_min[0])}° / Max{" "}
            {Math.round(data.daily.temperature_2m_max[0])}°{"  |  Feels like "}
            <Text style={styles.feelsLikeText}>
              {Math.round(data.current.apparent_temperature) || ""}
              {data.current_units.apparent_temperature}
            </Text>
            {"      |      "}Wind{"  "}
            <Text style={styles.windText}>
              {data?.current.wind_speed_10m}
              {data?.current_units.wind_speed_10m}
            </Text>
          </Text>
          <LineAsset />

          <PropertyItemsLayout data={data.current} units={data.current_units} />
          {data.hourly && <HourlyDataList data={data.hourly} />}
          <WeeklyWeatherList daily={data.daily} hourly={data.hourly} />
          {details && (
            <DetailsCard
              icon={<RenderIcon iconName={iconName} />}
              detailsDataProps={details}
            />
          )}
          <DayCard
            sunrise={data.daily.sunrise[new Date().getDay()]}
            sunset={data.daily.sunset[new Date().getDay()]}
          />
        </>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    gap: 21,
  },
  activity: {
    alignSelf: "center",
    position: "absolute",
    top: "50%",
  },
  dateTag: {
    alignSelf: "center",
  },
  header: {
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  temperatureText: {
    color: "#9B9EAD",
    textAlign: "center",
    fontSize: 12,
  },
  feelsLikeText: {
    color: "#fff",
  },
  windText: {
    color: "#fff",
    textTransform: "uppercase",
  },
});
