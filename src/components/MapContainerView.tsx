import MapView, { Marker, Region } from "react-native-maps";
import { Keyboard, StyleSheet, Text } from "react-native";
import { memo, useRef } from "react";
import { useSelector } from "react-redux";
import { PlaceSelectors } from "../store/selectors/placeSelectors";

interface MapContainerViewProps {
  initialRegion: Region;
  onRegionChange: (region: Region) => void;
}

const MapContainerView = (props: MapContainerViewProps) => {
  const { initialRegion, onRegionChange } = props;
  const mapViewRef = useRef<MapView | undefined>(undefined);

  const places = useSelector(PlaceSelectors.places);

  const renderMarker = (item: places.Place, index: number) => {
    const { id, location, displayName } = item;

    return <Marker key={id} coordinate={location} title={displayName.text} />;
  };

  return (
    <MapView
      ref={mapViewRef}
      style={styles.mapView}
      provider={"google"}
      initialRegion={initialRegion}
      onRegionChangeComplete={(region: Region) => {
        onRegionChange(region);
      }}
      loadingEnabled={true}
      onTouchStart={() => {
        Keyboard.dismiss();
      }}
    >
      {places.map(renderMarker)}
    </MapView>
  );
};

export default memo(MapContainerView);

const styles = StyleSheet.create({
  mapView: {
    height: "100%",
    width: "100%",
  },
});
