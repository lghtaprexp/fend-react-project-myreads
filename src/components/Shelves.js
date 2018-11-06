import React from 'react';
import Books from './Books';

class Shelves extends React.Component {
  render() {
	return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{this.props.shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            this.props.books.length > 0 &&
            this.props.books.map((book, key) => 
              <Books addBook={this.props.addBook} book={book} key={key} />)
          }
        </ol>
      </div>
    </div>
	);
  }
}

export default Shelves;