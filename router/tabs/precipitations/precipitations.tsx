import { useMemo } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import { PrecipitationCard, ScreenContainer } from "../../../components";
import { useWeatherData } from "../../../hooks";
const chartConfig: AbstractChartConfig = {
  color: () => "#fff",
  fillShadowGradientFrom: "#D2D2D3",
  fillShadowGradientOpacity: 1,
  fillShadowGradientTo: "#80838A",
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,

  barPercentage: 0.9,
  propsForLabels: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
};
export function Precipitations() {
  const { width } = useWindowDimensions();
  const { savedTime, data } = useWeatherData();
  const weekDays = useMemo(
    () =>
      data?.daily.time.map((time) =>
        new Date(time).toDateString().slice(0, 3).toUpperCase()
      ),
    [data]
  );
  const precipitationDays = useMemo(() => {
    if (data) {
      return data?.daily.time
        .map((time, i) => ({
          time,
          windSpeed: `ssw ${data.daily.wind_speed_10m_max[i]}${data.daily_units.wind_speed_10m_max}`,
          precipitation: `${data.daily.precipitation_probability_max[i]}${data.daily_units.precipitation_probability_max}`,
          temperatureLimits: `${Math.round(data.daily.temperature_2m_min[i])}${
            data.daily_units.temperature_2m_min
          } / ${Math.round(data.daily.temperature_2m_max[i])}${
            data.daily_units.temperature_2m_max
          }`,
        }))
        .filter((_, i) => {
          return data.daily.precipitation_probability_max[i] >= 30;
        });
    }
    return [];
  }, [data]);

  return (
    <ScreenContainer savedTime={savedTime}>
      <Text style={styles.title}>Precipitation</Text>
      {data?.daily && (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
              columnGap: 34,
            }}
          >
            {weekDays?.map((dayName) => (
              <Text key={dayName} style={{ fontSize: 10, color: "#96979C" }}>
                {dayName}
              </Text>
            ))}
          </View>
          <BarChart
            data={{
              datasets: [{ data: data.daily.precipitation_probability_max }],
              labels: data.daily.precipitation_probability_max.map((e) =>
                e.toString()
              ),
            }}
            yAxisSuffix="%"
            width={width - (8 / 100) * width}
            yAxisLabel="%"
            xAxisLabel="%"
            showBarTops={true}
            style={styles.chart}
            height={220}
            fromZero
            withInnerLines={false}
            withHorizontalLabels={false}
            chartConfig={chartConfig}
          />
        </>
      )}
      {precipitationDays.map(
        ({ time, windSpeed, precipitation, temperatureLimits }, i) => (
          <PrecipitationCard
            key={i}
            time={time}
            windSpeed={windSpeed}
            precipitation={precipitation}
            temperatureLimits={temperatureLimits}
          />
        )
      )}
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontWeight: "semibold",
    fontSize: 14,
    marginBottom: 32,
  },
  chart: {
    alignSelf: "center",

    width: "100%",

    paddingRight: 0,
    paddingLeft: 0,
  },
});