import React, { useState } from 'react';
import './ReviewForm.css';
import axios from 'axios';

const ReviewForm = ({ bookId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("You must be logged in to leave a review.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/reviews`, {
        bookId,
        rating,
        comment
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSuccess("Review submitted!");
      setComment('');
      setRating(5);
      setError('');
      onReviewAdded(); // refresh reviews
    } catch (err) {
      setError("Failed to submit review.");
      setSuccess('');
    }
  };

  return (
    <div className="review-form">
      <h3>Leave a Review</h3>
      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[5, 4, 3, 2, 1].map(num => (
              <option key={num} value={num}>{num} </option>
            ))}
          </select>
        </label>

        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            required
          />
        </label>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
