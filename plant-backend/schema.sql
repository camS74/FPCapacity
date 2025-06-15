CREATE TABLE IF NOT EXISTS process (
  process_id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS machine (
  machine_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  process_id INTEGER REFERENCES process(process_id),
  speed_value NUMERIC,
  speed_unit TEXT,
  max_width NUMERIC,
  efficiency NUMERIC,
  cost_per_hr NUMERIC
);
CREATE TABLE IF NOT EXISTS product (
  product_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  material TEXT,
  density NUMERIC,
  thickness NUMERIC,
  width NUMERIC,
  margin_per_kg NUMERIC,
  demand_volume NUMERIC
);
CREATE TABLE IF NOT EXISTS product_process (
  product_id INTEGER REFERENCES product(product_id),
  step_order INTEGER,
  process_id INTEGER REFERENCES process(process_id),
  PRIMARY KEY(product_id, step_order)
);

-- Create machines table
CREATE TABLE IF NOT EXISTS machines (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  capacity REAL NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  material TEXT NOT NULL,
  thickness REAL NOT NULL,
  width REAL NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create processes table
CREATE TABLE IF NOT EXISTS processes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create product_processes table (junction table for products and processes)
CREATE TABLE IF NOT EXISTS product_processes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  process_id INTEGER NOT NULL,
  machine_id INTEGER NOT NULL,
  sequence INTEGER NOT NULL,
  setup_time REAL NOT NULL,
  run_time REAL NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (process_id) REFERENCES processes(id) ON DELETE CASCADE,
  FOREIGN KEY (machine_id) REFERENCES machines(id) ON DELETE CASCADE
);

-- Create triggers to update timestamps
CREATE TRIGGER IF NOT EXISTS update_machines_timestamp 
AFTER UPDATE ON machines
BEGIN
  UPDATE machines SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_products_timestamp 
AFTER UPDATE ON products
BEGIN
  UPDATE products SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_processes_timestamp 
AFTER UPDATE ON processes
BEGIN
  UPDATE processes SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_product_processes_timestamp 
AFTER UPDATE ON product_processes
BEGIN
  UPDATE product_processes SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;