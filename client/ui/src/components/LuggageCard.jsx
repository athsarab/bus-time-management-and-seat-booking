import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import DownloadLink from "react-download-link";
import { Button, Form, Row, Col } from 'react-bootstrap';
import './luggageCard.css';

const LuggageCard = ({ luggage, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: luggage.ownerName,
    receverName: luggage.receverName,
    ownerPhone: luggage.ownerPhone,
    receverPhone: luggage.receverPhone,
    ownerEmail: luggage.ownerEmail,
    startLoc: luggage.startLoc,
    placeOfDelivery: luggage.placeOfDelivery,
    weight: luggage.weight,
    height: luggage.height,
    length: luggage.length,
    width: luggage.width
  });
  const [showQR, setShowQR] = useState(false);
  const [qrData, setQRData] = useState('');

  const generateQRCode = () => {
    const data = `
    Luggage ID : ${luggage.luggageID}
    Sender Name : ${luggage.ownerName}
    Phone Number : ${luggage.ownerPhone}
    Email : ${luggage.ownerEmail}
    Starting Location : ${luggage.startLoc}
    Ending Location : ${luggage.placeOfDelivery}
    Weight : ${luggage.weight} kg
    Contents : ${luggage.contents}
    Delivery Fee : Rs.${price}.00`;
  
    setQRData(data);
    setShowQR(true);
  };

  const closeQRCode = () => {
    setShowQR(false);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/luggages/${luggage._id}`, formData);
      console.log(`Luggage with ID ${luggage._id} updated successfully`);
      setEditMode(false); // Exit edit mode after successful update
      window.location.reload(); // Reload the page after update
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/luggages/${luggage._id}`);
      onDelete(); // Call the onDelete function passed from the parent component to update the UI
      console.log(`Luggage with ID ${luggage._id} deleted successfully`);
      window.location.reload(); // Reload the page after deletion
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const price = 500 + luggage.weight * 50; // Calculate price based on weight

  return (
    <div className="luggage-card">
      <h2>Luggage Details</h2>
      <p>Sender Name           : {luggage.ownerName}</p>
      <p>Recever Name           : {luggage.receverName}</p>
      <p>Sender Phone Number     : {luggage.ownerPhone}</p>
      <p>Recever Phone Number : {luggage.receverPhone} </p>
      <p>Starting Location : {luggage.startLoc}</p>
      <p>Ending Location: {luggage.placeOfDelivery}</p>
      <p>Contents         : {luggage.contents}</p>
      <p>___________________________________</p>
      {editMode ? (
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Sender Name</Form.Label>
              <Form.Control type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Recever Name</Form.Label>
              <Form.Control type="text" name="receverName" value={formData.receverName} onChange={handleChange} />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Sender Phone Number</Form.Label>
              <Form.Control type="tel" name="ownerPhone" value={formData.ownerPhone} onChange={handleChange} />
            </Form.Group>

          <Form.Group as={Col}>
              <Form.Label>Recever Phone Number</Form.Label>
              <Form.Control type="tel" name="receverPhone" value={formData.receverPhone} onChange={handleChange} />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="ownerEmail" value={formData.ownerEmail} onChange={handleChange} />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Starting Location</Form.Label>
              <Form.Control type="text" name="startLoc" value={formData.startLoc} onChange={handleChange} />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Ending Location</Form.Label>
              <Form.Control type="text" name="placeOfDelivery" value={formData.placeOfDelivery} onChange={handleChange} />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Weight (kg)</Form.Label>
              <Form.Control type="number" name="weight" step="0.01" value={formData.weight} onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Contents</Form.Label>
              <Form.Control type="contents" name="contents" value={formData.contents} onChange={handleChange} />
            </Form.Group>
          </Row>

          <Button variant="primary" onClick={handleUpdate}>Save</Button>
          <Button variant="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
        </Form>
      ) : (
        <>
        <p>Delivery Fee: Rs. {price}</p> {/* Display calculated price */}  
          <div className="button-container">
            <button className="btn" onClick={generateQRCode}>View QR Code</button>
            <br></br>
            <br></br>
            <Button variant="primary" onClick={() => setEditMode(true)}>Edit</Button>
            <br></br>
            <br></br>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </div>
        </>
      )}
      {showQR && (
        <div className="qr-code-container">
          <QRCode value={qrData} />
          <button className="btn" onClick={closeQRCode}>Close QR Code</button>
          <DownloadLink
            label="Download QR Code"
            filename={`QR_Code_${luggage.luggageID}.png`}
            exportFile={() => qrData}
          />
        </div>
      )}
    </div>
  );
};

export default LuggageCard;
