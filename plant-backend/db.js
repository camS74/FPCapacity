const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'fp_capacity',
  password: 'postgres',
  port: 5432,
});

module.exports = pool; 