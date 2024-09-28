import React, { useEffect, useState } from 'react';

const Modal = ({ show, closeModal }) => {
  const { title, description, trailerUrl, rating, seasons } = show;
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  // Close modal on 'Escape' key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeModal]);

  const handleAddReview = () => {
    if (newReview) {
      setReviews([...reviews, newReview]);
      setNewReview('');
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 modal-overlay"
      onClick={(e) => {
        if (e.target.classList.contains('modal-overlay')) {
          closeModal();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="bg-white rounded-lg p-4 max-w-lg mx-auto relative">
        <h2 id="modal-title" className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-sm mb-2">Rating: ⭐ {rating}/10</p>
        <p className="text-gray-700 mb-4">{description}</p>

        {/* Watch Trailer Button */}
        <a
          href={trailerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white rounded px-4 py-2 mr-2"
        >
          Watch Trailer
        </a>
        <button
          onClick={closeModal}
          className="mt-4 bg-red-500 text-white rounded px-4 py-2 absolute top-4 right-4"
        >
          Close
        </button>

        {/* Seasons List */}
        <h3 className="text-md font-bold mt-4">Seasons</h3>
        <ul className="list-disc ml-6">
          {seasons.map((season, index) => (
            <li key={index}>Season {season.season}: {season.episodes} episodes</li>
          ))}
        </ul>

        {/* Reviews Section */}
        <h3 className="text-md font-bold mt-4">Reviews</h3>
        <div className="mb-4">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <p key={index} className="border-b pb-2">{review}</p>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
        <input
          type="text"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Add a review..."
          className="border rounded w-full p-2 mb-2"
        />
        <button
          onClick={handleAddReview}
          className="bg-green-500 text-white rounded px-4 py-2"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default Modal;
