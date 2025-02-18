// BusTicketCard.jsx

import React from 'react';


const BusCards = ({buscard}) => {
  return (
    
    <div className="card mb-3" style={{ width: '250px',height:'250px', background: '#697a8a', border: '1px solid #697a8a', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
    <div className="row g-0">
      <div className="col-md-10">
        <div className="card-body">
          <h5  style={{color:'#fff'}} >----</h5>
          
          <p className="card-text"  style={{color:'#fff'}}>Time : {buscard.time}</p>
          <div className="d-flex justify-content-between align-items-center">
            <a href="./form" className="btn btn-primary" style={{ margin: '5px', fontFamily: 'Arial', textDecoration: 'none', color: '#fff', background: '#007bff', border: '1px solid #fff', borderRadius: '10px', padding: '8px 16px' }}>Book a seat</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  );
};


export default BusCards;
