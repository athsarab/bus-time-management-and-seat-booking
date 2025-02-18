import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Form, Modal, Button } from 'react-bootstrap'; // Add this line

function Register() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [strength, setStrength] = useState(0); // State to store password strength
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/users", {
        name,
        email,
        mNo: phoneNumber,
        password,
        userEntry: 0 // Set default value for userEntry
      });
      console.log(response.data); // Log the response data

      // Set registration success message and redirect to login page after 2 seconds
      setRegistrationSuccess(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      // Handle error here
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // Calculate password strength here (you can use any algorithm)
    const passwordStrength = calculatePasswordStrength(newPassword);
    setStrength(passwordStrength);
  };

  const calculatePasswordStrength = (password) => {
    // Your password strength calculation logic here
    // For simplicity, let's just check the length
    const length = password.length;
    if (length <= 2) return 20;
    else if (length <= 3) return 40;
    else if (length <= 4) return 60;
    else if (length <= 6) return 80;
    else return 100;
  };

  const handleAgreeTerms = (e) => {
    setAgreedToTerms(e.target.checked);
  };

  const handleShowTermsModal = () => {
    setShowTermsModal(true);
  };

  const handleCloseTermsModal = () => {
    setShowTermsModal(false);
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-dark">
      <div className="card p-4 bg-dark text-white" style={{ width: '75%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control bg-dark text-white"
              id="floatingName"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="floatingName">Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="tel"
              className="form-control bg-dark text-white"
              id="floatingPhoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
              pattern="\d{10}" // Must contain exactly 10 digits
              minLength="10" // Minimum length of 10 characters
              maxLength="10" // Maximum length of 10 characters
              required
            />
            <label htmlFor="floatingPhoneNumber">Phone Number</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control bg-dark text-white"
              id="floatingEmail"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              required
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control bg-dark text-white"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              minLength="8"
              required
            />
            <label htmlFor="floatingPassword">Password</label>
            {isPasswordFocused && (
              <div className="progress mt-2">
                <div
                  className={`progress-bar bg-${strength >= 60 ? 'success' : strength >= 40 ? 'warning' : 'danger'}`}
                  role="progressbar"
                  style={{ width: `${strength}%` }}
                  aria-valuenow={strength}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control bg-dark text-white"
              id="floatingConfirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength="8"
              required
            />
            <label htmlFor="floatingConfirmPassword">Confirm Password</label>
          </div>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="I agree to the terms and conditions" onChange={handleAgreeTerms} />
            <Form.Text className="text-muted">
              <a href="#" onClick={handleShowTermsModal}>View Terms and Conditions</a>
            </Form.Text>
          </Form.Group>
          <Modal show={showTermsModal} onHide={handleCloseTermsModal}>
            <Modal.Header closeButton>
              <Modal.Title>Terms and Conditions</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Insert your terms and conditions text here */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseTermsModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <button className="btn btn-primary w-100 mb-3" type="submit">Sign Up</button>
          {registrationSuccess && (
            <div className="alert alert-success" role="alert">
              Registration successful. Redirecting to Sign in page...
            </div>
          )}
          <p className="text-center">Already have an account? <Link to="/" className="text-white">Sign in</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
