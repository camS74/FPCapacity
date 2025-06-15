-- Create the raw_materials table
CREATE TABLE IF NOT EXISTS raw_materials (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    solid DECIMAL(5,2) NOT NULL,
    density DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on the type column for faster queries
CREATE INDEX IF NOT EXISTS idx_raw_materials_type ON raw_materials(type);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_raw_materials_updated_at
    BEFORE UPDATE ON raw_materials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default raw materials data
INSERT INTO raw_materials (type, name, solid, density) VALUES
    ('Substrate', 'Aluminium Foil', 100, 2.71),
    ('Substrate', 'BOPA Transparent', 100, 1.15),
    ('Substrate', 'BOPP Transparent', 100, 0.91),
    ('Substrate', 'BOPP Metalized', 100, 0.91),
    ('Substrate', 'CPP Transparent', 100, 0.91),
    ('Substrate', 'CPP Metalized', 100, 0.91),
    ('Substrate', 'BOPP Voided', 100, 0.62),
    ('Substrate', 'BOPP Pearlized', 100, 0.7),
    ('Substrate', 'LDPE Transparent', 100, 0.92),
    ('Substrate', 'LDPE White', 100, 0.93),
    ('Substrate', 'Paper', 100, 1.0),
    ('Substrate', 'PET Transparent', 100, 1.4),
    ('Substrate', 'PET Metalized', 100, 1.4),
    ('Substrate', 'PET Shrink', 100, 1.32),
    ('Substrate', 'PVC Shrink', 100, 1.35)
ON CONFLICT (id) DO NOTHING; 