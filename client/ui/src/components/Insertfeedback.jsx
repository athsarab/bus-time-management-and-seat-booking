import React from 'react';

const Insertfeedback = () => {
  return (
    <div>
      <h2>Feedback Form</h2>
      <form action="#" method="post">
        <label for="customerID" className="form-label">Customer ID:</label>
        <input type="text" id="customerID" name="customerID" className="form-input" placeholder="Enter Customer ID" required />
        
        <label for="customerName" className="form-label">Customer Name:</label>
        <input type="text" id="customerName" name="customerName" className="form-input" placeholder="Enter Customer Name" required />
        
        <label for="feedbackID" className="form-label">Feedback ID:</label>
        <input type="text" id="feedbackID" name="feedbackID" className="form-input" placeholder="Enter Feedback ID" required />
        
        <label for="feedback" className="form-label">Feedback:</label>
        <textarea id="feedback" name="feedback" className="form-input" placeholder="Enter Feedback" rows="4" required></textarea>
        
        <button type="submit" className="form-submit">Submit</button>
      </form>
      </div>
  );
}

export default Insertfeedback;

