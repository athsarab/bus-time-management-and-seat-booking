import React from 'react';
import './style.css';

const EmployeeData = ({ employee }) => {
  const { name, position, email, imageUrl } = employee;

  return (
    <div className="employee-card">
      <img src={imageUrl} alt={name} className="employee-image" />
      <div className="employee-details">
        <h2 className="employee-name">{name}</h2>
        <p className="employee-position">{position}</p>
        <p className="employee-email">{email}</p>
      </div>
    </div>
  );
}

export default EmployeeData;
