-- Core processes
INSERT INTO process (name) VALUES
  ('Extrusion'),('Printing'),('Rewinding'),('Lamination'),('Coating'),('Slitting')
  ON CONFLICT DO NOTHING;

-- Sample machines
INSERT INTO machine (name, process_id, speed_value, speed_unit, max_width, efficiency, cost_per_hr) VALUES
  ('Extruder-1', 1, 200, 'kg/hr', 1200, 0.85, 150),
  ('Printer-1', 2, 150, 'm/min', 1000, 0.90, 200),
  ('Rewinder-1', 3, 200, 'm/min', 1200, 0.95, 100),
  ('Laminator-1', 4, 100, 'm/min', 1000, 0.85, 180),
  ('Coater-1', 5, 80, 'm/min', 800, 0.80, 160),
  ('Slitter-1', 6, 300, 'm/min', 1200, 0.95, 120)
  ON CONFLICT DO NOTHING;

-- Sample products
INSERT INTO product (name, material, density, thickness, width, margin_per_kg, demand_volume) VALUES
  ('PET-Lam-1', 'PET', 1.4, 12, 1000, 2.5, 50000),
  ('PE-Film-1', 'PE', 0.92, 50, 800, 1.8, 75000),
  ('Alu-Lam-1', 'Aluminum', 2.7, 9, 600, 3.2, 30000)
  ON CONFLICT DO NOTHING;

-- Product process sequences
INSERT INTO product_process (product_id, step_order, process_id) VALUES
  (1, 1, 1), -- PET-Lam-1: Extrusion
  (1, 2, 2), -- PET-Lam-1: Printing
  (1, 3, 4), -- PET-Lam-1: Lamination
  (1, 4, 6), -- PET-Lam-1: Slitting
  (2, 1, 1), -- PE-Film-1: Extrusion
  (2, 2, 3), -- PE-Film-1: Rewinding
  (2, 3, 6), -- PE-Film-1: Slitting
  (3, 1, 4), -- Alu-Lam-1: Lamination
  (3, 2, 2), -- Alu-Lam-1: Printing
  (3, 3, 6)  -- Alu-Lam-1: Slitting
  ON CONFLICT DO NOTHING;

-- Insert sample machines
INSERT INTO machines (name, type, status, capacity) VALUES
('Extruder-1', 'Extruder', 'Active', 1000),
('Extruder-2', 'Extruder', 'Active', 1200),
('Laminator-1', 'Laminator', 'Active', 800),
('Slitter-1', 'Slitter', 'Active', 1500),
('Slitter-2', 'Slitter', 'Active', 1500);

-- Insert sample products
INSERT INTO products (name, description, material, thickness, width) VALUES
('PET Film', 'Clear PET film for packaging', 'PET', 0.012, 1000),
('PE Film', 'Polyethylene film for bags', 'PE', 0.015, 1200),
('Aluminum Foil', 'Aluminum foil for food packaging', 'Aluminum', 0.009, 800),
('BOPP Film', 'Biaxially oriented polypropylene film', 'BOPP', 0.020, 1000);

-- Insert sample processes
INSERT INTO processes (name, description) VALUES
('Extrusion', 'Film extrusion process'),
('Lamination', 'Film lamination process'),
('Slitting', 'Film slitting process'),
('Printing', 'Film printing process');

-- Insert sample product_processes
INSERT INTO product_processes (product_id, process_id, machine_id, sequence, setup_time, run_time) VALUES
(1, 1, 1, 1, 30, 0.5),  -- PET Film -> Extrusion
(1, 3, 4, 2, 15, 0.3),  -- PET Film -> Slitting
(2, 1, 2, 1, 30, 0.6),  -- PE Film -> Extrusion
(2, 3, 5, 2, 15, 0.4),  -- PE Film -> Slitting
(3, 2, 3, 1, 45, 0.7),  -- Aluminum Foil -> Lamination
(3, 3, 4, 2, 20, 0.5),  -- Aluminum Foil -> Slitting
(4, 1, 1, 1, 35, 0.5),  -- BOPP Film -> Extrusion
(4, 2, 3, 2, 40, 0.6),  -- BOPP Film -> Lamination
(4, 3, 5, 3, 15, 0.4);  -- BOPP Film -> Slitting