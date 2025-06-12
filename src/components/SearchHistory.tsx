import { Text, StyleSheet } from "react-native";
import React from "react";
import { Button, Icon, List, View } from "@ant-design/react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearchHistory,
  removeSearchHistory,
} from "../store/reducers/placeSlice";
import { PlaceSelectors } from "../store/selectors/placeSelectors";

const SearchHistory = () => {
  const dispatch = useDispatch();

  const historyList = useSelector(PlaceSelectors.searchHistory);

  const onPressClear = (index: number) => {
    console.log("remove!");
    dispatch(removeSearchHistory(index));
  };

  const onPressClearAll = () => {
    dispatch(clearSearchHistory());
  };

  const renderClearButton = (index: number) => (
    <Button size={"small"}>
      <Icon name={"close"} onPress={() => onPressClear(index)} />
    </Button>
  );

  const renderItem = (item, index) => (
    <List.Item key={index} extra={renderClearButton(0)}>
      {item}
    </List.Item>
  );

  return (
    <View style={styles.container}>
      <List renderHeader={"Search History"}>{historyList.map(renderItem)}</List>
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
