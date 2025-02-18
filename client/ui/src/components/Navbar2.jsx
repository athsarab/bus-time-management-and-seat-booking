import React from 'react'
import "./Navbar1.css"
import { Link }  from 'react-router-dom';

const Navbar2 = () => {
  return (
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <Link class="navbar-brand">Package Management</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link class="nav-link" to="/AddPackage">Add Packages</Link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/ViewPackage">View Packages</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/">Log Out</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar2
