import React from 'react';
import './DashboardPage.css';

function DashboardPage() {
  const handleOptimize = () => {
    console.log('Running optimization...');
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome to FP Capacity - Production Optimization</p>
    </div>
  );
}

export default DashboardPage; 