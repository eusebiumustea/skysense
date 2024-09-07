import { View } from "react-native";
import { Text } from "react-native-fast-text";
import { useRecoilValue } from "recoil";
import { weatherState } from "../../../store/atom";

export function Home() {
  const weather = useRecoilValue(weatherState);
  return <View style={{ flex: 1 }}></View>;
}
