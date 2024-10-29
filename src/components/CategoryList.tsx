// CategoryList.tsx
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTheme } from "./ThemeContext";
import { useTranslation } from "react-i18next";

const CategoryList = ({
  categories,
  selectedCategory,
  onCategorySelect,
}: {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}) => {
  const { t } = useTranslation();
  const { isDarkTheme, fontType } = useTheme();
  const sectionTitleColor = isDarkTheme ? "#f2f5fc" : "#000";
  const categoryTextColor = isDarkTheme ? "#f2f5fc" : "#000"; // Changed to ensure visibility in dark mode
  const categoryItemBackgroundColor = isDarkTheme ? "#424242" : "#e0e0e0"; // Background color for category items
  const selectedCategoryColor = isDarkTheme ? "#bb86fc" : "#6200ee"; // Selected category color

  return (
    <View style={styles.categoryContainer}>
      <Text
        style={[
          styles.sectionTitle,
          { fontFamily: fontType, color: sectionTitleColor },
        ]}
      >
        {t("Categories")}
      </Text>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryItem,
              { backgroundColor: categoryItemBackgroundColor },
              item === selectedCategory && {
                backgroundColor: selectedCategoryColor,
              },
            ]}
            onPress={() => onCategorySelect(item)}
          >
            <Text
              style={[
                styles.categoryText,
                {
                  color:
                    item === selectedCategory ? "#d3d3db" : categoryTextColor,
                },
                { fontFamily: fontType },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryItem: {
    marginRight: 15,
    padding: 10,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 14,
  },
});

export default CategoryList;
