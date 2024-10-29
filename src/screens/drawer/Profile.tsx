import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Importing icon library

export default function Profile() {
  // Simulated user data
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    profilePicture: "https://example.com/johndoe.jpg", // Replace with actual image URL
  };

  const loggedIn = false; // Add a flag to check if the user is logged in

  if (!loggedIn) {
    // Render design for non-logged users
    return (
      <View style={styles.container}>
        <Text style={styles.notLoggedInText}>You're not logged in!</Text>
        <Image
          source={require("../../../assets/images/login.png")} // Add an appropriate image or illustration
          style={styles.notLoggedInImage}
        />
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: user.profilePicture }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileEmail}>{user.email}</Text>
      </View>

      {/* Options Section */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="person-circle-outline" size={24} color="#4b7bec" />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="settings-outline" size={24} color="#4b7bec" />
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="help-circle-outline" size={24} color="#4b7bec" />
          <Text style={styles.optionText}>Help Center</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="log-out-outline" size={24} color="#ff5252" />
          <Text style={[styles.optionText, { color: "#ff5252" }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    padding: 16,
    justifyContent: "center",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  profileEmail: {
    fontSize: 16,
    color: "#666",
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 18,
    color: "#333",
  },
  // Styles for not logged-in users
  notLoggedInText: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  notLoggedInImage: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: "#4b7bec",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  loginButtonText: {
    fontSize: 18,
    color: "#fff",
  },
  signUpButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4b7bec",
  },
  signUpButtonText: {
    fontSize: 18,
    color: "#4b7bec",
  },
});
