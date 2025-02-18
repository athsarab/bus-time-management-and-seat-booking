import React from 'react'
import "./Footer.css"
const Footer = () => {
  return (
   
<footer class="footer">
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <h4>About Sun-City Bus Company</h4>
                <p>"Efficient employee management system tailored for Sun-City bus company, ensuring streamlined operations and enhanced workforce productivity.".</p>
            </div>
            <div class="col-md-4">
                <h4>Useful Links</h4>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Employees</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact Us</a></li>
                </ul>
            </div>
            <div class="col-md-4">
                <h4>Contact Information</h4>
                <p>Address: 123 Sun-City Bus Way, Matara</p>
                <p>Email: info@suncitybus.com</p>
                <p>Phone: 412264450</p>
            </div>
        </div>
    </div>
</footer>

      
  );
};

export default Footer;
