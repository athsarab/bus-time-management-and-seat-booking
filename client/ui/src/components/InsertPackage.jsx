import React, { useState } from 'react';
import axios from 'axios';

const InsertPackage = () => {
    const [packagesData, setPackagesData] = useState({
        packageID: "",
        name: "",
        price: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPackagesData({
            ...packagesData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/api/packages", packagesData)
            .then(() => {
                setPackagesData({
                    packageID: "",
                    name: "",
                    price: "",
                    description: "",
                });
            })
            .catch(error => console.error("Error:", error));
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <h2 className="card-header">Package Information Form</h2>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="PackageID" className="form-label">Package ID:</label>
                            <input type="text" id="PackageID" name="packageID" className="form-control" required onChange={handleChange} value={packagesData.packageID} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <input type="text" id="name" name="name" className="form-control" required onChange={handleChange} value={packagesData.name} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price:</label>
                            <input type="number" id="price" name="price" className="form-control" min="0" step="0.01" required onChange={handleChange} value={packagesData.price} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description:</label>
                            <textarea id="description" name="description" className="form-control" rows="4" required onChange={handleChange} value={packagesData.description}></textarea>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InsertPackage;
