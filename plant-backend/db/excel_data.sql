-- Create the excel_data table
CREATE TABLE IF NOT EXISTS excel_data (
    id SERIAL PRIMARY KEY,
    data JSONB NOT NULL,
    type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on the type column for faster queries
CREATE INDEX IF NOT EXISTS idx_excel_data_type ON excel_data(type);

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_excel_data_updated_at
    BEFORE UPDATE ON excel_data
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 