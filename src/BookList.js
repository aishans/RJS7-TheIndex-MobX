import React, { Component } from "react";
//import axios from "axios";
import bookStore from "./stores/BookStore";

// Components
import Loading from "./Loading";
import SearchBar from "./SearchBar";
import BookTable from "./BookTable";
import { observer } from "mobx-react";

class BookList extends Component {
  filterBooksByColor = bookColor =>
    bookStore.books.filter(book => book.color === bookColor);

  render() {
    const bookColor = this.props.match.params.bookColor;
    let books = bookStore.books;

    if (bookColor) {
      books = this.filterBooksByColor(bookColor);
    }

    return bookStore.loading ? (
      <Loading />
    ) : (
      <div>
        <h3>Books</h3>
        <SearchBar store={bookStore} />
        <BookTable books={books} />
      </div>
    );
  }
}

export default observer(BookList);
