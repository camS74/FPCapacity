# FP Capacity - Flexible Plant Management System

A comprehensive system for managing manufacturing plants, including machine management, product tracking, process optimization, and production scheduling.

## Features

- Machine Management: Track and manage manufacturing machines
- Product Management: Maintain product catalog and specifications
- Process Management: Define and track manufacturing processes
- Production Optimization: Optimize production schedules and resource utilization
- Real-time Dashboard: Monitor plant performance and metrics

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/camS74/FP-Capacity.git
cd FP-Capacity
```

2. Install backend dependencies:
```bash
cd plant-backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../plant-frontend
npm install
```

4. Initialize the database:
```bash
cd ../plant-backend
sqlite3 db/plant.db < schema.sql
sqlite3 db/plant.db < seed.sql
```

## Running the Application

1. Start the backend server:
```bash
cd plant-backend
npm run dev
```

2. Start the frontend development server:
```bash
cd plant-frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## API Endpoints

### Machines
- GET /api/machines - Get all machines
- GET /api/machines/:id - Get a specific machine
- POST /api/machines - Create a new machine
- PUT /api/machines/:id - Update a machine
- DELETE /api/machines/:id - Delete a machine

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get a specific product
- POST /api/products - Create a new product
- PUT /api/products/:id - Update a product
- DELETE /api/products/:id - Delete a product

### Processes
- GET /api/processes - Get all processes
- GET /api/processes/:id - Get a specific process
- POST /api/processes - Create a new process
- PUT /api/processes/:id - Update a process
- DELETE /api/processes/:id - Delete a process

### Optimization
- POST /api/optimize - Optimize production schedule

## Development

### Project Structure

```
FP-Capacity/
├── plant-frontend/          # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Context providers
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   ├── App.jsx        # Main application component
│   │   └── main.jsx       # Application entry point
├── plant-backend/           # Node.js backend application
│   ├── routes/            # API routes
│   ├── db/                # Database scripts and data
│   ├── data/              # Master data files
│   └── server.js          # Server entry point
└── sync-github.ps1        # GitHub synchronization script
```

## GitHub Synchronization

To synchronize the project with GitHub, use the provided PowerShell script:

```bash
./sync-github.ps1
```

This script will:
1. Initialize a Git repository if not already done
2. Configure Git credentials if needed
3. Add all project files to Git
4. Commit changes with a timestamp
5. Push to the GitHub repository

The script includes confirmation prompts and error handling to ensure a smooth synchronization process.
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.