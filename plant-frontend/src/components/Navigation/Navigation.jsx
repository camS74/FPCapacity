import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="nav">
      <NavLink 
        to="/" 
        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
      >
        Dashboard
      </NavLink>
      <NavLink 
        to="/machines" 
        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
      >
        Machines
      </NavLink>
      <NavLink 
        to="/products" 
        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
      >
        Products
      </NavLink>
      <NavLink 
        to="/sequences" 
        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
      >
        Sequences
      </NavLink>
      <NavLink 
        to="/masterdata" 
        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
      >
        Masterdata
      </NavLink>
    </nav>
  );
}

export default Navigation; 