# Function to download file
function Download-File {
    param (
        [string]$Url,
        [string]$OutFile
    )
    Write-Host "Downloading $Url to $OutFile..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri $Url -OutFile $OutFile
}

# Create temp directory
$tempDir = ".\temp"
if (-not (Test-Path $tempDir)) {
    New-Item -ItemType Directory -Path $tempDir
}

# Download Node.js installer
$nodeUrl = "https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi"
$nodeInstaller = "$tempDir\node-installer.msi"
Download-File -Url $nodeUrl -OutFile $nodeInstaller

# Download PostgreSQL installer
$pgUrl = "https://get.enterprisedb.com/postgresql/postgresql-16.2-1-windows-x64.exe"
$pgInstaller = "$tempDir\postgresql-installer.exe"
Download-File -Url $pgUrl -OutFile $pgInstaller

Write-Host "`nInstallation files downloaded to $tempDir" -ForegroundColor Green
Write-Host "`nPlease install the following:" -ForegroundColor Yellow
Write-Host "1. Node.js: $nodeInstaller" -ForegroundColor Cyan
Write-Host "2. PostgreSQL: $pgInstaller" -ForegroundColor Cyan
Write-Host "`nAfter installing both, run setup.ps1 to complete the setup." -ForegroundColor Green

# Open the temp directory
explorer $tempDir 