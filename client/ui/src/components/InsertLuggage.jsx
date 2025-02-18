import React, { useState } from 'react';
import axios from 'axios';

const InsertLuggageForm = () => {
    const [luggageData, setLuggageData] = useState({
        ownerName: "",
        receverName: "",
        ownerPhone: "",
        receverPhone: "",
        ownerEmail: "",
        startLoc: "",
        placeOfDelivery: "",
        weight: "",
        contents: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLuggageData({
            ...luggageData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/api/luggages", luggageData)
            .then(() => {
                setLuggageData({
                    ownerName: "",
                    receverName: "",
                    ownerPhone: "",
                    receverPhone: "",
                    ownerEmail: "",
                    startLoc: "",
                    placeOfDelivery: "",
                    weight: "",
                    contents: "",
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };    

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Delivery Information Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="ownerName" className="form-label">Sender Name:</label>
                    <input type="text" className="form-control" id="ownerName" name="ownerName" onChange={handleChange} value={luggageData.ownerName} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="receverName" className="form-label">Recever Name:</label>
                    <input type="text" className="form-control" id="receverName" name="receverName" onChange={handleChange} value={luggageData.receverName} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="startLoc" className="form-label">Starting Location:</label>
                    <input type="text" className="form-control" id="startLoc" name="startLoc" onChange={handleChange} value={luggageData.startLoc} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="placeOfDelivery" className="form-label">Ending Location:</label>
                    <input type="text" className="form-control" id="placeOfDelivery" name="placeOfDelivery" onChange={handleChange} value={luggageData.placeOfDelivery} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="ownerPhone" className="form-label">Sender Phone Number:</label>
                    <input type="tel" className="form-control" id="ownerPhone" name="ownerPhone" onChange={handleChange} value={luggageData.ownerPhone} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="receverPhone" className="form-label">Recever Phone Number:</label>
                    <input type="tel" className="form-control" id="receverPhone" name="receverPhone" onChange={handleChange} value={luggageData.receverPhone} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="ownerEmail" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="ownerEmail" name="ownerEmail" onChange={handleChange} value={luggageData.ownerEmail} required />
                </div>

               

                <div className="mb-3">
                    <label htmlFor="weight" className="form-label">Weight (kg):</label>
                    <input type="number" className="form-control" id="weight" name="weight" step="0.01" onChange={handleChange} value={luggageData.weight} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="contents" className="form-label">Contents:</label>
                    <textarea className="form-control" id="contents" name="contents" rows="4" onChange={handleChange} value={luggageData.contents} required></textarea>
                </div>

                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default InsertLuggageForm;
