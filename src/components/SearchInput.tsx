import React, {
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Icon, Input, View } from "@ant-design/react-native";
import { StyleSheet } from "react-native";

interface SearchInputProps {
  isSearching: boolean;
  onPressSearch: (text: string) => void;
  onPressClear: () => void;
  onSubmitInput: (text: string) => void;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
}

const SearchInput = (props: SearchInputProps) => {
  const { isSearching, onPressSearch, onSubmitInput, setIsSearching } = props;
  const [query, setQuery] = useState<string>("");

  const onPressClear = () => {
    setQuery("");
    props.onPressClear();
  };

  return (
    <View style={styles.container}>
      <Input
        onFocus={(e) => {
          setIsSearching(true);
        }}
        onSubmitEditing={() => {
          onSubmitInput(query);
          setIsSearching(false);
        }}
        defaultValue={query}
        inputStyle={styles.inputStyle}
        onChangeText={(text: string) => {
          setQuery(text);
          onPressSearch(text);
        }}
        placeholder={"Search..."}
        prefix={
          <Icon
            name={isSearching ? "arrow-left" : "search"}
            size={"md"}
            onPress={() => {
              setIsSearching(false);
            }}
          />
        }
        type={"text"}
        suffix={
          query && <Icon name={"close"} size={"md"} onPress={onPressClear} />
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
});
