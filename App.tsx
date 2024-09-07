import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";
import { Navigator } from "./tabs/navigator";
import { RecoilRoot } from "recoil";
export default function App() {
  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    </RecoilRoot>
  );
}
