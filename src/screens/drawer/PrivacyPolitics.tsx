// PrivacyPolitics.tsx

import React from "react";
import { View, Text, ScrollView, StyleSheet, StatusBar } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../components/ThemeContext";

export default function PrivacyPolitics() {
  const { t } = useTranslation();
  const { isDarkTheme, fontType } = useTheme() as any;

  const dynamicStyles = styles(isDarkTheme);

  return (
    <View style={dynamicStyles.container}>
      <Text style={[dynamicStyles.title, { fontFamily: fontType }]}>
        {t("Privacy Policy")}
      </Text>

      <ScrollView style={dynamicStyles.content}>
        <Text style={[dynamicStyles.sectionTitle, { fontFamily: fontType }]}>
          {t("privacy_policy.introduction.title")}
        </Text>
        <Text style={[dynamicStyles.paragraph, { fontFamily: fontType }]}>
          {t("privacy_policy.introduction.content")}
        </Text>

        <Text style={[dynamicStyles.sectionTitle, { fontFamily: fontType }]}>
          {t("privacy_policy.data_collection.title")}
        </Text>
        <Text style={[dynamicStyles.paragraph, { fontFamily: fontType }]}>
          {t("privacy_policy.data_collection.content")}
        </Text>

        <Text style={[dynamicStyles.sectionTitle, { fontFamily: fontType }]}>
          {t("privacy_policy.data_usage.title")}
        </Text>
        <Text style={[dynamicStyles.paragraph, { fontFamily: fontType }]}>
          {t("privacy_policy.data_usage.content")}
        </Text>

        <Text style={[dynamicStyles.sectionTitle, { fontFamily: fontType }]}>
          {t("privacy_policy.third_party_sharing.title")}
        </Text>
        <Text style={[dynamicStyles.paragraph, { fontFamily: fontType }]}>
          {t("privacy_policy.third_party_sharing.content")}
        </Text>

        <Text style={[dynamicStyles.sectionTitle, { fontFamily: fontType }]}>
          {t("privacy_policy.rights.title")}
        </Text>
        <Text style={[dynamicStyles.paragraph, { fontFamily: fontType }]}>
          {t("privacy_policy.rights.content")}
        </Text>

        <Text style={[dynamicStyles.sectionTitle, { fontFamily: fontType }]}>
          {t("privacy_policy.contact.title")}
        </Text>
        <Text style={[dynamicStyles.paragraph, { fontFamily: fontType }]}>
          {t("privacy_policy.contact.content")}
        </Text>
      </ScrollView>
    </View>
  );
}

// Define a function to create styles dynamically based on isDarkTheme
const styles = (isDarkTheme: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      paddingTop: StatusBar.currentHeight || 0,
      backgroundColor: isDarkTheme ? "#121212" : "#FFFFFF", // Dark or light background
    },
    title: {
      fontWeight: "bold",
      marginBottom: 20,
      color: isDarkTheme ? "#FFFFFF" : "#000000", // Text color based on theme
    },
    content: {
      flex: 1,
    },
    sectionTitle: {
      fontWeight: "bold",
      marginTop: 20,
      marginBottom: 10,
      color: isDarkTheme ? "#E0E0E0" : "#333333", // Slightly lighter for titles in dark mode
    },
    paragraph: {
      lineHeight: 22,
      marginBottom: 10,
      color: isDarkTheme ? "#BBBBBB" : "#444444", // Subtle contrast for paragraphs
    },
  });
