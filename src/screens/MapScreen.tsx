import { View } from "@ant-design/react-native";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import SearchInput from "../components/SearchInput";
import MapContainerView from "../components/MapContainerView";
import SearchHistory from "../components/SearchHistory";

const MapScreen = () => {
  return (
    <>
      <MapContainerView />
      <View style={styles.searchContainer}>
        <SafeAreaView>
          <SearchInput />
          {/* <SearchHistory /> */}
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
