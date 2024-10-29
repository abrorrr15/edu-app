import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Switch,
  StatusBar,
  ImageBackground,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import RenderHTML from "react-native-render-html";
import { Ionicons } from "@expo/vector-icons";
import { imageThemes, colorThemes } from "./config/ThemeSelector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const textColorOptions = [
  "#ffffff",
  "#333333",
  "#6200ee",
  "#ff5252",
  "#009688",
];

const LessonContentScreen = ({ route }: { route: any }) => {
  const { title, content, isOffline, id } = route.params;
  const [bookContent, setBookContent] = useState(content);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [modalVisible, setModalVisible] = useState(false);
  const [themeIndex, setThemeIndex] = useState<number | null>(null);
  const [isColorTheme, setIsColorTheme] = useState(true);
  const [textColor, setTextColor] = useState(
    isDarkTheme ? "#ffffff" : "#333333"
  );
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();
  const [buttonVisible, setButtonVisible] = useState(true);
  const [interactionTime, setInteractionTime] = useState(Date.now());

  const buttonTimeout = 3000; // 3 seconds
  useEffect(() => {
    setTextColor(isDarkTheme ? "#ffffff" : "#333333");
  }, [isDarkTheme]);

  const handleUserInteraction = () => {
    setButtonVisible(true);
    setInteractionTime(Date.now());
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setButtonVisible(false);
    }, 1000);

    return () => clearInterval(timer);
  }, [interactionTime]);

  useEffect(() => {
    const fetchOfflineContent = async () => {
      if (isOffline) {
        setLoading(true);
        try {
          const storedBook = await AsyncStorage.getItem(`book_${id}`);
          if (storedBook) {
            const parsedBook = JSON.parse(storedBook);
            setBookContent(parsedBook.content);
          }
        } catch (error) {
          console.error("Failed to load offline content", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOfflineContent();
  }, [id, isOffline]);

  const themeStyles = isDarkTheme
    ? { backgroundColor: "#333", color: "#fff" }
    : { backgroundColor: "#fff", color: "#333" };

  const backgroundColor =
    themeIndex !== null && isColorTheme
      ? colorThemes[themeIndex]
      : themeStyles.backgroundColor;
  const backgroundImage =
    themeIndex !== null && !isColorTheme ? imageThemes[themeIndex] : null;

  return (
    <View
      style={[styles.container, { backgroundColor }]}
      onTouchStart={handleUserInteraction}
    >
      {backgroundImage ? (
        <ImageBackground
          source={backgroundImage}
          style={styles.fullScreenBackground}
        >
          <ContentSection
            title={title}
            content={bookContent}
            themeStyles={{ color: textColor }}
            fontSize={fontSize}
            contentWidth={width}
          />
        </ImageBackground>
      ) : (
        <ContentSection
          title={title}
          content={bookContent}
          themeStyles={{ color: textColor }}
          fontSize={fontSize}
          contentWidth={width}
        />
      )}
      {buttonVisible && (
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {
            setModalVisible(true);
            handleUserInteraction(); // reset timer on button press
          }}
        >
          <Ionicons name="settings-outline" size={28} color="#fff" />
        </TouchableOpacity>
      )}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Settings</Text>
            <View style={styles.settingOption}>
              <Text style={styles.optionText}>Dark Theme</Text>
              <Switch
                value={isDarkTheme}
                onValueChange={() => setIsDarkTheme((prev) => !prev)}
              />
            </View>
            <View style={styles.settingOption}>
              <Text style={styles.optionText}>Font Size</Text>
              <View style={styles.fontSizeControls}>
                <TouchableOpacity
                  onPress={() => setFontSize((size) => Math.max(12, size - 2))}
                  style={styles.fontSizeButton}
                >
                  <Text style={styles.fontSizeText}>A-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setFontSize((size) => Math.min(24, size + 2))}
                  style={styles.fontSizeButton}
                >
                  <Text style={styles.fontSizeText}>A+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.themeSelection}>
              <Text style={styles.optionText}>Background Theme</Text>
              <View style={styles.themeOptions}>
                {colorThemes.map((color, index) => (
                  <TouchableOpacity
                    key={`color-${index}`}
                    onPress={() => {
                      setThemeIndex(index);
                      setIsColorTheme(true);
                    }}
                    style={[styles.themePreview, { backgroundColor: color }]}
                  />
                ))}
                {imageThemes.map((image, index) => (
                  <TouchableOpacity
                    key={`image-${index}`}
                    onPress={() => {
                      setThemeIndex(index);
                      setIsColorTheme(false);
                    }}
                  >
                    <ImageBackground
                      source={image}
                      style={styles.themeImagePreview}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.themeSelection}>
              <Text style={styles.optionText}>Text Color</Text>
              <View style={styles.themeOptions}>
                {textColorOptions.map((color, index) => (
                  <TouchableOpacity
                    key={`text-color-${index}`}
                    onPress={() => setTextColor(color)}
                    style={[styles.themePreview, { backgroundColor: color }]}
                  />
                ))}
              </View>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ContentSection = ({
  title,
  content,
  themeStyles,
  fontSize,
  contentWidth,
}: {
  title: string;
  content: string;
  themeStyles: { color: string };
  fontSize: number;
  contentWidth: number;
}) => {
  const tagsStyles = {
    p: {
      color: themeStyles.color,
      fontSize,
      lineHeight: 24,
      marginVertical: 5,
    },
    strong: {
      fontWeight: "bold",
    },
    em: {
      fontStyle: "italic",
    },
    table: {
      width: "100%",
      marginVertical: 10,
      border: "1px solid #ccc", // Apply border to the table
    },
    th: {
      padding: 10,
      backgroundColor: "#f1f1f1",
      borderTopWidth: 1, // Apply border to the top
      borderLeftWidth: 1, // Apply border to the left
      borderRightWidth: 1, // Apply border to the right
      borderColor: "#ccc",
    },
    td: {
      padding: 10,
      borderWidth: 1, // Apply border to each cell
      borderColor: "#ccc",
    },
    br: {
      marginBottom: 8,
    },
    blockquote: {
      borderLeftWidth: 5,
      borderColor: "#ccc",
      padding: 10,
      marginVertical: 10,
      backgroundColor: "#f9f9f9",
      fontStyle: "italic",
    },
    ul: {
      marginVertical: 10,
      paddingLeft: 20,
    },
    ol: {
      marginVertical: 10,
      paddingLeft: 20,
    },
    li: {
      color: themeStyles.color,
      fontSize,
      lineHeight: 24,
    },
    a: {
      color: "#6200ee", // Link color
      textDecorationLine: "underline", // Underline links
    },
    img: {
      height: 225,
      width: 225,
      alignSelf: "center",
      marginVertical: 10,
    },
  };

  return (
    <ScrollView style={styles.contentContainer}>
      <Text style={[styles.title, { color: themeStyles.color }]}>{title}</Text>
      <RenderHTML
        contentWidth={contentWidth}
        source={{ html: content }}
        tagsStyles={tagsStyles as any}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreenBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    padding: 20,
    paddingTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  settingsButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#6200ee",
    borderRadius: 30,
    padding: 15,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  settingOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },
  optionText: {
    fontSize: 16,
  },
  fontSizeControls: {
    flexDirection: "row",
  },
  fontSizeButton: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "#6200ee",
  },
  fontSizeText: {
    color: "#fff",
    fontSize: 16,
  },
  themeSelection: {
    width: "100%",
    marginTop: 20,
  },
  themeOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  themePreview: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
  },
  themeImagePreview: {
    width: 40,
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#6200ee",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
  },
});

export default LessonContentScreen;
