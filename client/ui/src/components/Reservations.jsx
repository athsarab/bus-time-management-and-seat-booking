import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Reservations = ({reservation, id }) => {
  const navigate = useNavigate();
  const handleCancelReservation = () => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      // Handle cancellation logic here, for example, you can call a function passed as a prop to handle cancellation
      deleteReservation(id);
      console.log('User clicked OK');
    } else {
      // Handle if the user cancels the cancellation
      console.log('User clicked Cancel');
    }
  };
 
  const deleteReservation = (id) => {
  axios.delete("http://localhost:3000/api/books/"+id).then((response)=>console.log(response)).catch((err)=>console.error(err))
  window.location.reload();
  }

  return (
    
   
    
    <div className="card mb-3" style={{ maxWidth: '400px', background: '#697a8a', border: '1px solid #697a8a', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
    <div className="row g-0">
      <div className="col-md-10">
        <div className="card-body">
          <h5  style={{color:'#fff'}} >{reservation.startLocation}-{reservation.endLocation}</h5>
          <p className="card-text" style={{color:'#fff'}}>{reservation.seats} Seats</p>
          <p className="card-text"  style={{color:'#fff'}}>Time : {reservation.time}</p>
          <div className="d-flex justify-content-between align-items-center">
            <a onClick={() => navigate(`./updateForm/${id}`)} className="btn btn-primary" style={{ margin: '5px', fontFamily: 'Arial', textDecoration: 'none', color: '#fff', background: '#007bff', border: '1px solid #fff', borderRadius: '10px', padding: '8px 16px' }}>Edit Reservation</a>
            <button onClick={handleCancelReservation} className="btn btn-danger" style={{ margin: '5px', fontFamily: 'Arial', textDecoration: 'none', color: '#fff', background: '#dc3545', border: '1px solid #fff', borderRadius: '10px', padding: '8px 16px' }}>Cancel Reservation</button>
          </div>
        </div>
      </div>
    </div>
  </div>

    
  )
}

export default Reservations
