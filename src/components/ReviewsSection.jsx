import React, { useState, useEffect } from 'react';
import '../styles/review.scss';
import Review from '../components/Review';
import { useSelector } from 'react-redux';


const Reviews = ({ propertyId }) => {
    const user = useSelector((state) => state.user);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setuserId] = useState(user._id);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:3001/reviews/${propertyId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);
 
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newReview = {propertyId, userId, rating, comment };
    try {
      const response = await fetch(`http://localhost:3001/reviews/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });
      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
      const savedReview = await response.json();
      setReviews([...reviews, savedReview]);
      setuserId(user._id);
      setRating(0);
      setComment('');
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="reviews-section">
      <h3>Submit a Review</h3>
      <form onSubmit={handleSubmit} className="review-form">
      
        <div>
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          >
            <option value="">Select rating</option>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        reviews.map((review, index) => <Review key={index} review={review} />)
      )}
    </div>
  );
};

export default Reviews;
