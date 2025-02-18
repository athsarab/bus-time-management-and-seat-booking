import React, { useState } from 'react';
import axios from 'axios';

const PackageCard = ({ packages }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    name: packages.name,
    description: packages.description,
    price: packages.price
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({
      ...updateFormData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:3000/api/packages/${packages._id}`, updateFormData)
      .then(() => {
        setShowUpdateForm(false);
        // Reload packages after update
        window.location.reload();
      })
      .catch(error => console.error("Error:", error));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
        axios.delete(`http://localhost:3000/api/packages/${packages._id}`)
            .then((response) => {
                console.log(response.data);
                // Optionally, you can update the UI after successful deletion
                // For example, you can filter out the deleted employee from the list of employees
                // Or you can reload the employee list from the server
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error, show alert, or any other action you want to take
            });
    }
  };
  return (
    <div className="package-card">
     <img
  src="https://ideausher.com/wp-content/uploads/2021/03/Instagram-Post-%E2%80%93-2-1.png"
  alt="Product"
  style={{ maxWidth: '450px', maxHeight: '450px' }}
/>

      <div className="card-content">
        <h2 className="card-title">{packages.name}</h2>
        <p className="card-id">{packages.packageID}</p>
        <p className="card-description">{packages.description}</p>
        <p className="card-price">{packages.price}</p>
        <button className="btn btn-info m-2" style={{ backgroundColor: 'blue', color: 'white' }} onClick={() => setShowUpdateForm(true)}>Update</button>
        <button className="btn btn-danger m-2" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDelete(packages._id)}>Delete</button>
      </div>

      {/* Update Form */}
      {showUpdateForm && (
        <div className="update-form">
          <h3>Update Package</h3>
          <label>Name:</label>
          <input type="text" name="name" value={updateFormData.name} onChange={handleChange} />
          <label>Description:</label>
          <input type="text" name="description" value={updateFormData.description} onChange={handleChange} />
          <label>Price:</label>
          <input type="number" name="price" value={updateFormData.price} onChange={handleChange} />
          <button className="btn btn-primary" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleUpdate}>Submit</button>
          <button className="btn btn-secondary" style={{ backgroundColor: 'gray', color: 'white' }} onClick={() => setShowUpdateForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default PackageCard;
