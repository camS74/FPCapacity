const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '..', 'db', 'plant.db'));

// Get all processes
router.get('/', (req, res) => {
  db.all('SELECT * FROM processes', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get a single process
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM processes WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Process not found' });
      return;
    }
    res.json(row);
  });
});

// Create a new process
router.post('/', (req, res) => {
  const { name, description, machineId, productId, duration, status } = req.body;
  const sql = 'INSERT INTO processes (name, description, machineId, productId, duration, status) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.run(sql, [name, description, machineId, productId, duration, status], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      id: this.lastID,
      name,
      description,
      machineId,
      productId,
      duration,
      status,
    });
  });
});

// Update a process
router.put('/:id', (req, res) => {
  const { name, description, machineId, productId, duration, status } = req.body;
  const sql = 'UPDATE processes SET name = ?, description = ?, machineId = ?, productId = ?, duration = ?, status = ? WHERE id = ?';
  
  db.run(sql, [name, description, machineId, productId, duration, status, req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Process not found' });
      return;
    }
    res.json({
      id: req.params.id,
      name,
      description,
      machineId,
      productId,
      duration,
      status,
    });
  });
});

// Delete a process
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM processes WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Process not found' });
      return;
    }
    res.json({ message: 'Process deleted successfully' });
  });
});

module.exports = router;