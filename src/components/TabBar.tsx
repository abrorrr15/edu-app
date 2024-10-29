import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import Ionicons

export default function TabBar() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tabItem}>
        <Ionicons name="home-outline" size={24} color="#000" />
        <Text style={styles.tabText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem}>
        <Ionicons name="grid-outline" size={24} color="#000" />
        <Text style={styles.tabText}>Catalog</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem}>
        <Ionicons name="download-outline" size={24} color="#000" />
        <Text style={styles.tabText}>Download</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem}>
        <Ionicons name="heart-outline" size={24} color="#000" />
        <Text style={styles.tabText}>Liked</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem}>
        <Ionicons name="person-outline" size={24} color="#000" />
        <Text style={styles.tabText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "static",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 12, // Reduced font size to avoid wrapping
    color: "#000",
    marginTop: 2, // Small gap between icon and text
  },
});
