import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI';
import Books from '../Books';

class Search extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	  books: [],
  	  searchResults: [],
  	  search: ""
  	}
  }

  componentDidMount() {
  	BooksAPI.getAll()
  	.then(response => {
      this.setState({ books: response });
  	});
  }

  updateSearch = (search) => {
  	this.setState({search: search}, this.submitRequest);
  }

  submitRequest() {
  	if (this.state.search === '' || this.state.search === undefined) {
  	  return this.setState({ searchResults: [] });
  	}
  	BooksAPI.search(this.state.search.trim())
  	.then(response => {
  	  if (response.error) {
  	  	return this.setState({ searchResults: [] });
  	  } else {
  	  	  response.forEach(book => {
  	  	  	let foundBooks = this.state.books.filter(chosenBook => chosenBook.id === book.id);
  	  	  	if (foundBooks[0]) {
  	  	  	  book.shelf = foundBooks[0].shelf;
  	  	  	}
  	  	  });
  	  	return this.setState({ searchResults: response });
  	  }
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
      <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              value={this.state.search}
              onChange={(evt) => this.updateSearch(evt.target.value)} />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {
              	this.state.searchResults.map((book, key) => <Books addBook={this.addBook} book={book} key={key} />)
              }
            </ol>
          </div>
      </div>
	);
  }
}

export default Search;