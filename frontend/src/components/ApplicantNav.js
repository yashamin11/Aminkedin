import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ApplicantNavbar extends Component {

  render() {
    return (
      <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand"> Aminkedin</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/searchjob" className="nav-link">Search</Link>
          </li>
          <li className="navbar-item">
          <Link to="/myapplications" className="nav-link">My Applications</Link>
          </li>
          <li className="navbar-item">
          <Link to="/applicantprofile" className="nav-link">Profile</Link>
          </li>
          {/* <li className="navbar-item">
          <Link to="/orders" className="nav-link">View orders</Link>
          </li>
          <li className="navbar-item">
          <Link to="/product-review" className="nav-link">Review order</Link>
          </li>
          <li className="navbar-item">
          <Link to="/vendor-review" className="nav-link">Rate Vendor</Link>
          </li> */}
          <li className="navbar-item">
          <Link className="nav-link" to="/" onClick={() => {
            localStorage.clear();
            window.location.href = "/"; }}>Logout</Link>
          </li>
        </ul>
        </div>
      </nav>
     </div>
    );
  }
}