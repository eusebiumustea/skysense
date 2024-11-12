import { Cloudy, Rainy, Sunny, Sunset } from "../components";
import { IconNames } from "../models/ui/types";

export function getIconName(
  windSpeed: number,
  temperature: number,
  precipitation: number,
  humidity: number,
  cloudCover: number
): IconNames {
  if (precipitation > 0) {
    return "rainy";
  } else if (cloudCover > 50) {
    return "cloudy";
  } else if (
    temperature > 15 &&
    cloudCover < 20 &&
    humidity < 60 &&
    windSpeed < 5
  ) {
    return "sunny";
  } else if (temperature < 15 && cloudCover < 20 && humidity > 50) {
    return "sunset";
  } else {
    return "cloudy";
  }
}
export function RenderIcon({
  iconName,
  width = 130,
  height = 140,
}: {
  iconName: IconNames;
  width?: number;
  height?: number;
}) {
  switch (iconName) {
    case "cloudy":
      return <Cloudy width={width} height={height} />;
    case "rainy":
      return <Rainy width={width} height={height} />;
    case "sunny":
      return <Sunny width={width} height={height} />;
    case "sunset":
      return <Sunset width={width} height={height} />;
  }
}
