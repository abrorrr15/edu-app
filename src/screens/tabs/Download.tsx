import { useState } from "react";
import { View, Text, StyleSheet, Image, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../components/ThemeContext";
import { useTranslation } from "react-i18next";

// Placeholder images for the preview slider
const placeholderImages = [
  { id: 1, uri: require("../../../assets/images/icon.png") },
  { id: 2, uri: require("../../../assets/images/preview1.jpg") },
  { id: 3, uri: require("../../../assets/images/preview2.jpg") },
  { id: 4, uri: require("../../../assets/images/preview3.jpg") },
  { id: 5, uri: require("../../../assets/images/preview5.png") },
];

const BookStorePage = () => {
  const { t } = useTranslation();
  const { isDarkTheme, fontType } = useTheme();

  // Commenting out the books state and fetch function as they're disabled
  // const [books, setBooks] = useState<Book[]>([]);
  // const [loading, setLoading] = useState(false);

  // // This function has been disabled as we are not fetching data
  // const fetchBooks = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get("http://192.168.100.6:8000/api/books");
  //     const data = response.data;
  //     setBooks(data);
  //   } catch (error) {
  //     console.error("Failed to fetch books", error);
  //     Alert.alert(
  //       t("Network Error"),
  //       t("Unable to fetch books. Please check your network connection.")
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchBooks();
  // }, []);

  // Development message and slider
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkTheme ? "#000" : "#fff" },
      ]}
    >
      <Text
        style={[
          styles.pageTitle,
          { color: isDarkTheme ? "#737385" : "#333", fontFamily: fontType },
        ]}
      >
        {t("Development Preview")}
      </Text>
      <Text
        style={[
          styles.upgradeMessage,
          { color: isDarkTheme ? "#ccc" : "#333" },
        ]}
      >
        {t("An upgraded experience is coming soon!")}
      </Text>

      <View style={styles.sliderContainer}>
        {placeholderImages.map((image) => (
          <Image key={image.id} source={image.uri} style={styles.sliderImage} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 16,
    paddingTop: StatusBar.currentHeight || 0,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  upgradeMessage: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
  },
  sliderContainer: {
    flexWrap: "wrap",
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  sliderImage: {
    flexGrow: 1,
    width: 150,
    height: 150,
    marginHorizontal: 8,
    borderRadius: 10,
  },
});

export default BookStorePage;
