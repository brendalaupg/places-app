import { View } from "@ant-design/react-native";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import SearchInput from "../components/SearchInput";
import MapContainerView from "../components/MapContainerView";
import { useDispatch, useSelector } from "react-redux";
import {
  addSearchHistory,
  clearAutocomplete,
  startAutoComplete,
} from "../store/reducers/placeSlice";
import { Region } from "react-native-maps";
import { PlaceSelectors } from "../store/selectors/placeSelectors";
import SearchHistory from "../components/SearchHistory";

const INITIAL_REGION: Region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.04,
  longitudeDelta: 0.05,
};

const MapScreen = () => {
  const dispatch = useDispatch();

  const [region, setRegion] = useState<Region>(INITIAL_REGION);

  const suggestions = useSelector(PlaceSelectors.suggestions);
  console.log(suggestions);

  const searchQuery = (text: string) => {
    console.log(text);
    dispatch(
      startAutoComplete({
        input: text,
        locationRestriction: {
          circle: {
            // meter
            center: {
              latitude: region.latitude,
              longitude: region.longitude,
            },
            radius: 5000,
          },
        },
      })
    );
  };

  const clearQuery = () => {
    dispatch(clearAutocomplete());
  };

  const onRegionChange = (region: Region) => {
    setRegion(region);
  };

  return (
    <>
      <MapContainerView
        onRegionChange={onRegionChange}
        initialRegion={INITIAL_REGION}
      />
      <View style={styles.searchContainer}>
        <SafeAreaView>
          <SearchInput
            onPressSearch={searchQuery}
            onPressClear={clearQuery}
            onSubmitInput={(text) => {
              dispatch(addSearchHistory(text));
            }}
          />
          <SearchHistory />
        </SafeAreaView>
      </View>
    </>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
});
