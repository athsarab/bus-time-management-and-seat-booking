import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    
    <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Sun City</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/buslist">Home</a>
          </li>
          
         
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Buy Tickets
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/buslist">available Buses</a></li>
              <li><a class="dropdown-item" href="/form">Book Seat</a></li>
              <li><hr class="dropdown-divider"></hr></li>
              <li><a class="dropdown-item" href="/read">My Reservations</a></li>
            </ul>
            
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Add Luggages
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/insert">Register Luggages</a></li>
              <li><a class="dropdown-item" href="/luggage">View Luggages</a></li>
              
            </ul>
            
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Reviews
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/AddReview">Add Reviews</a></li>
              <li><a class="dropdown-item" href="/ViewReview">View Reviews</a></li>
            </ul>
            
          </li>


          <li class="nav-item">
            <a class="nav-link" href="#">View Profile</a>
          </li>
          
        </ul>
        <li class="nav-item">
            <a class="nav-link" href="/">Log Out</a>
          </li>
      </div>
    </div>
  </nav>
 
    
  )
}

export default Navbar
