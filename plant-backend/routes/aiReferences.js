const express = require('express');
const router = express.Router();

// In-memory AI references
let aiReferences = [];

// Get all references
router.get('/', (req, res) => {
  res.json(aiReferences);
});

// Add a new reference
router.post('/', (req, res) => {
  const { title, description, link } = req.body;
  const id = aiReferences.length ? aiReferences[aiReferences.length - 1].id + 1 : 1;
  const newRef = { id, title, description, link };
  aiReferences.push(newRef);
  res.status(201).json(newRef);
});

module.exports = router; 