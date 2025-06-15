import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './MasterdataPage.css';

function MasterdataPage() {
  return (
    <div className="masterdata-page">
      <h1>Master Data Management</h1>
      <nav className="masterdata-nav">
        <NavLink to="raw-materials" className={({ isActive }) => isActive ? 'active' : ''}>Raw Materials</NavLink>
        {/* Add more links for other masterdata types here */}
      </nav>
      <div className="masterdata-content">
        <Outlet />
      </div>
    </div>
  );
}

export default MasterdataPage; 