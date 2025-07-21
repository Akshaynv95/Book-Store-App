import React, { useEffect, useState, useCallback } from 'react';
import './BookDetail.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BookDetailPage = () => {
  const { id } = useParams();
  const { token, user } = useSelector((state) => state.auth);

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: '', comment: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchBookDetails = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/books/${id}`);
      setBook(res.data);
    } catch (err) {
      setError('Failed to fetch book');
    }
  }, [id]);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/reviews?bookId=${id}`);
      setReviews(res.data);
    } catch (err) {
      console.error('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBookDetails();
    fetchReviews();
  }, [fetchBookDetails, fetchReviews]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/reviews`,
        { ...newReview, bookId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewReview({ rating: '', comment: '' });
      fetchReviews(); // reload reviews
      setMessage('Review submitted successfully!');
    } catch (err) {
      setMessage('Failed to submit review');
    }
  };

  if (loading) return <p>Loading book...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!book) return null;

  return (
    <div className="book-detail-page">
      <div className="book-info">
        {book.coverImage && <img src={book.coverImage} alt={book.title} />}
        <div>
          <h2>{book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          {book.genre && <p><strong>Genre:</strong> {book.genre}</p>}
          {book.publishedYear && <p><strong>Year:</strong> {book.publishedYear}</p>}
          {book.description && <p>{book.description}</p>}
        </div>
      </div>

      <hr />

      <div className="reviews-section">
        <h3>Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((rev) => (
            <div key={rev._id} className="review">
              <strong>{rev.userId.name}:</strong> ⭐{rev.rating}
              <p>{rev.comment}</p>
            </div>
          ))
        )}
      </div>

      {token && user?.role === 'user' && (
        <div className="review-form">
          <h3>Submit Your Review</h3>
          {message && <p className="status-msg">{message}</p>}
          <form onSubmit={handleReviewSubmit}>
            <select
              name="rating"
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
              required
            >
              <option value="">Select Rating</option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <textarea
              placeholder="Your comment"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookDetailPage;
