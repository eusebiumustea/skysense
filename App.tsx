import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";
import { Navigator } from "./tabs/navigator";
import { Provider } from "react-redux";
import { store } from "./store";
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    </Provider>
  );
}
