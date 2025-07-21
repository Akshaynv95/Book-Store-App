import React from 'react';
import './Home.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const featuredBooks = [
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      coverImage: 'https://covers.openlibrary.org/b/id/7222246-L.jpg'
    },
    {
      id: '2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      coverImage: 'https://covers.openlibrary.org/b/id/8228691-L.jpg'
    }
  ];

  return (
    <div className="home-container">
      <h2> Welcome to BOOK Store</h2>

      {token && user?.role === 'user' && (
        <div className="home-box">
          <h3>Hello, {user.name || user.email} </h3>
          <p>Browse and review your favorite books!</p>
          <button onClick={() => navigate('/profile/' + user.id)}>Go to Profile</button>
        </div>
      )}

      {token && user?.role === 'admin' && (
        <div className="home-box admin">
          <h3>Welcome Admin </h3>
          <p>Manage books for the Book Store.</p>
          <button onClick={() => navigate('/add-book')}>Add a New Book</button>
        </div>
      )}

      <h3 className="section-title">Featured Books</h3>
      <div className="featured-books">
        {featuredBooks.map((book) => (
          <div className="book-card" key={book.id}>
            <img src={book.coverImage} alt={book.title} />
            <h4>{book.title}</h4>
            <p>by {book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
