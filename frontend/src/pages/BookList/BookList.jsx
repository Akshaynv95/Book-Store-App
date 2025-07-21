import React, { useEffect, useState } from 'react';
import './BookList.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../redux/bookSlice';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { books, loading, error } = useSelector((state) => state.books);

  const [search, setSearch] = useState('');
  const [genreFilter, setGenreFilter] = useState('');

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(search.toLowerCase()) &&
      (genreFilter === '' || book.genre.toLowerCase() === genreFilter.toLowerCase())
    );
  });

  return (
    <div className="book-list-container">
      <h2> All Books</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
          <option value="">All Genres</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Fiction">Fiction</option>
          <option value="Romance">Romance</option>
          <option value="Thriller">Thriller</option>
        </select>
      </div>

      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="book-grid">
          {filteredBooks.map((book) => (
            <div
              className="book-card"
              key={book._id}
              onClick={() => navigate(`/books/${book._id}`)}
            >
              {book.coverImage && <img src={book.coverImage} alt={book.title} />}
              <h4>{book.title}</h4>
              <p>{book.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
