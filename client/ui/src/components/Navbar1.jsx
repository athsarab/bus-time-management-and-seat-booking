import React from 'react'
import { Link }  from 'react-router-dom';
import "./Navbar1.css"

const Navbar1 = () => {
  return (
   
      
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <Link class="navbar-brand">Employee Management System</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/employees">Employees</a>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/insertemp">Add Employee</Link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/ContactUS">Contact US</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/">Log Out</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

  );
};

export default Navbar1;
