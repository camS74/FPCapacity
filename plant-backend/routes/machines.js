const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '..', 'db', 'plant.db'));

// Get all machines
router.get('/', (req, res) => {
  db.all('SELECT * FROM machines', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get a single machine
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM machines WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Machine not found' });
      return;
    }
    res.json(row);
  });
});

// Create a new machine
router.post('/', (req, res) => {
  const { name, type, capacity, status } = req.body;
  const sql = 'INSERT INTO machines (name, type, capacity, status) VALUES (?, ?, ?, ?)';
  
  db.run(sql, [name, type, capacity, status], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      id: this.lastID,
      name,
      type,
      capacity,
      status,
    });
  });
});

// Update a machine
router.put('/:id', (req, res) => {
  const { name, type, capacity, status } = req.body;
  const sql = 'UPDATE machines SET name = ?, type = ?, capacity = ?, status = ? WHERE id = ?';
  
  db.run(sql, [name, type, capacity, status, req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Machine not found' });
      return;
    }
    res.json({
      id: req.params.id,
      name,
      type,
      capacity,
      status,
    });
  });
});

// Delete a machine
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM machines WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Machine not found' });
      return;
    }
    res.json({ message: 'Machine deleted successfully' });
  });
});

module.exports = router;