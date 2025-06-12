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
  startSearchPlace,
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
  const searchHistory = useSelector(PlaceSelectors.searchHistory);

  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const [query, setQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const hasSuggestions = suggestions.length > 0;
  const hasHistory = searchHistory.length > 0;
  const isQueryEmpty = query.trim().length === 0;

  const showSearchHistory = isSearching && isQueryEmpty && hasHistory;
  const showSuggestionsList = isSearching && !isQueryEmpty && hasSuggestions;
  const showMap = !isSearching;

  const searchQuery = (text: string) => {
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
    setQuery("");
  };

  const onRegionChange = (region: Region) => {
    setRegion(region);
  };

  const onPressHistory = (text: string) => {
    setQuery(text);
    setIsSearching(false);
    dispatch(addSearchHistory(text));
    dispatch(startSearchPlace(text));
  };

  const onPressSuggestion = (suggestion: places.Suggestion) => {
    const suggestionText = getPredictedText(suggestion);
    setQuery(suggestionText);
    setIsSearching(false);
    dispatch(addSearchHistory(suggestionText));
    dispatch(startSearchPlace(suggestionText));
    dispatch(clearAutocomplete());
  };

  const onSubmitInput = (text: string) => {
    setIsSearching(false);
    dispatch(addSearchHistory(text));
    dispatch(startSearchPlace(text));
    dispatch(clearAutocomplete());
  };

  return (
    <>
      <MapContainerView
        onRegionChange={onRegionChange}
        initialRegion={INITIAL_REGION}
      />
      <View style={styles.searchContainer} pointerEvents="box-none">
        <SafeAreaView>
          <SearchInput
            query={query}
            isSearching={isSearching}
            setQuery={setQuery}
            setIsSearching={setIsSearching}
            onPressSearch={searchQuery}
            onPressClear={clearQuery}
            onSubmitInput={onSubmitInput}
          />
          {showSearchHistory && (
            <SearchHistory
              onPressHistory={onPressHistory}
              history={searchHistory}
            />
          )}
          {showSuggestionsList && (
            <SuggestionList
              onPressSuggestion={onPressSuggestion}
              suggestions={suggestions}
            />
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
    zIndex: 2,
  },
  dimOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)", // Adjust for your design
    zIndex: 1,
  },
});
