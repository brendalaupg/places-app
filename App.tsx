import { StyleSheet } from "react-native";
import MapScreen from "./src/screens/MapScreen";
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";
import { Provider as AntDesignProvider } from "@ant-design/react-native";
import { Locale } from "@ant-design/react-native/lib/locale-provider";
import { Provider } from "react-redux";
import rootStore from "./src/root";

const CURRENT_LOCALE: Partial<Locale> = enUS;

const App = () => {
  return (
    <Provider store={rootStore}>
      <AntDesignProvider locale={CURRENT_LOCALE}>
        <MapScreen />
      </AntDesignProvider>
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
