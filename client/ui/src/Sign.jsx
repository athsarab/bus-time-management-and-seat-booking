import React, { useState } from 'react';
import './App.css';
import axios from "axios";
import { Link } from 'react-router-dom';

function Sign() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userId, setUserId] = useState('');
  const [userEntry, setUserEntry] = useState(0); // Default user entry type is 0

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValid(e.target.value.includes('@'));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the login route
      const response = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password
      });

      // Check if login was successful
      if (response.data.success) {
        // Display login success message
        setLoginSuccess(true);

        // Set user ID
        setUserId(response.data._id);

        // Set user entry type if available
        if (response.data.userEntry !== undefined) {
          setUserEntry(response.data.userEntry);
        }
        return; // Exit the function after setting user ID and entry type
      }
      // Show error message if user data is missing or login was unsuccessful
      setErrorMessage(response.data.msg || 'User data is missing.');
    } catch (error) {
      console.error("Error:", error);
      // Show generic error message
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-dark">
      <div className="card p-4 bg-dark text-white" style={{ width: '75%', maxWidth: '300px' }}>
        <div className="text-center mb-4">
          <img src="./public/icon.svg" alt="Icon" width="100" />
          <h2 className="mt-3">Welcome to Suncity Highway Express!</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className={`form-control bg-dark text-white ${!emailValid ? 'is-invalid' : ''}`}
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={handleEmailChange}
            />
            <label htmlFor="floatingInput">Email address</label>
            {!emailValid && (
              <div className="invalid-feedback">
                Please enter a valid email address.
              </div>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control bg-dark text-white"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          {loginSuccess && (
            <div>
              <p className="alert alert-success" role="alert">Login successful!</p>
              {userEntry === 0 && (
                <>
                  <Link to={`/MyProfile/${userId}`} className="btn btn-primary w-100 mb-3">Go to My Profile</Link>
                  <p className="text-center text-white mb-3">OR</p>
                  <Link to="/buslist" className="btn btn-secondary w-100 mb-3">Go to Home Page</Link>
                </>
              )}
              {userEntry === 1 && (
                <Link to="/Report" className="btn btn-primary w-100 mb-3">Go to Reports</Link>
              )}
              {userEntry === 2 && (
                <Link to="/employees" className="btn btn-primary w-100 mb-3">Go to Employees</Link>
              )}
              {userEntry === 3 && (
                <Link to="/AddPackage" className="btn btn-primary w-100 mb-3">Go to Packages</Link>
              )}
              {userEntry === 4 && (
                <Link to="/schedule" className="btn btn-primary w-100 mb-3">Go to Schedule</Link>
              )}
            </div>
          )}
          {!loginSuccess && (
            <button className="btn btn-primary w-100 mb-3" type="submit">Sign in</button>
          )}
          <p className="text-center">Don't have an account? <Link to="/Register" className="text-white">Sign up</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Sign;
