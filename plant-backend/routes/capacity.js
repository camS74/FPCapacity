const express = require('express');
const router = express.Router();

// Placeholder for capacity routes
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Capacity API is working!' });
});

module.exports = router; 