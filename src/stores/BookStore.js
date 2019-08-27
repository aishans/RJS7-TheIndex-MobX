import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class BookStore {
  books = [];

  loading = true;

  query = "";

  bookColor = null;

  fetchBooks = async () => {
    try {
      const res = await instance.get("/api/books/");
      const books = res.data;
      this.books = books;
      this.loading = false;
    } catch (err) {
      console.error(err);
    }
  };

  get filterBorrow() {
    return (this.books.available = !this.book.available);
  }

  get filteredBooks() {
    return this.books.filter(book =>
      `${book.title} `.toLowerCase().includes(this.query.toLowerCase())
    );
  }
  get filteredBooksByColor() {
    return this.books.filter(book =>
      `${book.color} `.toLowerCase().includes(this.bookColor.toLowerCase())
    );
  }
}

decorate(BookStore, {
  books: observable,
  loading: observable,
  query: observable,
  filteredBooks: computed
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;
