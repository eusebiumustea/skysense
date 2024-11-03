import { View } from "react-native";
import { WeatherData } from "../../models/weather/types";
import { Cloudy, Rainy, Sunny, Sunset } from "../assets";
import { PropertyItem } from "../property-item/property-item";

export function PropertyItemsLayout({ data }: { data: WeatherData | null }) {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        marginTop: 21,
        paddingHorizontal: 8,
      }}
    >
      <View style={{ flexDirection: "column", rowGap: 12 }}>
        <PropertyItem
          icon={<Cloudy width={24} height={24} />}
          property="Precipitation"
          value={`${data?.current.rain}${data?.current_units.rain}`}
        />
        <PropertyItem
          icon={<Sunny width={24} height={24} />}
          property="Wind"
          value={`${data?.current.wind_speed_10m}${data?.current_units.wind_speed_10m}`}
        />
      </View>
      <View style={{ flexDirection: "column", rowGap: 12 }}>
        <PropertyItem
          icon={<Rainy width={24} height={24} />}
          property="Humidity"
          value={`${data?.current.relative_humidity_2m}${data?.current_units.relative_humidity_2m}`}
        />
        <PropertyItem
          icon={<Sunset width={24} height={24} translateY={3} />}
          property="Cloud cover"
          value={`${data?.current.cloud_cover}${data?.current_units.cloud_cover}`}
        />
      </View>
    </View>
  );
}
