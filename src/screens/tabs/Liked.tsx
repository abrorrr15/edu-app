import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFocusEffect,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BookItemProps } from "../../types";
import { RootStackParamList } from "../../../navigation";
import { useTheme } from "../../components/ThemeContext";
import { useTranslation } from "react-i18next";

export default function Liked() {
  const { t } = useTranslation(); // Use the translation hook
  const { isDarkTheme } = useTheme();
  const [books, setBooks] = useState<BookItemProps[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useFocusEffect(
    useCallback(() => {
      fetchLikedBooks();
    }, [])
  );

  const fetchLikedBooks = async () => {
    try {
      const storedLikedBooks = await AsyncStorage.getItem("@liked_books");
      const likedBooks = storedLikedBooks ? JSON.parse(storedLikedBooks) : [];
      setBooks(likedBooks);
    } catch (error) {
      console.log(t("Error fetching liked books"), error); // Added translation
    }
  };

  const handleRemove = async (id: string) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    await AsyncStorage.setItem("@liked_books", JSON.stringify(updatedBooks));
  };

  const openLessonContent = (book: BookItemProps) => {
    navigation.navigate("LessonContent", {
      title: book.title,
      content: book.content,
    });
  };

  const renderBook = ({ item }: { item: BookItemProps }) => (
    <View style={[styles.bookCard, isDarkTheme && styles.darkBookCard]}>
      <Image
        source={item.image || ({ uri: item.imageUri as any } as any)}
        style={styles.bookCover}
      />
      <View style={styles.bookInfo}>
        <Text style={[styles.bookTitle, isDarkTheme && styles.darkBookTitle]}>
          {item.title}
        </Text>
        <Text style={[styles.bookAuthor, isDarkTheme && styles.darkBookAuthor]}>
          {item.author}
        </Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.readButton}
            onPress={() => openLessonContent(item)}
          >
            <Text style={styles.readButtonText}>
              <Ionicons name="eye-outline" color="white" />
              {t("Read")} {/* Added translation */}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemove(item.id)}
          >
            <Ionicons name="heart-dislike" size={20} color="#ff5252" />
            <Text style={styles.removeButtonText}>{t("Remove")}</Text>
            {/* Added translation */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <Text style={[styles.pageTitle, isDarkTheme && styles.darkPageTitle]}>
        {t("Liked Books")} {/* Added translation */}
      </Text>
      {books.length > 0 ? (
        <FlatList
          data={books}
          renderItem={renderBook}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.bookList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={80} color="#ddd" />
          <Text
            style={[
              styles.emptyMessage,
              isDarkTheme && styles.darkEmptyMessage,
            ]}
          >
            {t("No liked books yet.")} {/* Added translation */}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    padding: 16,
    paddingTop: StatusBar.currentHeight || 0,
  },
  darkContainer: {
    backgroundColor: "#1c1c1c",
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  darkPageTitle: {
    color: "#fff",
  },
  bookList: {
    paddingBottom: 30,
  },
  bookCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  darkBookCard: {
    backgroundColor: "#2a2a2a",
  },
  bookCover: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 10,
  },
  bookInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  darkBookTitle: {
    color: "#fff",
  },
  bookAuthor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  darkBookAuthor: {
    color: "#aaa",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  readButton: {
    backgroundColor: "#6200ee",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  readButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  removeButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#ffe6e6",
    borderRadius: 8,
  },
  removeButtonText: {
    fontSize: 14,
    color: "#ff5252",
    marginLeft: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyMessage: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 10,
  },
  darkEmptyMessage: {
    color: "#ccc",
  },
});
