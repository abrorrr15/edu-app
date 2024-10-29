import * as React from "react";
import "intl";
import "intl/locale-data/jsonp/en"; 
import "intl-pluralrules";
import "./i18n";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { I18nextProvider, useTranslation } from "react-i18next";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

import TabHome from "./src/screens/tabs/Home";
import TabCatalog from "./src/screens/tabs/Catalog";
import TabLiked from "./src/screens/tabs/Liked";
import TabDownload from "./src/screens/tabs/Download";
import TabSettings from "./src/screens/tabs/Settings";

import DrawerPrivacyPolitics from "./src/screens/drawer/PrivacyPolitics";
import DrawerAbout from "./src/screens/drawer/About";

import { ThemeProvider, useTheme } from "./src/components/ThemeContext";
import LessonContent from "./src/components/LessonContent";
import i18n from "./i18n";
import LoadingScreen from "./src/components/LoadingScreen";
import { enableScreens } from "react-native-screens";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const { width } = Dimensions.get("window");

enableScreens();
// Centralized icon management function
const getTabIcon = (route: { name: string }, focused: boolean) => {
  const icons = {
    Home: focused ? "home" : "home-outline",
    Catalog: focused ? "book" : "book-outline",
    Liked: focused ? "heart" : "heart-outline",
    Download: focused ? "download" : "download-outline",
    Settings: focused ? "settings" : "settings-outline",
  };
  return icons[route.name as keyof typeof icons];
};

function CustomDrawerContent(props: any) {
  const { isDarkTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        backgroundColor: isDarkTheme ? "#333" : "#f7f9fb",
      }}
    >
      {/* Custom Drawer Header */}
      <View style={styles.drawerHeader}>
        <Image
          source={require("./assets/images/icon.png")} // Replace with your own image path
          style={styles.profileImage}
        />
        <Text
          style={[
            styles.drawerHeaderText,
            { color: isDarkTheme ? "white" : "#000" },
          ]}
        >
          {t("READ AND LEARN")}
        </Text>
      </View>

      {/* Drawer Items */}
      <View style={styles.drawerItemsContainer}>
        <DrawerItemList {...props} />
      </View>

      {/* Footer Section (Optional) */}
      <View style={styles.drawerFooter}>
        <Text style={styles.drawerFooterText}>Version 1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
}

function TabNavigator() {
  const { isDarkTheme } = useTheme();
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName={`${t("Home")}`}
      screenOptions={({ route }: any) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = getTabIcon(route, focused);
          const iconSize = width < 400 ? 20 : 24; // Responsive icon size
          return (
            <Ionicons name={iconName as any} size={iconSize} color={color} />
          );
        },

        tabBarInactiveBackgroundColor: isDarkTheme ? "#2c3e50" : "#fff",
        tabBarActiveBackgroundColor: isDarkTheme ? "#34495e" : "#ecf0f1",
        tabBarAccessibilityLabel: route.name,
        tabBarActiveTintColor: "#3498db",
        tabBarInactiveTintColor: "#7f8c8d",
        tabBarLabelStyle: {
          fontSize: width < 360 ? 10 : 12, // Adjust font size for smaller screens
          color: isDarkTheme ? "#ecf0f1" : "#333",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={TabHome}
        options={{
          title: t("Home"),
        }}
      />
      <Tab.Screen
        name="Catalog"
        component={TabCatalog}
        options={{
          title: t("Catalog"),
        }}
      />
      <Tab.Screen
        name="Liked"
        component={TabLiked}
        options={{
          title: t("Liked"),
        }}
      />
      <Tab.Screen
        name="Download"
        component={TabDownload}
        options={{
          title: t("Download"),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={TabSettings}
        options={{
          title: t("Settings"),
        }}
      />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  const { isDarkTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: "left",
        drawerType: "front",
        drawerStyle: {
          backgroundColor: isDarkTheme ? "#2c3e50" : "#f7f9fb",
          width: width * 0.75, // Dynamic width for different screen sizes
        },
        headerShown: false,
        drawerActiveTintColor: "#3498db",
        drawerInactiveTintColor: isDarkTheme ? "#ecf0f1" : "#333",
        drawerActiveBackgroundColor: isDarkTheme ? "#34495e" : "#ecf0f1",
        drawerLabelStyle: [
          styles.drawerLabel,
          { color: isDarkTheme ? "white" : "#000" },
        ],
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {/* Drawer item with Tab navigation */}
      <Drawer.Screen
        name="Main"
        component={TabNavigator}
        options={{
          title: t("Home"), // Drawer menu item
          drawerIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="PrivacyPolitics"
        component={DrawerPrivacyPolitics}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: isDarkTheme ? "#333" : "white" },
          headerTitleStyle: { color: isDarkTheme ? "#fff" : "#333" },
          title: t("Privacy Politics"),
          drawerIcon: ({ color }) => (
            <FontAwesome name="leaf" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={DrawerAbout}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: isDarkTheme ? "#333" : "white" },
          headerTitleStyle: { color: isDarkTheme ? "#fff" : "#333" },
          title: t("About App"),
          drawerIcon: ({ color }) => (
            <FontAwesome name="question-circle" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2-second delay

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="DrawerNavigator"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LessonContent"
              component={LessonContent}
              options={{ title: "Read Book" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </I18nextProvider>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
  },
  welcome: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  bookApp: {
    color: "#fff",
    fontSize: 24,
  },
  drawerHeader: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  drawerHeaderText: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  drawerItemsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  drawerFooter: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    alignItems: "center",
  },
  drawerFooterText: {
    fontSize: 12,
    color: "#999",
  },
  drawerLabel: {
    color: "#333", // Default text color
    fontSize: 16,
    paddingVertical: 10,
  },
});
