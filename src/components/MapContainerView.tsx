import MapView, { Marker, Region } from "react-native-maps";
import { Keyboard, StyleSheet, Text } from "react-native";
import { memo, useEffect, useRef, useState } from "react";
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
  console.log("places", places.length);

  const [newRegion, setNewRegion] = useState<Region | undefined>();

  useEffect(() => {
    if (!!places.length) {
      const { latitude, longitude } = places[0].location;
      const _region: Region = {
        latitude,
        longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05,
      };
      setNewRegion(_region);
    }
  }, [places]);

  const renderMarker = (item: places.Place, index: number) => {
    const { id, location, displayName } = item;

    return <Marker key={id} coordinate={location} title={displayName.text} />;
  };

  return (
    <MapView
      ref={mapViewRef}
      style={styles.mapView}
      region={newRegion}
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
