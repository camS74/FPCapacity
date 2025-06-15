const express = require('express');
const router = express.Router();

// Placeholder for sequences routes
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Sequences API is working!' });
});

module.exports = router; 