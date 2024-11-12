import { StyleSheet, View } from "react-native";
import { CurrentWeather, Units, WeatherData } from "../../models/weather/types";
import { Cloudy, Rainy, Sunny, Sunset } from "../assets";
import { PropertyItem } from "../property-item/property-item";

export function PropertyItemsLayout({
  data,
  units,
}: {
  data: CurrentWeather;
  units: Units;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 8,
      }}
    >
      <View style={styles.column}>
        <PropertyItem
          icon={<Cloudy width={24} height={24} />}
          property="Precipitation"
          value={`${data.rain}${units.rain}`}
        />
        <PropertyItem
          icon={<Sunny width={24} height={24} />}
          property="Wind"
          value={`${data?.wind_speed_10m}${units.wind_speed_10m}`}
        />
      </View>
      <View style={styles.column}>
        <PropertyItem
          icon={<Rainy width={24} height={24} />}
          property="Humidity"
          value={`${data.relative_humidity_2m}${units.relative_humidity_2m}`}
        />
        <PropertyItem
          icon={<Sunset width={24} height={24} translateY={3} />}
          property="Cloud cover"
          value={`${data.cloud_cover}${units.cloud_cover}`}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  column: { flexDirection: "column", rowGap: 12 },
});
