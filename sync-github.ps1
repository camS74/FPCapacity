# GitHub Synchronization Script for FP Capacity Project

# Configuration
$GITHUB_REPO = "https://github.com/camS74/FPCapacity.git"
$BRANCH = "main"

# Function to check if Git is installed
function Test-GitInstalled {
    try {
        git --version | Out-Null
        return $true
    }
    catch {
        Write-Host "Git is not installed. Please install Git first." -ForegroundColor Red
        return $false
    }
}

# Function to check if repository is initialized
function Test-GitRepo {
    if (Test-Path .git) {
        return $true
    }
    return $false
}

# Function to initialize Git repository
function Initialize-GitRepo {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    git remote add origin $GITHUB_REPO
}

# Function to add and commit changes
function Add-CommitChanges {
    Write-Host "Adding all files to Git..." -ForegroundColor Yellow
    git add .
    
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $commitMessage = "Update: $timestamp"
    
    Write-Host "Committing changes..." -ForegroundColor Yellow
    git commit -m $commitMessage
}

# Function to push changes to GitHub
function Push-ToGitHub {
    Write-Host "Pushing changes to GitHub..." -ForegroundColor Yellow
    git push -u origin $BRANCH
}

# Main execution
try {
    # Check if Git is installed
    if (-not (Test-GitInstalled)) {
        exit 1
    }

    # Check if repository is initialized
    if (-not (Test-GitRepo)) {
        Initialize-GitRepo
    }

    # Add and commit changes
    Add-CommitChanges

    # Push to GitHub
    Push-ToGitHub

    Write-Host "`nSynchronization completed successfully!" -ForegroundColor Green
}
catch {
    Write-Host "`nAn error occurred during synchronization:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
} 