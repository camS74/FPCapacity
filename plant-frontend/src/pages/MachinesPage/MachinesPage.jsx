import React, { useState, useEffect } from "react";
import { useMachines } from "../../hooks/useApi";
import "./MachinesPage.css";

function MachinesPage() {
  const { getAll, create } = useMachines();
  const [machines, setMachines] = useState([]);
  const [newMachine, setNewMachine] = useState({
    name: "",
    type: "",
    capacity: "",
    setup_time: "",
    maintenance_interval: "",
    status: "active"
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = () => {
    try {
      const data = getAll();
      setMachines(data);
    } catch (err) {
      setError("Failed to fetch machines");
      console.error("Error fetching machines:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMachine(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      create(newMachine);
      setNewMachine({
        name: "",
        type: "",
        capacity: "",
        setup_time: "",
        maintenance_interval: "",
        status: "active"
      });
      fetchMachines();
    } catch (err) {
      setError("Failed to add machine");
      console.error("Error adding machine:", err);
    }
  };

  return (
    <div className="machines-page">
      <h1>Machines</h1>
      
      <div className="add-machine-section">
        <h2>Add New Machine</h2>
        <form onSubmit={handleSubmit} className="machine-form">
          <div className="form-group">
            <label htmlFor="name">Machine Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newMachine.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <input
              type="text"
              id="type"
              name="type"
              value={newMachine.type}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="capacity">Capacity:</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={newMachine.capacity}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="setup_time">Setup Time (minutes):</label>
            <input
              type="number"
              id="setup_time"
              name="setup_time"
              value={newMachine.setup_time}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="maintenance_interval">Maintenance Interval (days):</label>
            <input
              type="number"
              id="maintenance_interval"
              name="maintenance_interval"
              value={newMachine.maintenance_interval}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">Add Machine</button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="machines-list">
        <h2>Existing Machines</h2>
        <table className="machines-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Setup Time</th>
              <th>Maintenance Interval</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {machines.map((machine) => (
              <tr key={machine.id}>
                <td>{machine.name}</td>
                <td>{machine.type}</td>
                <td>{machine.capacity}</td>
                <td>{machine.setup_time} min</td>
                <td>{machine.maintenance_interval} days</td>
                <td>{machine.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MachinesPage; 