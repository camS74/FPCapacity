const express = require('express');
const router = express.Router();

let rawMaterials = [
  { id: 1, type: 'Substrate', name: 'Aluminium Foil', solid: 100, density: 2.71 },
  { id: 2, type: 'Substrate', name: 'BOPA Transparent', solid: 100, density: 1.15 },
  { id: 3, type: 'Substrate', name: 'BOPP Transparent', solid: 100, density: 0.91 },
  { id: 4, type: 'Substrate', name: 'BOPP Metalized', solid: 100, density: 0.91 },
  { id: 5, type: 'Substrate', name: 'CPP Transparent', solid: 100, density: 0.91 },
  { id: 6, type: 'Substrate', name: 'CPP Metalized', solid: 100, density: 0.91 },
  { id: 7, type: 'Substrate', name: 'BOPP Voided', solid: 100, density: 0.62 },
  { id: 8, type: 'Substrate', name: 'BOPP Pearlized', solid: 100, density: 0.7 },
  { id: 9, type: 'Substrate', name: 'LDPE Transparent', solid: 100, density: 0.92 },
  { id: 10, type: 'Substrate', name: 'LDPE White', solid: 100, density: 0.93 },
  { id: 11, type: 'Substrate', name: 'Paper', solid: 100, density: 1.0 },
  { id: 12, type: 'Substrate', name: 'PET Transparent', solid: 100, density: 1.4 },
  { id: 13, type: 'Substrate', name: 'PET Metalized', solid: 100, density: 1.4 },
  { id: 14, type: 'Substrate', name: 'PET Shrink', solid: 100, density: 1.32 },
  { id: 15, type: 'Substrate', name: 'PVC Shrink', solid: 100, density: 1.35 }
];

// GET all
router.get('/', (req, res) => {
  res.json(rawMaterials);
});

// POST new
router.post('/', (req, res) => {
  const newMaterial = { ...req.body, id: rawMaterials.length + 1 };
  rawMaterials.push(newMaterial);
  res.status(201).json(newMaterial);
});

// PUT update
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = rawMaterials.findIndex(m => m.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  rawMaterials[idx] = { ...rawMaterials[idx], ...req.body };
  res.json(rawMaterials[idx]);
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = rawMaterials.findIndex(m => m.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  rawMaterials.splice(idx, 1);
  res.json({ success: true });
});

module.exports = router; 