import { useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { BookType, CatalogType } from "../types";
import { RootStackParamList } from "../../navigation";
import { useTranslation } from "react-i18next";
import { useTheme } from "./ThemeContext";

const BookItem = ({
  book,
  isLiked,
  toggleLikeBook,
  openModal,
  deleteBook,
  catalogs,
}: {
  book: BookType;
  isLiked: boolean;
  toggleLikeBook: (book: BookType) => void;
  openModal: (book: BookType) => void;
  deleteBook: (book: BookType) => void;
  catalogs: CatalogType[];
}) => {
  const { isDarkTheme } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useFocusEffect(
    useCallback(() => {
      getCatalogsForBook();
    }, [])
  );

  const getCatalogsForBook = () => {
    return catalogs
      .filter((catalog) => catalog.books.some((b) => b.id === book.id))
      .map((catalog) => catalog.name);
  };

  function handleRedirect() {
    Alert.alert(t("Confirmation"), t("Are you sure you want to proceed?"), [
      {
        text: t("Cancel"),
        style: "cancel",
      },
      {
        text: t("Confirm"),
        onPress: () => {
          navigation.navigate("LessonContent", {
            title: book.title,
            content: book.content,
          });
        },
      },
    ]);
  }

  const handleDelete = () => {
    Alert.alert(
      t("Delete Book"),
      t("Are you sure you want to delete this book?"),
      [
        { text: t("Cancel"), style: "cancel" },
        { text: t("Delete"), onPress: () => deleteBook(book) },
      ]
    );
  };

  // Define colors based on the theme
  const backgroundColor = isDarkTheme ? "#333" : "#fff";
  const titleColor = isDarkTheme ? "#fff" : "#333";
  const authorColor = isDarkTheme ? "#ccc" : "#666";
  const catalogBadgeColor = isDarkTheme ? "#1be02b" : "#1be02b"; // Keep the same or change for dark
  const actionButtonColor = isDarkTheme ? "#888" : "#888"; // Change if needed

  return (
    <TouchableOpacity
      style={[styles.bookItem, { backgroundColor }]}
      onPress={handleRedirect}
    >
      <Image
        source={
          book.image ||
          ({
            uri:
              typeof book.imageUri === "string"
                ? book.imageUri
                : "default-book.png",
          } as any)
        }
        style={styles.bookImage}
      />

      <View style={styles.bookInfo}>
        <Text
          style={[styles.bookTitle, { color: titleColor }]}
          numberOfLines={1}
        >
          {book.title}
        </Text>
        <Text
          style={[styles.bookAuthor, { color: authorColor }]}
          numberOfLines={1}
        >
          {book.author}
        </Text>
        {getCatalogsForBook().length > 0 && (
          <View style={styles.catalogBadgeContainer}>
            {getCatalogsForBook().map((catalogName) => (
              <Text
                style={[
                  styles.catalogBadge,
                  { backgroundColor: catalogBadgeColor },
                ]}
                key={catalogName}
              >
                {catalogName}
              </Text>
            ))}
          </View>
        )}
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={() => toggleLikeBook(book)}
          style={styles.actionButton}
        >
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={24}
            color={isLiked ? "#ff5252" : actionButtonColor}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => openModal(book)}
          style={styles.actionButton}
        >
          <Ionicons name="folder-open" size={24} color="#6200ee" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
          <Ionicons name="trash-outline" size={24} color="#ff5252" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bookItem: {
    flexDirection: "row",
    padding: 15,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    alignItems: "center",
  },
  bookImage: {
    width: 80,
    height: 100,
    borderRadius: 10,
    resizeMode: "cover",
  },
  bookInfo: {
    flex: 1,
    marginLeft: 15,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bookAuthor: {
    fontSize: 14,
    marginVertical: 4,
  },
  catalogBadgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
  },
  catalogBadge: {
    color: "#fff",
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 4,
    marginTop: 4,
  },
  actionsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
  },
  actionButton: {
    padding: 8,
  },
});

export default BookItem;
