import MapView, { Region } from "react-native-maps";
import { Keyboard, StyleSheet, Text } from "react-native";
import { memo, useRef } from "react";

interface MapContainerViewProps {
  initialRegion: Region;
  onRegionChange: (region: Region) => void;
}

const MapContainerView = (props: MapContainerViewProps) => {
  const { initialRegion, onRegionChange } = props;
  const mapViewRef = useRef<MapView | undefined>(undefined);

  return (
    <MapView
      ref={mapViewRef}
      style={styles.mapView}
      provider={"google"}
      initialRegion={initialRegion}
      onRegionChangeComplete={(region: Region) => {
        onRegionChange(region);
      }}
      onMapLoaded={() => {
        console.log("map has loaded");
      }}
      loadingEnabled={true}
      onTouchStart={() => {
        Keyboard.dismiss();
      }}
    />
  );
};

export default memo(MapContainerView);

const styles = StyleSheet.create({
  mapView: {
    height: "100%",
    width: "100%",
  },
});
