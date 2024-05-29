import React from 'react';
import '../styles/review.scss';
import { useSelector } from 'react-redux';
// import delete icon 
import { Delete } from '@mui/icons-material';

const Review = ({ review }) => {
    const user = useSelector((state) => state.user);
    
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (v, i) => (
      <span key={i} className="star">
        {i < rating ? '★' : '☆'}
      </span>
    ));
  };

  const handleDelete = async (reviewId) => {
    try {
      const response = await fetch(`http://localhost:3001/reviews/${reviewId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete review');
      }
      // Remove the review from the list
      window.location.reload();

    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div className="review">
        <div className='review-header'>
      <h4>{review.userId.firstName + ' ' + review.userId.lastName}</h4>
      {review.userId._id === user._id && (
      <button className="btn btn-primary"
      onClick={() => handleDelete(review._id)}
      > <Delete /> </button>
        )}
      </div>
      <p>{review.comment}</p>
      <div className="rating">{renderStars(review.rating)}</div>
    </div>
  );
};

export default Review;
