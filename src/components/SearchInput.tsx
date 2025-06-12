import React, { Dispatch, memo, SetStateAction } from "react";
import { ActivityIndicator, Icon, Input, View } from "@ant-design/react-native";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { PlaceSelectors } from "../store/selectors/placeSelectors";

interface SearchInputProps {
  query: string;
  isSearching: boolean;
  onPressSearch: (text: string) => void;
  onPressClear: () => void;
  onSubmitInput: (text: string) => void;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
  setQuery: Dispatch<SetStateAction<string>>;
}

const SearchInput = (props: SearchInputProps) => {
  const {
    isSearching,
    onPressSearch,
    onSubmitInput,
    setIsSearching,
    query,
    setQuery,
  } = props;

  const isLoading = useSelector(PlaceSelectors.loading);

  const onPressClear = () => {
    setQuery("");
    props.onPressClear();
  };

  return (
    <View style={styles.container}>
      <Input
        onSubmitEditing={() => {
          onSubmitInput(query);
          setIsSearching(false);
        }}
        defaultValue={query}
        inputStyle={styles.inputStyle}
        onChangeText={(text: string) => {
          if (text && !isSearching) {
            setIsSearching(true);
          }
          setQuery(text);
          onPressSearch(text);
        }}
        placeholder={"Search..."}
        prefix={
          <Icon
            name={isSearching ? "arrow-left" : "search"}
            size={"md"}
            onPress={() => {
              if (isSearching) {
                setIsSearching(false);
                setQuery("");
              }
            }}
          />
        }
        type={"text"}
        suffix={
          query && (
            <View style={styles.suffixContainer}>
              {isLoading && <ActivityIndicator />}
              <Icon name={"close"} size={"md"} onPress={onPressClear} />
            </View>
          )
        }
      />
    </View>
  );
};

export default memo(SearchInput);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "white",
    margin: 8,
    borderRadius: 28,
  },
  inputStyle: {
    backgroundColor: "white",
  },
  suffixContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
});
