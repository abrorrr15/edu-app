import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressBar } from "react-native-paper";
import { useTranslation } from "react-i18next";

export default function LoadingScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const [progress, setProgress] = useState(0.3);
  const { t } = useTranslation();

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 1) {
          return prevProgress + 0.1;
        } else {
          clearInterval(interval);
          return 1;
        }
      });
    }, 500);

    // Fade-in and scale-up animation for welcome text
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    return () => clearInterval(interval);
  }, [fadeAnim, scaleAnim]);

  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        {/* App Logo */}
        <Image
          source={require("../../assets/images/icon.png")} // Replace with the path to your app's logo
          style={styles.appLogo}
        />

        {/* Welcome Text */}
        <Animated.View
          style={[
            styles.animatedContainer,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Text style={styles.welcome}>{t("Welcome to")}</Text>
          <Text style={styles.bookApp}>EDU PLATFORM</Text>
        </Animated.View>

        {/* Loader and Progress Bar */}
        <View style={styles.loaderContainer}>
          <Text style={styles.loadingText}>{t("Loading...")}</Text>
          <ActivityIndicator size="large" color="#fff" />
          <ProgressBar
            progress={progress}
            color="#fff"
            style={styles.progressBar}
          />
        </View>

        {/* Developer's Company Logo */}
        <Image
          source={require("../../assets/images/org-icon.png")} // Replace with the path to your company's logo
          style={styles.companyLogo}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 50,
  },
  appLogo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginTop: 20,
  },
  animatedContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  welcome: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    opacity: 0.9,
  },
  bookApp: {
    color: "#fff",
    fontSize: 24,
    opacity: 0.8,
  },
  loaderContainer: {
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
    fontStyle: "italic",
    opacity: 0.7,
  },
  progressBar: {
    marginTop: 15,
  },
  companyLogo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 20,
  },
});
