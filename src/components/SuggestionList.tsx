import { StyleSheet } from "react-native";
import React, { memo } from "react";
import { List, View } from "@ant-design/react-native";
import { useSelector } from "react-redux";

import { PlaceSelectors } from "../store/selectors/placeSelectors";
import { getPredictedText } from "../utils/placeUtils";

interface SearchHistoryProps {
  onPressSuggestion: (suggestion: places.Suggestion) => void;
}

const SuggestionList = (props: SearchHistoryProps) => {
  const { onPressSuggestion } = props;

  const suggestions = useSelector(PlaceSelectors.suggestions);

  const renderItem = (item: places.Suggestion, index: number) => {
    const suggestionText = getPredictedText(item);

    return (
      <List.Item onPress={() => onPressSuggestion(item)} key={index}>
        {suggestionText}
      </List.Item>
    );
  };

  return (
    <View style={styles.container}>
      <List renderHeader={"Suggestions"}>{suggestions.map(renderItem)}</List>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
});

export default memo(SuggestionList);
