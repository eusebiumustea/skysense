export interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    precipitation: string;
    rain: string;
    weather_code: string;
    cloud_cover: string;
    wind_speed_10m: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    rain: number;
    weather_code: number;
    cloud_cover: number;
    wind_speed_10m: number;
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
    dew_point_2m: string;
    precipitation_probability: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    dew_point_2m: number[];
    precipitation_probability: number[];
  };
  daily_units: {
    time: string;
    apparent_temperature_max: string;
    apparent_temperature_min: string;
    precipitation_sum: string;
  };
  daily: {
    time: string[];
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];
    precipitation_sum: number[];
  };
}
