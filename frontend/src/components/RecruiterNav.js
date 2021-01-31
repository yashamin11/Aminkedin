import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class RecruiterNavbar extends Component {

  render() {

    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Aminkedin</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
           <li className="navbar-item">
          <Link to="/add-job" className="nav-link">Add Job</Link>
          </li>         
          <li className="navbar-item">
          <Link to="/joblistings" className="nav-link">View Job listings</Link>
          </li>
          <li className="navbar-item">
          <Link to="/recruiterprofile" className="nav-link">Profile</Link>
          </li>
          <li className="navbar-item">
          <Link to="/ac" className="nav-link">Accepted Applications</Link>
          </li>
          <li className="navbar-item">
          <Link className="nav-link" to="/" onClick={() => {
            localStorage.clear();
            window.location.href = "/"; }}>Logout</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}