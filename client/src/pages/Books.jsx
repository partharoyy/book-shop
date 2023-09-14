import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";

export const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBooks();
  }, []);

  const onDeleteHandler = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="books-container">
      {console.log(books)}
      <h1>Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt={book.title} />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <p>{book.cover}</p>
            <span>{book.price}</span>
            <button className="update sub-button">
              <Link to={`/update/${book.id}`}>Update</Link>
            </button>
            <button
              className="delete sub-button"
              onClick={() => onDeleteHandler(book.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <button className="add-button">
        <Link to="/add">Add new book</Link>
      </button>
    </div>
  );
};
