import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./store";
import { Navigator } from "./tabs/navigator";
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
        <Navigator />
      </SafeAreaProvider>
    </Provider>
  );
}
