import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { Navigator } from "./router/navigator";
import { store } from "./store";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    medium: require("./assets/medium.ttf"),
    regular: require("./assets/regular.ttf"),
    semibold: require("./assets/semibold.ttf"),
  });

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Navigator />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}
