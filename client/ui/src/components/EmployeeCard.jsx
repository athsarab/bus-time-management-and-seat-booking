import React, { useState } from 'react';
import './EmployeeCard.css'; // Make sure to import the CSS file
import axios from 'axios';

const EmployeeCard = ({ employee }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({ ...employee });

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log('Edited employee details:', editedEmployee);
    setEditedEmployee({ ...editedEmployee });
    setIsEditing(false);
    axios.put("http://localhost:3000/api/employees/" + employee._id, editedEmployee)
      .then((response) => console.log(response))
      .then(() => window.location.reload());
  };

  const handleDelete = () => {
    setEditedEmployee({ ...employee });
    setIsEditing(false);
    console.log('Deleted employee:', editedEmployee);
    axios.delete("http://localhost:3000/api/employees/" + employee._id)
      .then((response) => console.log(response))
      .then(() => window.location.reload());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  return (
    <div className="employee-card">
      <img src="https://cdn3d.iconscout.com/3d/premium/thumb/employee-4722980-3930446.png?f=webp" alt="" className="employee-image" height="140" />
      <div className="employee-details">
        {isEditing ? (
          <>
            <input type="text" name="name" value={editedEmployee.name} onChange={handleChange} className="employee-input" />
            <input type="text" name="employeeID" value={editedEmployee.employeeID} onChange={handleChange} className="employee-input" />
            <input type="text" name="mobile" value={editedEmployee.mobile} onChange={handleChange} className="employee-input" />
            <select id="employeeType" name="employeeType" onChange={handleChange}>
                <option disabled value="">Select Employee Type</option>
                <option value="Driver">Driver</option>
                <option value="Conductor">Conductor</option>
            </select>
            <button type="button" className="btn btn-primary" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <h2 className="employee-name">{editedEmployee.name}</h2>
            <p className="employee-Description">{editedEmployee.employeeID}<br />{editedEmployee.mobile}<br />{editedEmployee.employeeType}</p>
            <div className="button-container">
              <button type="button" className="btn btn-primary btn-update" style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleUpdate}>Update</button>
              <button type="button" className="btn btn-danger btn-delete" style={{ backgroundColor: 'red', color: 'white' }} onClick={handleDelete}>Delete</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeCard;
