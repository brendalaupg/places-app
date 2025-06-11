import { Text, StyleSheet } from "react-native";
import React from "react";
import { ListView, View } from "@ant-design/react-native";

const SearchHistory = () => {
  const renderItem = (item, index) => (
    <View style={{ padding: 10 }}>
      <Text>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ListView
        onFetch={(currentPage, startFetch, abortFetch) => {
          startFetch(["hi", "test"], 1);
        }}
        keyExtractor={(_, index) => `history-item-${index}`}
        renderItem={renderItem}
        numColumns={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 400,
    width: "100%",
    borderRadius: 32,
  },
});

export default SearchHistory;
