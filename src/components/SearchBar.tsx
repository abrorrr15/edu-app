import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useTheme } from "./ThemeContext";
import { useTranslation } from "react-i18next";

const SearchBar = ({
  searchQuery,
  onSearchChange,
}: {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}) => {
  const { isDarkTheme } = useTheme();
  const { t } = useTranslation();
  // Dynamic colors based on theme
  const searchBarBackgroundColor = isDarkTheme ? "#424242" : "#fff"; // Background color for search bar
  const searchInputBorderColor = isDarkTheme ? "#666" : "#ccc"; // Border color for input field
  const searchInputTextColor = isDarkTheme ? "#f2f5fc" : "#000"; // Text color for input field

  return (
    <View
      style={[styles.searchBar, { backgroundColor: searchBarBackgroundColor }]}
    >
      <TextInput
        style={[
          styles.searchInput,
          { borderColor: searchInputBorderColor, color: searchInputTextColor },
        ]}
        placeholder={t("Search books...")}
        value={searchQuery}
        onChangeText={onSearchChange}
        placeholderTextColor={isDarkTheme ? "#a1a1a1" : "#888"} // Placeholder color
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    padding: 15,
    borderRadius: 8,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
});

export default SearchBar;
