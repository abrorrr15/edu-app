// ThemeSelector.tsx
import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

// themeConfig.ts
export const imageThemes = [
  require("../../../assets/images/theme1.jpg"),
  require("../../../assets/images/theme2.jpg"),
  require("../../../assets/images/theme3.jpg"),
];

export const colorThemes = [
  "#333333",
  "#FAF3DD",
  "#FFE4E1",
  "#D3E4CD",
  "#C8D5B9",
];

type ThemeSelectorProps = {
  onSelectTheme: (themeIndex: number, isColor: boolean) => void;
};

const ThemeSelector = ({ onSelectTheme }: ThemeSelectorProps) => (
  <View style={styles.container}>
    {/* Image Themes */}
    <View style={styles.themeRow}>
      {imageThemes.map((image, index) => (
        <TouchableOpacity
          key={`img-theme-${index}`}
          onPress={() => onSelectTheme(index, false)}
        >
          <Image source={image} style={styles.themePreview} />
        </TouchableOpacity>
      ))}
    </View>
    {/* Color Themes */}
    <View style={styles.themeRow}>
      {colorThemes.map((color, index) => (
        <TouchableOpacity
          key={`color-theme-${index}`}
          onPress={() => onSelectTheme(index, true)}
          style={[styles.colorPreview, { backgroundColor: color }]}
        />
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  themeRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  themePreview: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  colorPreview: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
});

export default ThemeSelector;
