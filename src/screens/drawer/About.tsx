import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../components/ThemeContext";

export default function About() {
  const { t } = useTranslation();
  const { isDarkTheme } = useTheme() as any;
  const dynamicStyles = styles(isDarkTheme);

  return (
    <ScrollView contentContainerStyle={dynamicStyles.container}>
      {/* Company Logo */}
      <View style={dynamicStyles.logoContainer}>
        <Image
          source={require("../../../assets/images/org-icon.png")}
          style={dynamicStyles.logo}
          resizeMode="contain"
        />
      </View>

      {/* About Information */}
      <Text style={dynamicStyles.title}>{t("about.title")}</Text>
      <Text style={dynamicStyles.paragraph}>{t("about.description1")}</Text>
      <Text style={dynamicStyles.paragraph}>{t("about.description2")}</Text>
      <Text style={dynamicStyles.paragraph}>{t("about.description3")}</Text>

      {/* Developer Information */}
      <Text style={dynamicStyles.sectionTitle}>
        {t("about.developerTitle")}
      </Text>
      <Text style={dynamicStyles.paragraph}>
        {t("about.developerDescription")}
      </Text>

      {/* Social Media Links */}
      <View style={dynamicStyles.socialLinksContainer}>
        <TouchableOpacity
          style={dynamicStyles.socialButton}
          onPress={() => Linking.openURL("https://t.me/abrorrr15")}
        >
          <Image
            source={require("../../../assets/images/telegram-icon.png")}
            style={dynamicStyles.socialIcon}
          />
          <Text style={dynamicStyles.link}>{t("about.telegram")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={dynamicStyles.socialButton}
          onPress={() => Linking.openURL("https://instagram.com/abrorrr15")}
        >
          <Image
            source={require("../../../assets/images/instagram-icon.png")}
            style={dynamicStyles.socialIcon}
          />
          <Text style={dynamicStyles.link}>{t("about.instagram")}</Text>
        </TouchableOpacity>
      </View>

      {/* App Version */}
      <Text style={dynamicStyles.footer}>{t("about.version")}</Text>
    </ScrollView>
  );
}

const styles = (isDarkTheme: boolean) =>
  StyleSheet.create({
    container: {
      padding: 20,
      flexGrow: 1,
      justifyContent: "center",
      backgroundColor: isDarkTheme ? "#121212" : "#f5f5f5",
    },
    logoContainer: {
      alignItems: "center",
      marginBottom: 20,
    },
    logo: {
      width: 100,
      height: 100,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      color: isDarkTheme ? "#FFFFFF" : "#333",
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      marginVertical: 15,
      color: isDarkTheme ? "#FFFFFF" : "#333",
    },
    paragraph: {
      fontSize: 16,
      lineHeight: 24,
      textAlign: "justify",
      marginBottom: 15,
      color: isDarkTheme ? "#BBBBBB" : "#555",
    },
    socialLinksContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    socialButton: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 10,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 10,
      backgroundColor: isDarkTheme ? "#333" : "#e8e8e8",
    },
    socialIcon: {
      width: 20,
      height: 20,
      marginRight: 5,
    },
    link: {
      fontSize: 16,
      textAlign: "center",
      color: isDarkTheme ? "#1E90FF" : "#007AFF",
    },
    footer: {
      fontSize: 14,
      textAlign: "center",
      color: isDarkTheme ? "#BBBBBB" : "#888",
      marginTop: 30,
    },
  });
