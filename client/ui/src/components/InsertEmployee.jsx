import React, { useState } from 'react';
import axios from 'axios';

const InsertEmployee = () => {
    const [EmployeeData, setEmployeedata] = useState({
        employeeID: '',
        name: '',
        mobile: '',
        employeeType: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeedata({
            ...EmployeeData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!EmployeeData.employeeID || !EmployeeData.name || !EmployeeData.mobile || !EmployeeData.employeeType) {
            alert('Please fill in all fields');
            return;
        }

        if (window.confirm('Are you sure you want to add this employee?')) {
            axios.post('http://localhost:3000/api/employees/', EmployeeData).then(() => {
                setEmployeedata({
                    employeeID: '',
                    name: '',
                    mobile: '',
                    employeeType: '',
                });
                window.location.href = '/employees'; // Redirect to the home page
            });
        }
    };

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel?')) {
            window.location.href = '/employees'; // Redirect to the home page
        }
    };

    return (
        <div className="form-container">
            <h2 style={{ textAlign: 'center' }}>Employee Information Form</h2>
            <form id="employeeForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="employeeID">Employee ID:</label>
                    <input type="text" id="employeeID" name="employeeID" onChange={handleChange} value={EmployeeData.employeeID} className="form-control" required />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" onChange={handleChange} value={EmployeeData.name} className="form-control" required />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile:</label>
                    <input type="text" id="mobile" name="mobile" onChange={handleChange} value={EmployeeData.mobile} className="form-control" required />
                </div>
                <div className="form-group">
                    <label htmlFor="employeeType">Employee Type:</label>
                    <select id="employeeType" name="employeeType" onChange={handleChange} value={EmployeeData.employeeType} className="form-control" required>
                        <option value="">Select Employee Type</option>
                        <option value="Driver">Driver</option>
                        <option value="Conductor">Conductor</option>
                    </select>
                </div>
                <div className="form-group" style={{ textAlign: 'center' }}>
                    <button type="submit" className="btn btn-primary mr-2" style={{ backgroundColor: 'green', color: 'white' }}>Add</button>
                    <button type="button" onClick={handleCancel} className="btn btn-secondary" style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default InsertEmployee;
