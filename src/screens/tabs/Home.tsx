import { useCallback, useState, useTransition } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Modal,
  Alert,
  Button,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import CategoryList from "../../components/CategoryList";
import BookItem from "../../components/BookItem";
import { initialBooks } from "../../mockData";
import { BookType, CatalogType } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "../../components/ThemeContext";
import { useTranslation } from "react-i18next"; // Import translation hook

const HomeScreen = () => {
  const { t } = useTranslation(); // Use the translation hook
  const { isDarkTheme, fontType } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [allBooks, setAllBooks] = useState<BookType[]>(initialBooks);
  const [filteredBooks, setFilteredBooks] = useState<BookType[]>(initialBooks);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [likedBooks, setLikedBooks] = useState<BookType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [catalogs, setCatalogs] = useState<CatalogType[]>([]);
  const [newCatalogName, setNewCatalogName] = useState("");
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);

  //Colors for themes
  const containerBackgroundColor = isDarkTheme ? "#121212" : "#f5f5f5";
  const textColor = isDarkTheme ? "#ffffff" : "#000000";
  const modalBackgroundColor = isDarkTheme ? "#333333" : "#ffffff";
  const buttonColor = isDarkTheme ? "#bb86fc" : "#6200ee";

  useFocusEffect(
    useCallback(() => {
      fetchCatalogs();
      fetchLikes();
      fetchBooks();
    }, [])
  );

  const fetchBooks = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const bookKeys = keys.filter((key) => key.startsWith("book_"));
      const storedBooks = await AsyncStorage.multiGet(bookKeys);
      const downloadedBooks = storedBooks.map(([_, value]) =>
        JSON.parse(value!)
      );
      const combinedBooks = [...initialBooks, ...downloadedBooks];

      setAllBooks(combinedBooks);
      setFilteredBooks(combinedBooks);
    } catch (error) {
      console.error("Error loading offline books", error);
      Alert.alert(t("Error"), t("Failed to load offline books."));
    }
  };

  const onSearchChange = (query: string) => {
    setSearchQuery(query);
    const updatedBooks = allBooks.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(updatedBooks);
  };

  const onCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const updatedBooks = allBooks.filter((book) => book.category === category);
    setFilteredBooks(updatedBooks);
  };

  const toggleLikeBook = async (book: BookType) => {
    const updatedLikedBooks = likedBooks.some((b) => b.id === book.id)
      ? likedBooks.filter((b) => b.id !== book.id)
      : [...likedBooks, book];

    setLikedBooks(updatedLikedBooks);
    await AsyncStorage.setItem(
      "@liked_books",
      JSON.stringify(updatedLikedBooks)
    );
  };

  const fetchCatalogs = async () => {
    try {
      const storedCatalogs = await AsyncStorage.getItem("@catalogs_list");
      const catalogs = storedCatalogs ? JSON.parse(storedCatalogs) : [];
      setCatalogs(catalogs);
    } catch (error) {
      console.log("Error fetching catalogs", error);
    }
  };

  const fetchLikes = async () => {
    try {
      const storedLikes = await AsyncStorage.getItem("@liked_books");
      const likes = storedLikes ? JSON.parse(storedLikes) : [];
      setLikedBooks(likes);
    } catch (error) {
      console.log("Error fetching likes", error);
    }
  };

  const deleteBook = async (book: BookType) => {
    try {
      await AsyncStorage.removeItem(`book_${book.id}`);
      const updatedBooks = allBooks.filter((b) => b.id !== book.id);
      setAllBooks(updatedBooks);
      setFilteredBooks(updatedBooks);
      Alert.alert(t("Success"), `${t("The book has been deleted")}.`);
    } catch (error) {
      Alert.alert(t("Error"), t("Failed to delete the book."));
    }
  };

  const addToCatalog = async (book: BookType, catalogName: string) => {
    try {
      const bookWithId = { ...book, id: book.id };
      const updatedCatalogs = catalogs.map((catalog: CatalogType) => {
        if (
          catalog.name === catalogName &&
          !catalog.books.some((b) => b.id === bookWithId.id)
        ) {
          return { ...catalog, books: [...catalog.books, bookWithId] };
        }
        return catalog;
      });

      setCatalogs(updatedCatalogs);
      await AsyncStorage.setItem(
        "@catalogs_list",
        JSON.stringify(updatedCatalogs)
      );
      Alert.alert(t("Success"), t("The book has been added into the catalogs"));
    } catch (error) {
      Alert.alert(t("Error"), t("Failed to add the book to the catalog."));
    }
  };

  const createNewCatalog = async () => {
    if (!newCatalogName.trim()) {
      Alert.alert(t("Error"), t("Please enter a valid catalog name."));
      return;
    }

    if (!selectedBook) {
      Alert.alert(t("Error"), t("No book selected."));
      return;
    }

    let newCatalogId = "1";
    if (catalogs.length > 0) {
      const highestId = Math.max(
        ...catalogs.map((catalog) => parseInt(catalog.id, 10))
      );
      newCatalogId = (highestId + 1).toString();
    }

    const newCatalog: CatalogType = {
      id: newCatalogId,
      name: newCatalogName,
      books: [selectedBook],
    };

    const updatedCatalogs = [...catalogs, newCatalog];
    setCatalogs(updatedCatalogs);

    await AsyncStorage.setItem(
      "@catalogs_list",
      JSON.stringify(updatedCatalogs)
    );

    Alert.alert(
      t("Success"),
      `${t("Catalog created and book added", { catalogName: newCatalogName })}`
    );
    closeModal();
  };

  const openModal = (book: BookType) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  const closeModal = () => {
    setNewCatalogName("");
    setModalVisible(false);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: containerBackgroundColor }]}
    >
      <StatusBar barStyle={isDarkTheme ? "light-content" : "dark-content"} />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
        presentationStyle="overFullScreen"
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: modalBackgroundColor },
            ]}
          >
            <Text
              style={[
                styles.modalHeader,
                { color: textColor, fontFamily: fontType },
              ]}
            >
              {t("Move to a Catalog", { bookTitle: selectedBook?.title })}
            </Text>

            <FlatList
              data={catalogs}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.catalogItem}
                  onPress={() => {
                    addToCatalog(selectedBook!, item.name);
                    closeModal();
                  }}
                >
                  <Ionicons name="folder" size={18} color="orange" />
                  <Text
                    style={[
                      styles.catalogText,
                      { color: textColor, fontFamily: fontType },
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <Text
              style={[
                styles.modalSubHeader,
                { color: textColor, fontFamily: fontType },
              ]}
            >
              {t("Or create a new catalog")}
            </Text>
            <TextInput
              style={[styles.input, { fontFamily: fontType, color: textColor }]}
              placeholder={t("Enter new catalog name")}
              value={newCatalogName}
              onChangeText={setNewCatalogName}
            />
            <View style={styles.modalButtons}>
              <Button
                title={t("Create and Add")}
                onPress={createNewCatalog}
                color="green"
              />
              <Button title={t("Cancel")} onPress={closeModal} color="red" />
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookItem
            book={item}
            isLiked={likedBooks.some((likedBook) => likedBook.id === item.id)}
            toggleLikeBook={toggleLikeBook}
            openModal={() => openModal(item)}
            deleteBook={deleteBook}
            catalogs={catalogs}
          />
        )}
        ListHeaderComponent={
          <>
            <Header />
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
            />
            <CategoryList
              categories={[...new Set(allBooks.map((book) => book.category))]}
              selectedCategory={selectedCategory}
              onCategorySelect={onCategorySelect}
            />
          </>
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalHeader: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSubHeader: {
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
  catalogItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
  },
  catalogText: {
    marginLeft: 8,
  },
});

export default HomeScreen;
