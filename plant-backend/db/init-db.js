const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
  // First, connect to postgres to create the database if it doesn't exist
  const postgresPool = new Pool({
    user: 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres', // Use environment variable or default
    host: 'localhost',
    port: 5432,
    database: 'postgres' // Connect to default postgres database
  });

  try {
    // Create the database if it doesn't exist
    await postgresPool.query('CREATE DATABASE flexible_plant');
    console.log('Database created successfully');
  } catch (err) {
    if (err.code === '42P04') { // Database already exists
      console.log('Database already exists');
    } else {
      console.error('Error creating database:', err);
      throw err;
    }
  } finally {
    await postgresPool.end();
  }

  // Now connect to the flexible_plant database
  const pool = new Pool({
    user: 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres', // Use environment variable or default
    host: 'localhost',
    port: 5432,
    database: 'flexible_plant'
  });

  try {
    // Read and execute the schema.sql file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    await pool.query(schemaSQL);
    console.log('Schema loaded successfully');

    // Read and execute the seed.sql file
    const seedPath = path.join(__dirname, '..', 'seed.sql');
    const seedSQL = fs.readFileSync(seedPath, 'utf8');
    await pool.query(seedSQL);
    console.log('Seed data loaded successfully');

  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  } finally {
    await pool.end();
  }
}

// Run the initialization
initializeDatabase().catch(console.error); 