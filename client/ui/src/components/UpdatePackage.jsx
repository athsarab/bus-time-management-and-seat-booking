import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePackage = () => {
    const navigate = useNavigate();
    const [packagesData, setPackagesData] = useState({
        packageID: "",
        name: "",
        price: "",
        time: "",
        description: ""
    });
    const [Datax, setData] = useState();

    var x;
    const { id } = useParams();

    useEffect(()=>{
        function fetchdata() {
            axios.get("http://localhost:3000/api/packages/" + id)
            .then((response)=>{setData(response.data)})
        }  
        fetchdata()
    },[])



    const handleChange = (e) => {
        const { name, value } = e.target;
        setPackagesData({
            ...packagesData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        //e.preventDefault();
        console.log(packagesData)
        axios.put("http://localhost:3000/api/packages/" + id, packagesData).then(() => {
            setPackagesData({
                packageID: "",
                name: "",
                price: "",
                description: "",
            });
        });
        navigate("/");
    };

    return (
        <div className="card-container">
            <div className="card">
                <h2 className="card-title">Package Information Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="PackageID">PackageID:</label>
                        <input
                            disabled
                            type="text"
                            id="PackageID"
                            name="packageID"
                            required
                            onChange={handleChange}
                            value={Datax?.packageID}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            onChange={handleChange}
                            value={packagesData.name}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            min="0"
                            step="0.01"
                            required
                            onChange={handleChange}
                            value={packagesData.price}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            required
                            onChange={handleChange}
                            value={packagesData.description}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Update"
                            className="submit-button"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default UpdatePackage;