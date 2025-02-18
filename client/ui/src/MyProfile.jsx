import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import './App.css';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
  },
});

function MyProfile() {
    const { id } = useParams(); // Extract the user ID from the URL
    const [name, setName] = useState(''); // Initialize name state variable
    const [email, setEmail] = useState(''); // Initialize email state variable
    const [mNo, setMNo] = useState(''); // Initialize mNo state variable
    const [errorMessage, setErrorMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false); // State variable to track if user is editing profile
    const [newName, setNewName] = useState(''); // State variable to hold new name value
    const [newMNo, setNewMNo] = useState(''); // State variable to hold new mobile number value

    // useEffect to fetch user profile data
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Make a GET request to fetch user details
                const response = await axios.get(`http://localhost:3000/api/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                // Check if request was successful
                if (response.data.success) {
                    // Update state variables with received data
                    const { name, email, mNo } = response.data.user;
                    setName(name);
                    setEmail(email);
                    setMNo(mNo);
                } else {
                    // Show error message if request failed
                    setErrorMessage(response.data.msg);
                }
            } catch (error) {
                console.error("Error:", error);
                // Show generic error message if request failed
                setErrorMessage('An error occurred. Please try again later.');
            }
        };

        // Fetch user profile data when component mounts
        fetchUserProfile();
    }, [id]); // Fetch user profile whenever the user ID changes

    // Function to handle logout
    const handleLogout = () => {
        // Redirect to the specified route
        window.location.href = '/';
    };

    // Function to enable editing mode
    const handleEdit = () => {
        setIsEditing(true);
        setNewName(name);
        setNewMNo(mNo);
    };

    // Function to cancel editing
    const handleCancel = () => {
        setIsEditing(false);
    };

    // Function to submit edited profile
    const handleSubmit = async () => {
        try {
            // Make a PUT request to update user details
            await axios.put(`http://localhost:3000/api/users/${id}`, {
                name: newName,
                mNo: newMNo
            });
            // Update name and mobile number with new values
            setName(newName);
            setMNo(newMNo);
            // Disable editing mode
            setIsEditing(false);
        } catch (error) {
            console.error("Error:", error);
            // Show error message if update failed
            setErrorMessage('Update failed. Please try again later.');
        }
    };

    // Function to handle user deletion
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            try {
                // Make a DELETE request to delete user account
                await axios.delete(`http://localhost:3000/api/users/${id}`);
                // Redirect to the specified route
                window.location.href = '/';
            } catch (error) {
                console.error("Error:", error);
                // Show error message if deletion failed
                setErrorMessage('Deletion failed. Please try again later.');
            }
        }
    };

    // Render the PDF document for download
    const UserPDFDocument = () => (
        <Document>
            <Page style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Name:</Text>
                    <Text style={styles.text}>{name}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Email:</Text>
                    <Text style={styles.text}>{email}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Phone Number:</Text>
                    <Text style={styles.text}>{mNo}</Text>
                </View>
            </Page>
        </Document>
    );

    return (
        <div className="grid-container">
            <div className="bg-dark py-5">
                <div className="container-lg">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card bg-dark text-white">
                                {errorMessage && (
                                    <div className="alert alert-danger" role="alert">
                                        {errorMessage}
                                    </div>
                                )}
                                <div className="card-body text-center">
                                    <h5 className="card-title mb-4 fs-3">My Profile</h5>
                                    <img src="/profile-picture.jpg" alt="Profile" className="img-fluid mb-3" />
                                    <div className="rounded bg-primary p-3 mb-4">
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={newName}
                                                onChange={(e) => setNewName(e.target.value)}
                                            />
                                        ) : (
                                            <p className="card-text fs-5 text-white">Name: {name}</p>
                                        )}
                                    </div>
                                    <div className="rounded bg-secondary p-3 mb-4">
                                        <p className="card-text fs-5 text-white">Email: {email}</p>
                                    </div>
                                    <div className="rounded bg-info p-3 mb-5">
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={newMNo}
                                                onChange={(e) => setNewMNo(e.target.value)}
                                            />
                                        ) : (
                                            <p className="card-text fs-5 text-white">Phone Number: {mNo}</p>
                                        )}
                                    </div>
                                    <div className="d-grid gap-2">
                                        {isEditing ? (
                                            <>
                                                <button className="btn btn-secondary btn-sm" onClick={handleCancel} style={{ backgroundColor: 'grey', color: 'white' }}>Cancel</button>
                                                <button className="btn btn-primary btn-sm" onClick={handleSubmit} style={{ backgroundColor: 'blue', color: 'white' }}>Submit</button>
                                            </>
                                        ) : (
                                            <button className="btn btn-primary btn-sm" onClick={handleEdit} style={{ backgroundColor: 'blue', color: 'white' }}>Edit Profile</button>
                                        )}
                                        <button className="btn btn-danger btn-sm" onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white' }}>Logout</button>
                                        <button className="btn btn-warning btn-sm" onClick={handleDelete} style={{ backgroundColor: 'orange', color: 'white' }}>Delete User</button>
                                        <PDFDownloadLink
                                            document={<UserPDFDocument />}
                                            fileName={`${name}_profile.pdf`}
                                            className="btn btn-success btn-sm"
                                            style={{ textDecoration: 'none' }}>
                                            {({ loading }) => loading ? 'Loading...' : 'Download Profile as PDF'}
                                        </PDFDownloadLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;
