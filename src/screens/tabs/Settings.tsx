import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "../../components/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookSettings() {
  const [selectedLanguage, setSelectedLanguage] = useState("ru");
  const { t, i18n } = useTranslation();
  const { isDarkTheme, fontType, toggleTheme, setFontType } = useTheme();

  // Colors based on theme
  const backgroundColor = isDarkTheme ? "#1E1E1E" : "#F8F9FA";
  const sectionTitleColor = isDarkTheme ? "#FFFFFF" : "#343a40";
  const toggleLabelColor = isDarkTheme ? "#FFFFFF" : "#343a40";
  const pickerBackgroundColor = isDarkTheme ? "#343a40" : "#FFFFFF";
  const pickerColor = isDarkTheme ? "#FFFFFF" : "#343a40";

  // Load language from AsyncStorage
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem("@selectedLanguage");
        if (storedLanguage) {
          setSelectedLanguage(storedLanguage);
          i18n.changeLanguage(storedLanguage); // Ensure i18n language is updated
        }
      } catch (error) {
        console.error("Failed to load language:", error);
      }
    };

    loadLanguage();
  }, []);

  // Change language and persist it
  const handleLanguageChange = async (language: string) => {
    try {
      setSelectedLanguage(language);
      await i18n.changeLanguage(language);
      await AsyncStorage.setItem("@selectedLanguage", language);
    } catch (error) {
      console.error("Failed to set language:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      {/* Language Selection */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: sectionTitleColor }]}>
          {t("Language")}
        </Text>
        <Picker
          selectedValue={selectedLanguage}
          style={[
            styles.picker,
            {
              color: pickerColor,
              backgroundColor: pickerBackgroundColor,
            },
          ]}
          onValueChange={handleLanguageChange}
        >
          <Picker.Item label="Русский" value="ru" />
          <Picker.Item label="English" value="en" />
          <Picker.Item label="O'zbekcha" value="uz" />
        </Picker>
      </View>

      {/* Theme Toggle */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: sectionTitleColor }]}>
          {t("Theme")}
        </Text>
        <View style={styles.toggleContainer}>
          <Text style={[styles.toggleLabel, { color: toggleLabelColor }]}>
            {t(isDarkTheme ? "Dark Theme" : "Light Theme")}
          </Text>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeIcon}>
            {isDarkTheme ? (
              <Ionicons name="moon" size={24} color="#FFD700" />
            ) : (
              <Ionicons name="sunny" size={24} color="#FFA500" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Font Type Selection */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: sectionTitleColor }]}>
          {t("Font Type")}
        </Text>
        <Picker
          selectedValue={fontType}
          style={[
            styles.picker,
            {
              color: pickerColor,
              backgroundColor: pickerBackgroundColor,
            },
          ]}
          onValueChange={(itemValue: any) => setFontType(itemValue)}
        >
          <Picker.Item label={"Sans-serif"} value="sansSerif" />
          <Picker.Item label={"Serif"} value="serif" />
          <Picker.Item label={"Monospace"} value="monospace" />
        </Picker>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: StatusBar.currentHeight || 0,
  },
  status: {
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    width: "100%",
    marginVertical: 15,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleLabel: {},
  themeIcon: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "transparent",
  },
});
