import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI';
import Shelves from '../Shelves';

class Main extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	  books: []
  	}
  }

  componentDidMount() {
  	BooksAPI.getAll()
  	.then(response => {
      this.setState({ books: response });
  	});
  }

  addBook = (book, shelf) => {
  	BooksAPI.update(book, shelf)
  	.then(response => {
  	  book.shelf = shelf;
      this.setState(state => ({
      	books: state.books.filter(selectBook => selectBook.id !== book.id).concat([book])
      }));
  	});
  }

  render() {
	return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelves addBook={this.addBook} shelfName="Current Reads" books={this.state.books.filter(book => book.shelf === "currentlyReading")} />
            <Shelves addBook={this.addBook} shelfName="Want To Read" books={this.state.books.filter(book => book.shelf === "wantToRead")} />
            <Shelves addBook={this.addBook} shelfName="Already Read" books={this.state.books.filter(book => book.shelf === "read")} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
	);
  }
}

export default Main;