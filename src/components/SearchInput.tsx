import React, { memo, useEffect, useState } from "react";
import { Icon, Input, View } from "@ant-design/react-native";
import debounce from "lodash/debounce";
import { StyleSheet } from "react-native";

const DEBOUNCE_MS: number = 500;

const SearchInput = () => {
  const [query, setQuery] = useState<string>("");

  const search = (value: string) => {
    console.log("value:", value);
    setQuery(value);
  };

  const debounceSearch = debounce(search, DEBOUNCE_MS);

  useEffect(() => {
    return () => {
      // prevent memory leaks
      debounceSearch.cancel();
    };
  }, [debounceSearch]);

  const onPressClear = () => {
    setQuery("");
  };

  return (
    <View style={styles.container}>
      <Input
        defaultValue={query}
        inputStyle={styles.inputStyle}
        onChangeText={debounceSearch}
        placeholder={"Search..."}
        prefix={<Icon name={"search"} size={"md"} />}
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
