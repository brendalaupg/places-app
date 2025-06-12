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

  const renderSuggestionsMarker = () => (
    <Marker
      coordinate={{
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
      }}
      title={"test"}
      description="description"
      onCalloutPress={(event) => {
        console.log("oncalloutpres");
      }}
      onSelect={() => {
        console.log("onselect");
      }}
    />
  );

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
      {renderSuggestionsMarker()}
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
