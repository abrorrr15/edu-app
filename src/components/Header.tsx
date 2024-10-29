// Header.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useTheme } from "./ThemeContext";

const Header = () => {
  const navigation = useNavigation();
  const { isDarkTheme } = useTheme();

  const headerBackgroundColor = isDarkTheme ? "#1e1e1e" : "#6200ee"; // Background color for header
  const iconColor = isDarkTheme ? "#f2f5fc" : "#fff"; // Color for the icon
  const titleColor = isDarkTheme ? "#f2f5fc" : "#fff"; // Color for the title

  return (
    <View style={[styles.header, { backgroundColor: headerBackgroundColor }]}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        style={styles.menuButton}
      >
        <Ionicons name="menu" size={30} color={iconColor} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: titleColor }]}>
        EDU PLATFORM
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight || 0,
  },
  menuButton: {
    position: "absolute",
    top: 30,
    left: 10,
    padding: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Header;
