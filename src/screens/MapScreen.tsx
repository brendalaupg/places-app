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
import SuggestionList from "../components/SuggestionList";
import { getPredictedText } from "../utils/placeUtils";

const INITIAL_REGION: Region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.04,
  longitudeDelta: 0.05,
};

const MapScreen = () => {
  const dispatch = useDispatch();
  const suggestions = useSelector(PlaceSelectors.suggestions);

  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const [query, setQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const searchHistory = useSelector(PlaceSelectors.searchHistory);

  const showSearchHistory =
    !!suggestions.length && isSearching && !!searchHistory.length;
  const showSuggestionsList = !!suggestions.length;

  const searchQuery = (text: string) => {
    console.log(text);
    dispatch(
      startAutoComplete({
        input: text,
        locationRestriction: {
          circle: {
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

  const onPressHistory = (text: string) => {
    onPressHistory;
  };

  const onPressSuggestion = (suggestion: places.Suggestion) => {
    dispatch(clearAutocomplete());
    console.log("query for suggestion");
    setQuery(getPredictedText(suggestion));
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
            query={query}
            isSearching={isSearching}
            onPressSearch={searchQuery}
            onPressClear={clearQuery}
            onSubmitInput={(text) => {
              dispatch(addSearchHistory(text));
            }}
            setIsSearching={setIsSearching}
            setQuery={setQuery}
          />
          {showSearchHistory && <SearchHistory onPressHistory={searchQuery} />}
          {showSuggestionsList && (
            <SuggestionList onPressSuggestion={onPressSuggestion} />
          )}
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
