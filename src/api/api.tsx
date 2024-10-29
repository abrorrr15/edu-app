import axios from "axios";

export async function getBooks() {
  try {
    const res = await axios.get("http://localhost:8000/books");

    return res.data;
  } catch (error: any) {
    throw error;
  }
}
