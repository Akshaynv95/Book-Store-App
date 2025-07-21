import React, { useState } from 'react';
import './AddBookPage.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddBookPage = () => {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    publishedYear: '',
    coverImage: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/books`,
        bookData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(' Book added successfully!');
      setBookData({
        title: '',
        author: '',
        description: '',
        genre: '',
        publishedYear: '',
        coverImage: '',
      });
      setTimeout(() => navigate('/books'), 1500);
    } catch (err) {
      setMessage(' Failed to add book');
    }
  };

  //  Inline access check and message
  if (user?.role !== 'admin') {
    return (
      <div className="add-book-page">
        <h2>Access Denied </h2>
        <p style={{ color: 'red', textAlign: 'center' }}>
          Only admins can access this page.
        </p>
      </div>
    );
  }

  return (
    <div className="add-book-page">
      <form className="add-book-form" onSubmit={handleSubmit}>
        <h2>Add New Book</h2>
        {message && <p className="status-msg">{message}</p>}
        <input type="text" name="title" placeholder="Title" value={bookData.title} onChange={handleChange} required />
        <input type="text" name="author" placeholder="Author" value={bookData.author} onChange={handleChange} required />
        <input type="text" name="genre" placeholder="Genre" value={bookData.genre} onChange={handleChange} />
        <input type="number" name="publishedYear" placeholder="Published Year" value={bookData.publishedYear} onChange={handleChange} />
        <input type="text" name="coverImage" placeholder="Cover Image URL" value={bookData.coverImage} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={bookData.description} onChange={handleChange}></textarea>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;
