import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ViewLuggage = () => {
    const navigate = useNavigate();
    const [luggageData, setLuggageData] = useState({
        luggageID: "",
        ownerName: "",
        ownerPhone: "",
        ownerEmail: "",
        placeOfDelivery: "",
        weight: "",
        height: "",
        length: "",
        width: "",
        contents: ""
    });
    const [Datax, setData] = useState();

    var x;
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:3000/api/luggages/${id}`);
                setLuggageData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLuggageData({
            ...luggageData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(luggageData)
        axios.put("http://localhost:3000/api/luggages" + id , luggageData)
        .then(() => {
           setLuggageData({
             luggageID: "",
             ownerName: "",
             ownerPhone: "",
             ownerEmail: "",
             placeOfDelivery: "",
             weight: "",
             height: "",
             length: "",
             width: "",
             contents: ""
           }); 
        });
        navigate("/");
    };

    const handleCancel = () => {
        if (window.confirm("Are you sure you want to cancel?")) {
            // Redirect to view page
            window.location.href = `/view/${id}`;
        }
    };

    return (
        <div className="form-container">
            <h2>Update Luggage</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="luggageID">Luggage ID:</label>
                    <input disabled type="text" id="luggageID" name="luggageID" required onChange={handleChange} value={Datax?.luggageID} />
                </div>
                <div>
                    <label htmlFor="ownerName">Owner Name:</label>
                    <input type="text" id="ownerName" name="ownerName" value={luggageData.ownerName} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="ownerPhone">Phone Number:</label>
                    <input type="tel" id="ownerPhone" name="ownerPhone" value={luggageData.ownerPhone} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="ownerEmail">Email:</label>
                    <input type="email" id="ownerEmail" name="ownerEmail" value={luggageData.ownerEmail} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="placeOfDelivery">Place of Delivery:</label>
                    <input type="text" id="placeOfDelivery" name="placeOfDelivery" value={luggageData.placeOfDelivery} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="weight">Weight (kg):</label>
                    <input type="number" id="weight" name="weight" step="0.01" value={luggageData.weight} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="length">Length (cm):</label>
                    <input type="number" id="length" name="length" value={luggageData.length} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="height">Height (cm):</label>
                    <input type="number" id="height" name="height" value={luggageData.height} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="width">Width (cm):</label>
                    <input type="number" id="width" name="width" value={luggageData.width} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="contents">Contents:</label>
                    <textarea id="contents" name="contents" rows="4" cols="50" value={luggageData.contents} onChange={handleChange}></textarea>
                </div>
                <div>
                    <button type="submit">Update Luggage</button>
                    <br></br>
                    <br></br>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default ViewLuggage;
