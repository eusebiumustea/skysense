import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { RouteProp, ParamListBase } from "@react-navigation/native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRecoilValue } from "recoil";
import { currentLocation } from "../store/atom";
import { Text } from "react-native-fast-text";

export function ScreenLayout(props: {
  route: RouteProp<ParamListBase, string>;
  navigation: MaterialTopTabNavigationProp<ParamListBase, string, undefined>;
  theme: ReactNavigation.Theme;
  children: React.ReactElement;
}) {
  const location = useRecoilValue(currentLocation);
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top, backgroundColor: "red", flex: 1 }}>
      {props.children}
    </View>
  );
}
