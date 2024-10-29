import { useState, useCallback } from "react";
import {
  Alert,
  Modal,
  TextInput,
  Pressable,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { FAB, Snackbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation";
import { useTheme } from "../../components/ThemeContext";
import { useTranslation } from "react-i18next";

const CATALOGS_STORAGE_KEY = "@catalogs_list";

interface BookProp {
  id: string;
  title: string;
  author: string;
  image?: string;
  imageUri: string;
  content: string;
}

interface CatalogProp {
  id: string;
  name: string;
  books: BookProp[];
}

const CatalogsPage = () => {
  const { t } = useTranslation();
  const [catalogs, setCatalogs] = useState<CatalogProp[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCatalogName, setCurrentCatalogName] = useState("");
  const [editingCatalogId, setEditingCatalogId] = useState<
    string | undefined
  >();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { isDarkTheme, fontType } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useFocusEffect(
    useCallback(() => {
      loadCatalogs();
    }, [])
  );

  const loadCatalogs = async () => {
    try {
      const storedCatalogs = await AsyncStorage.getItem(CATALOGS_STORAGE_KEY);
      if (storedCatalogs) {
        const parsedCatalogs = JSON.parse(storedCatalogs);
        setCatalogs(parsedCatalogs || []);
      }
    } catch (error) {
      console.error("Failed to load catalogs from storage", error);
    }
  };

  const saveCatalogs = async (newCatalogs: CatalogProp[]) => {
    try {
      await AsyncStorage.setItem(
        CATALOGS_STORAGE_KEY,
        JSON.stringify(newCatalogs)
      );
      setCatalogs(newCatalogs);
    } catch (error) {
      console.error("Failed to save catalogs", error);
    }
  };

  const deleteCatalog = (id: string) => {
    Alert.alert(
      t("Delete Catalog"),
      t("Are you sure you want to delete this catalog?"),
      [
        { text: t("Cancel"), style: "cancel" },
        {
          text: t("Delete"),
          onPress: () => {
            const updatedCatalogs = catalogs.filter(
              (catalog) => catalog.id !== id
            );
            saveCatalogs(updatedCatalogs);
            showSnackbar(t("Catalog deleted successfully."));
          },
        },
      ]
    );
  };

  const deleteBookFromCatalog = (catalogId: string, bookId: string) => {
    Alert.alert(
      t("Delete Book"),
      t("Are you sure you want to remove this book?"),
      [
        { text: t("Cancel"), style: "cancel" },
        {
          text: t("Remove"),
          onPress: async () => {
            const updatedCatalogs = catalogs.map((catalog) => {
              if (catalog.id && catalogId) {
                return {
                  ...catalog,
                  books: catalog.books.filter((book) => book.id !== bookId),
                };
              }
              return catalog;
            });

            setCatalogs(updatedCatalogs); // Update state immediately
            await AsyncStorage.setItem(
              CATALOGS_STORAGE_KEY,
              JSON.stringify(updatedCatalogs)
            );

            showSnackbar(t("Book removed from catalog."));
          },
        },
      ]
    );
  };

  const openModal = (id?: string, name = "") => {
    setCurrentCatalogName(name);
    setEditingCatalogId(id);
    setModalVisible(true);
  };

  const saveCatalog = () => {
    if (currentCatalogName.trim() === "") {
      Alert.alert(t("Error"), t("Catalog name cannot be empty."));
      return;
    }

    if (editingCatalogId) {
      const updatedCatalogs = catalogs.map((catalog) =>
        catalog.id === editingCatalogId
          ? { ...catalog, name: currentCatalogName }
          : catalog
      );
      saveCatalogs(updatedCatalogs);
      showSnackbar(t("Catalog updated successfully."));
    } else {
      const newCatalog: CatalogProp = {
        id: Date.now().toString(),
        name: currentCatalogName,
        books: [],
      };
      const updatedCatalogs = [...catalogs, newCatalog];
      saveCatalogs(updatedCatalogs);
      showSnackbar(t("New catalog created successfully."));
    }

    setModalVisible(false);
    setCurrentCatalogName("");
    setEditingCatalogId(undefined);
  };

  const onBookPress = (book: BookProp) => {
    navigation.navigate("LessonContent", {
      title: book.title,
      content: book.content,
    });
  };

  const renderBook = ({
    item,
    catalogId,
  }: {
    item: BookProp;
    catalogId: string;
  }) => (
    <View style={styles.bookItem}>
      {item.imageUri || item.image ? (
        <Image
          source={item.image || ({ uri: item.imageUri as any } as any)}
          style={styles.bookImage}
        />
      ) : (
        <Ionicons name="book-outline" size={36} color="#6200EE" />
      )}
      <View style={styles.bookDetails}>
        <Text
          style={[styles.bookTitle, { color: isDarkTheme ? "#fff" : "#333" }]}
        >
          {item.title}
        </Text>
        <Text
          style={[styles.bookAuthor, { color: isDarkTheme ? "#ccc" : "#666" }]}
        >
          by {item.author}
        </Text>
      </View>
      <TouchableOpacity onPress={() => onBookPress(item)}>
        <Ionicons
          name="eye-sharp"
          size={24}
          color="blue"
          style={styles.deleteBookButton}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => deleteBookFromCatalog(catalogId, item.id)}
        style={styles.deleteBookButton}
      >
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  const renderCatalog = ({ item }: { item: CatalogProp }) => (
    <View
      style={[
        styles.catalogCard,
        { backgroundColor: isDarkTheme ? "#333" : "#fff" },
      ]}
    >
      <View style={styles.catalogHeader}>
        <Text
          style={[styles.catalogName, { color: isDarkTheme ? "#fff" : "#333" }]}
        >
          <Ionicons name="folder" color="orange" size={15} />
          {item.name}
        </Text>
        <View style={styles.catalogActions}>
          <TouchableOpacity
            onPress={() => openModal(item.id, item.name)}
            style={styles.editButton}
          >
            <Ionicons name="pencil" size={18} color="#FFDD57" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteCatalog(item.id)}
            style={styles.deleteButton}
          >
            <Ionicons name="trash" size={18} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      {item.books.length > 0 ? (
        <FlatList
          data={item.books}
          renderItem={({ item }) => renderBook({ item, catalogId: item.id })}
          keyExtractor={(book) => book.id}
        />
      ) : (
        <Text
          style={[styles.noBooksText, { color: isDarkTheme ? "#ccc" : "#999" }]}
        >
          {t("No books in this catalog.")}
        </Text>
      )}
    </View>
  );

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkTheme ? "#121212" : "#f5f5f5" },
      ]}
    >
      <Text
        style={[styles.header, { color: isDarkTheme ? "#fff" : "#6200EE" }]}
      >
        {t("My Book Catalogs")}
      </Text>
      {catalogs.length === 0 && (
        <View style={styles.emptyStateContainer}>
          <Text
            style={[
              styles.emptyStateText,
              { color: isDarkTheme ? "#ccc" : "#666" },
            ]}
          >
            {t(
              'No catalogs available. Press the "+" button to create a catalog!'
            )}
          </Text>
        </View>
      )}
      <FlatList
        data={catalogs}
        renderItem={renderCatalog}
        keyExtractor={(item) => item.id}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        color="white"
        onPress={() => openModal()}
      />

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: isDarkTheme ? "#222" : "#fff" },
            ]}
          >
            <Text
              style={[
                styles.modalTitle,
                { color: isDarkTheme ? "#fff" : "#333" },
              ]}
            >
              {editingCatalogId ? t("Edit Catalog") : t("New Catalog")}
            </Text>
            <TextInput
              value={currentCatalogName}
              onChangeText={setCurrentCatalogName}
              placeholder={t("Enter catalog name")}
              placeholderTextColor={isDarkTheme ? "#fff" : "#444"}
              style={[
                styles.input,
                {
                  color: isDarkTheme ? "#fff" : "#444",
                  borderColor: isDarkTheme ? "#ccc" : "#888",
                  backgroundColor: isDarkTheme ? "#444" : "#fff",
                },
              ]}
            />
            <Pressable onPress={saveCatalog} style={styles.saveButton}>
              <Text
                style={[
                  styles.saveButtonText,
                  { color: isDarkTheme ? "#fff" : "#f1f1f1" },
                ]}
              >
                {editingCatalogId ? t("Save") : t("Create")}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text
                style={[
                  styles.cancelButtonText,
                  { color: isDarkTheme ? "#fff" : "#888" },
                ]}
              >
                {t("Cancel")}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  catalogCard: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  catalogHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
    borderBottomWidth: 1,
  },
  catalogName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  catalogActions: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 10,
  },
  deleteButton: {
    marginRight: 10,
  },
  deleteBookButton: {
    marginRight: 10,
  },
  bookItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
    marginBottom: 10,
  },
  bookImage: {
    width: 50,
    height: 75,
    marginRight: 10,
    borderRadius: 5,
  },
  bookDetails: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bookAuthor: {
    fontSize: 14,
    color: "#666",
  },
  noBooksText: {
    textAlign: "center",
    fontSize: 14,
    color: "#999",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#6200EE",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "#6200EE",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#888",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default CatalogsPage;
