export interface WeatherData {
  current: CurrentWeather;
  current_units: Units;
  daily: DailyWeather;
  daily_units: DailyUnits;
  hourly: HourlyWeather;
  hourly_units: HourlyUnits;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
  elevation: number;
  generationtime_ms: number;
}
export interface CurrentWeather {
  apparent_temperature: number;
  cloud_cover: number;
  interval: number;
  precipitation: number;
  rain: number;
  relative_humidity_2m: number;
  temperature_2m: number;
  time: string;
  weather_code: number;
  wind_speed_10m: number;
}

export interface Units {
  apparent_temperature: string;
  cloud_cover: string;
  interval: string;
  precipitation: string;
  rain: string;
  relative_humidity_2m: string;
  temperature_2m: string;
  time: string;
  weather_code: string;
  wind_speed_10m: string;
}

export interface DailyWeather {
  daylight_duration: number[];
  sunrise: string[];
  sunset: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  time: string[];
  uv_index_max: number[];
  weather_code: number[];

  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
}

interface DailyUnits {
  daylight_duration: string;
  sunrise: string;
  sunset: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  time: string;
  uv_index_max: string;
  weather_code: string;
  precipitation_probability_max: string;
  wind_speed_10m_max: string;
}

export interface HourlyWeather {
  dew_point_2m: number[];
  precipitation_probability: number[];
  temperature_2m: number[];
  time: string[];
  visibility: number[];
}

interface HourlyUnits {
  dew_point_2m: string;
  precipitation_probability: string;
  temperature_2m: string;
  time: string;
  visibility: string;
}
