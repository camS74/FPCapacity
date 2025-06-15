const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '..', 'db', 'plant.db'));

// Get all products
router.get('/', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get a single product
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(row);
  });
});

// Create a new product
router.post('/', (req, res) => {
  const { name, description, category, price, status } = req.body;
  const sql = 'INSERT INTO products (name, description, category, price, status) VALUES (?, ?, ?, ?, ?)';
  
  db.run(sql, [name, description, category, price, status], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      id: this.lastID,
      name,
      description,
      category,
      price,
      status,
    });
  });
});

// Update a product
router.put('/:id', (req, res) => {
  const { name, description, category, price, status } = req.body;
  const sql = 'UPDATE products SET name = ?, description = ?, category = ?, price = ?, status = ? WHERE id = ?';
  
  db.run(sql, [name, description, category, price, status, req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json({
      id: req.params.id,
      name,
      description,
      category,
      price,
      status,
    });
  });
});

// Delete a product
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM products WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json({ message: 'Product deleted successfully' });
  });
});

module.exports = router;