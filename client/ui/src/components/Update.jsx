import React,{ useState, useEffect} from 'react'
import './MyForm.css'; // Import CSS file for styling
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Update = () => {
  const [formData, setFormData] = useState({
    startLocation: '',
    endLocation: '',
    time: '',
    seats: 1,
    package:'',
    SelectedSeats:[],
    
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
      ...formData,
      [name]: value,
  });
};
  
 //const [reservations, setRes] = useState([]);
const {id}  = useParams();



useEffect(()=>{
    axios.get(`http://localhost:3000/api/books/` + id).then((res)=>{

    setFormData(res.data);
        console.log(res.data);

        const preBookedSeats = res.data.SelectedSeats;
        setSeats(seats.map(seat => ({
          ...seat,
          isBooked: preBookedSeats.includes(seat.id)
        })));

    
    })
    .catch(()=>{
    log("Error while getting data")
})
},[id]);

 // State to store packages
 const [packages, setPackages] = useState([]);

 useEffect(() => {
   // Fetch packages from your friend's API or database
   axios.get('http://localhost:3000/api/packages') // Adjust the URL according to your friend's API
     .then(response => {
       setPackages(response.data);
     })
     .catch(error => {
       console.error('Error fetching packages:', error);
     });
 }, []);

const navigate = useNavigate();
const handleUpdate = (e) => {
    e.preventDefault();
    
    axios.put("http://localhost:3000/api/books/"+id, formData).then(() => {
        
    });
    navigate('/read');
};


const [seats, setSeats] = useState(Array.from({ length: 54 }, (_, index) => ({ id: index + 1, isBooked: false })));

const handleSeatClick = (id) => {
    // Toggle the isBooked property of the clicked seat
    setSeats(seats.map(seat => {
        if (seat.id === id) {
            return { ...seat, isBooked: !seat.isBooked };
            
        }
        return seat;
    }));

    // Toggle selected seat numbers
    let selectedSeat = [...formData.SelectedSeats];
    const index = selectedSeat.indexOf(id);
    if (index !== -1) {
        selectedSeat.splice(index, 1);
    } else {
        selectedSeat.push(id);
    }

    
    // Count the number of selected seats
    const selectedSeats = (seats.filter(seat => seat.isBooked).length)+1;

    // Update the form data with the number of selected seats
    setFormData({
        ...formData,
        SelectedSeats: selectedSeat,
        seats: selectedSeat.length, 
    });
};

  const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
    
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
    
        return year + '-' + month + '-' + day;
    };
    
    const [pricePerSeat] = useState(1000); // Assuming the price per seat is 1000

    const totalAmount = pricePerSeat * formData.seats;
    
  return (
    <div>
          <div className="form-container">
            <h2 className="form-heading">Update Reservation</h2>
            <form onSubmit={handleUpdate}>
                <label htmlFor="startLocation" className="form-label">Starting Location:</label>
                <select name="startLocation" id="startLocation"  className="form-select" value={formData.startLocation}  disabled onChange={handleChange}>
                    <option value="">Select starting location</option>
                    <option value="Matara">Matara</option>
                    <option value="Kottawa">Kottawa</option>
                    <option value="Maharagama">Maharagama</option>
                    <option value="Fort">Fort</option>

                </select>

                <label htmlFor="endLocation" className="form-label">End Location:</label>
                <select name="endLocation" id="endLocation"  className="form-select" value={formData.endLocation} disabled onChange={handleChange} >
                    <option value="">Select end location</option>
                    <option value="Matara">Matara</option>
                    <option value="Kottawa">Kottawa</option>
                    <option value="Maharagama">Maharagama</option>
                    <option value="Fort">Fort</option>
                </select>

                <label htmlFor="time" className="form-label">Time :</label>
                <select name="time" id="time" value={formData.time} disabled onChange={handleChange} className="form-select" >
                    <option value="">-Select-</option>
                    <option value="10.30">10.30</option>
                    <option value="13.00">13.00</option>
                    <option value="14.30">14.30</option>
                    <option value="16.00">16.00</option>
                    <option value="18.00">18.00</option>

                    </select>

                <label htmlFor="Date" className="form-label" required>Date:</label>
                <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="form-input" placeholder="Enter date" required min={getCurrentDate()}/>

                
                <label htmlFor="package" className="form-label">Package :</label>
          <select name="package" id="package" value={formData.package} onChange={handleChange} className="form-select" required>
            <option value="">No package</option>
            {packages.map(pkg => (
              <option key={pkg.id} value={pkg.name}>{pkg.name}</option>
            ))}

          </select>

                <label htmlFor="seats" className="form-label">Number of Seats:</label>
                <input type="number" id="seats" name="seats" min="1"  className="form-input" placeholder="Enter number of seats" value={formData.seats} onChange={handleChange} required/>

                <div className="container">
                    
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <h3 className="text-center mb-4">Left Side</h3>
                            <div className="row justify-content-center">
                                {seats.slice(0, 30).map(seat => (
                                    <div
                                        key={seat.id}
                                        className={`seat col-3 mb-4 d-flex justify-content-center align-items-center`}
                                        style={{ width: '130px', height: '80px', margin: '8px',fontSize:"20px", textAlign: 'center', color:"#fff",backgroundColor: seat.isBooked ? '#0a0a0a' : '#636161' }} 
                                        onClick={() => handleSeatClick(seat.id)}
                                      
                                    >
                                        {seat.id}
                                        
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-5">
                            <h3 className="text-center mb-4">Right Side</h3>
                            <div className="row justify-content-center">
                                {seats.slice(30, 50).map(seat => (
                                    <div
                                    key={seat.id}
                                    className={`seat col-3 mb-4 d-flex justify-content-center align-items-center`}
                                    style={{ width: '150px', height: '80px', margin: '8px',fontSize:"20px", textAlign: 'center', color:"#fff",backgroundColor: seat.isBooked ?  '#0a0a0a' : '#636161' }} 
                                    onClick={() => handleSeatClick(seat.id)}
                                  
                                    >
                                        {seat.id}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {seats.slice(50, 54).map(seat => (
                                    <div
                                    key={seat.id}
                                    className={`seat col-3 mb-4 d-flex justify-content-center align-items-center`}
                                    style={{ width: '130px', height: '80px', margin: '8px',fontSize:"20px", textAlign: 'center', color:"#fff",backgroundColor: seat.isBooked ?  '#0a0a0a' : '#636161' }} 
                                    onClick={() => handleSeatClick(seat.id)}
                                  
                                    >
                                        {seat.id}
                                    </div>
                                ))}
                    </div>
                    <input type="hidden" name="SelectedSeats" value={formData.SelectedSeats} onChange={handleChange} required /> 
                </div>

                <label className="form-label total-label">Total Price:</label>
<div className="total-price">
    <span className="price-amount">{totalAmount} LKR</span>
</div>
<br/>

                <input type="submit" value="Update" className="submit-btn" />
            </form>
        </div>
    </div>
  )
}

export default Update
