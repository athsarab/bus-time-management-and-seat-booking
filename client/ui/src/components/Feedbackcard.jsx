import React, { useState } from 'react';
import axios from 'axios';

const Feedbackcard = ({ review }) => {
  const [updatedReview, setUpdatedReview] = useState({ ...review });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    setUpdatedReview({ ...updatedReview, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/reviews/${review._id}`, updatedReview);
      window.alert("Review updated successfully!");
      window.location.reload(); // Refresh the page after successful update
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this feedback?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/reviews/${review._id}`);
        window.alert("Review deleted successfully!");
        window.location.reload(); // Refresh the page after successful deletion
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="card" style={{ width: 350 }}>
      <img src="https://img.freepik.com/free-photo/customer-experience-creative-collage_23-2149371200.jpg?t=st=1713817316~exp=1713820916~hmac=0821a0f13f77aa8b66926cf4f01f5bfe7473a685a765269c8b3eb94df2062e22&w=996" className="card-img-top" alt="Feedback" />
      <div className="card-body">
        {isEditing ? (
          <div>
            <input type="text" className="form-control mb-2" name="title" value={updatedReview.title} onChange={handleInputChange} />
            <textarea className="form-control mb-2" name="content" value={updatedReview.content} onChange={handleInputChange} />
            <input type="number" className="form-control mb-2" name="rating" value={updatedReview.rating} onChange={handleInputChange} />
          </div>
        ) : (
          <div>
            <h5 className="card-title">{review.title}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">{review.content}</h6>
            <p className="card-text">Feedback: {review.rating}</p>
            <p className="card-text">Feedback: {review.createdAt}</p>
          </div>
        )}
        <div>
          {isEditing ? (
            <button className="btn btn-success me-2" onClick={handleUpdate} style={{ backgroundColor: 'green', color: 'white' }}>Save</button>
          ) : (
            <button className="btn btn-primary me-2" onClick={() => setIsEditing(true)} style={{ backgroundColor: 'blue', color: 'white' }}>Edit</button>
          )}
          <button className="btn btn-danger" onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Feedbackcard;
