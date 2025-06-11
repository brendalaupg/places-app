import MapView from "react-native-maps";
import { StyleSheet, Text } from "react-native";
import { useRef } from "react";

const MapContainerView = () => {
  const mapViewRef = useRef<MapView | undefined>(undefined);

  return (
    <MapView
      ref={mapViewRef}
      style={styles.mapView}
      provider={"google"}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
};

export default MapContainerView;

const styles = StyleSheet.create({
  mapView: {
    height: "100%",
    width: "100%",
  },
});
