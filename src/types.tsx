// types.ts
export interface BookType {
  id: string;
  title: string;
  image?: string;
  imageUri?: string;
  author: string;
  category: string;
  content: string;
}

export interface CatalogType {
  id: string;
  name: string;
  books: BookType[];
}

export interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export interface CategoryListProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export interface BookItemProps {
  id: string;
  author: string;
  title: string;
  content: string;
  image?: string;
  imageUri: string;
  book: BookType;
  isLiked: boolean;
  toggleLikeBook: (book: BookType) => void;
  openModal: () => void;
  catalogs: CatalogType[];
}
