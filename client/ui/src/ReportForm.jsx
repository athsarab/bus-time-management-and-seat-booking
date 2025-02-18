import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const ReportForm = () => {
  const [busNo, setBusNo] = useState('');
  const [date, setDate] = useState('');
  const [reservedIncome, setReservedIncome] = useState('');
  const [frequencyOfTrips, setFrequencyOfTrips] = useState('');
  const [dailyIncome, setDailyIncome] = useState('');
  const [description, setDescription] = useState('');
  const [amountCollected, setAmountCollected] = useState('');
  const [confirmCancel, setConfirmCancel] = useState(false);

  const handleCancel = () => {
    setConfirmCancel(true);
  };

  const handleConfirmCancel = () => {
    setConfirmCancel(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/ReportRoutes', {
        busNo,
        date,
        reservedIncome,
        frequencyOfTrips,
        dailyIncome,
        description,
        amountCollected
      });
      alert('Report generated successfully.');
      // Clear form fields after successful submission
      setBusNo('');
      setDate('');
      setReservedIncome('');
      setFrequencyOfTrips('');
      setDailyIncome('');
      setDescription('');
      setAmountCollected('');
    } catch (error) {
      alert('Failed to generate report.');
      console.error('Error:', error);
    }
  };

  

  return (
    <>
      <div className="grid-container">
        
        <div className="container mt-5">
          <div className="d-flex justify-content-center">
            <div className="form-container" style={{ maxWidth: '500px' }}>
              <h2>Report Form</h2>
              <form className="form-signin" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="busNo" className="form-label">Bus Number</label>
                  <select className="form-select" id="busNo" value={busNo} onChange={(e) => setBusNo(e.target.value)}>
                   
                    
                    <option value="101">101</option>
                    <option value="102">102</option>
                   <option value="103">103</option>
                   <option value="104">104</option>
                   <option value="105">105</option>
                   <option value="106">106</option>
                   <option value="107">107</option>

                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Date</label>
                  <input type="date" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)}required />
                </div>
                <div className="mb-3">
                  <label htmlFor="reservedIncome" className="form-label">Reserved Income</label>
                  <input type="text" className="form-control" id="reservedIncome" value={reservedIncome} onChange={(e) => setReservedIncome(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="frequencyOfTrips" className="form-label">Frequency of Trips</label>
                  <input type="text" className="form-control" id="frequencyOfTrips" value={frequencyOfTrips} onChange={(e) => setFrequencyOfTrips(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="dailyIncome" className="form-label">Daily Income</label>
                  <input type="text" className="form-control" id="dailyIncome" value={dailyIncome} onChange={(e) => setDailyIncome(e.target.value)} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="amountCollected" className="form-label">Amount Collected</label>
                  <input type="text" className="form-control" id="amountCollected" value={amountCollected} onChange={(e) => setAmountCollected(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary me-2">Generate</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                {confirmCancel && (
                  <div className="mt-2">
                    <p>Are you sure you want to cancel?</p>
                    <button type="button" className="btn btn-danger me-2" onClick={handleConfirmCancel}>Yes</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setConfirmCancel(false)}>No</button>
                  </div>
                )}
              </form>
              <div className="mt-3">
                <Link to="/financial-report" className="btn btn-primary">View Generated Reports</Link>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default ReportForm;
