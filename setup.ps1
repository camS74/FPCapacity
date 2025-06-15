# Check if Node.js is installed
$nodeVersion = node --version 2>$null
if (-not $?) {
    Write-Host "Node.js is not installed. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    Write-Host "After installing Node.js, run this script again." -ForegroundColor Yellow
    exit
}

Write-Host "Node.js is installed: $nodeVersion" -ForegroundColor Green

# Check if PostgreSQL is installed
$pgVersion = psql --version 2>$null
if (-not $?) {
    Write-Host "PostgreSQL is not installed. Please install PostgreSQL from https://www.postgresql.org/download/windows/" -ForegroundColor Red
    Write-Host "After installing PostgreSQL, run this script again." -ForegroundColor Yellow
    exit
}

Write-Host "PostgreSQL is installed: $pgVersion" -ForegroundColor Green

# Create database if it doesn't exist
Write-Host "Creating database..." -ForegroundColor Yellow
createdb plantdb 2>$null
if (-not $?) {
    Write-Host "Database already exists or could not be created." -ForegroundColor Yellow
}

# Load schema and seed data
Write-Host "Loading database schema and seed data..." -ForegroundColor Yellow
psql -d plantdb -f plant-backend/schema.sql
psql -d plantdb -f plant-backend/seed.sql

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location plant-backend
npm install

# Create .env file if it doesn't exist
if (-not (Test-Path .env)) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    Copy-Item .env.example .env
}

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location ../plant-frontend
npm install

# Return to root directory
Set-Location ..

Write-Host "`nSetup completed successfully!" -ForegroundColor Green
Write-Host "`nTo start the application, run:" -ForegroundColor Cyan
Write-Host ".\restart-servers.ps1" -ForegroundColor Cyan 