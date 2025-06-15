require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const machines = require('./routes/machines');
const products = require('./routes/products');
const processes = require('./routes/processes');
const steps = require('./routes/productProcess');
const optimize = require('./routes/optimize');
const rawMaterials = require('./routes/rawMaterials');
const aiReferences = require('./routes/aiReferences');
const sequences = require('./routes/sequences');
const capacity = require('./routes/capacity');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/flexible_plant',
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});
app.locals.pool = pool;

app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Backend test route is working!' });
});
// app.use('/api/machines', machines);
// app.use('/api/products', products);
// app.use('/api/processes', processes);
// app.use('/api/product-process', steps);
// app.use('/api/optimize', optimize);
app.use('/api/raw-materials', rawMaterials);
// app.use('/api/ai-references', aiReferences);
// app.use('/api/sequences', sequences);
// app.use('/api/capacity', capacity);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});