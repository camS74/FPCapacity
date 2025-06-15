# Get the root directory
$rootDir = "C:\Users\mac\OneDrive\Website\FP Capacity"

# Function to kill processes by port
function Kill-ProcessByPort {
    param($port)
    $processId = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
    if ($processId) {
        Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
        Write-Host "Killed process using port $port" -ForegroundColor Yellow
    }
}

# Kill any existing node processes and processes using our ports
Write-Host "Killing existing processes..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
Kill-ProcessByPort 3001  # Backend port
Kill-ProcessByPort 5173  # Frontend port
Start-Sleep -Seconds 2

# Start the backend server
Write-Host "Starting backend server..." -ForegroundColor Green
$backendPath = Join-Path $rootDir "plant-backend"
try {
    # Install dependencies if needed
    Set-Location $backendPath
    if (-not (Test-Path "node_modules")) {
        Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
        npm install
    }
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; npm run dev"
} catch {
    Write-Host "Error starting backend server: $_" -ForegroundColor Red
    exit 1
}

# Wait for backend to initialize
Start-Sleep -Seconds 5

# Start the frontend server
Write-Host "Starting frontend server..." -ForegroundColor Green
$frontendPath = Join-Path $rootDir "plant-frontend"
try {
    # Install dependencies if needed
    Set-Location $frontendPath
    if (-not (Test-Path "node_modules")) {
        Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
        npm install
        Write-Host "Installing additional required packages..." -ForegroundColor Yellow
        npm install @mui/icons-material @mui/material @emotion/react @emotion/styled recharts @mui/x-data-grid axios react-router-dom
    }
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; npm run dev"
} catch {
    Write-Host "Error starting frontend server: $_" -ForegroundColor Red
    exit 1
}

Write-Host "`nServers have been restarted!" -ForegroundColor Cyan
Write-Host "Backend should be running on http://localhost:3001" -ForegroundColor Cyan
Write-Host "Frontend should be running on http://localhost:5173" -ForegroundColor Cyan 