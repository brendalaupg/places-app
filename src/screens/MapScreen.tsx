import { View } from "@ant-design/react-native";
import React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
