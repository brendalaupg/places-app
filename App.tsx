import { StyleSheet, Text, View } from "react-native";
import MapScreen from "./src/screens/MapScreen";
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";
import { Provider } from "@ant-design/react-native";
import { Locale } from "@ant-design/react-native/lib/locale-provider";

const CURRENT_LOCALE: Partial<Locale> = enUS;

const App = () => {
  return (
    <Provider locale={CURRENT_LOCALE}>
      <MapScreen />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
