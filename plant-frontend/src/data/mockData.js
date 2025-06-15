// Mock data for development until backend is connected
export const mockRawMaterials = [
  { id: 1, type: 'Substrate', name: 'Aluminium Foil', solid: 100, density: 2.71 },
  { id: 2, type: 'Substrate', name: 'BOPA Transparent', solid: 100, density: 1.15 },
  { id: 3, type: 'Substrate', name: 'BOPP Transparent', solid: 100, density: 0.91 },
  { id: 4, type: 'Substrate', name: 'BOPP Metalized', solid: 100, density: 0.91 },
  { id: 5, type: 'Substrate', name: 'CPP Transparent', solid: 100, density: 0.91 },
  { id: 6, type: 'Substrate', name: 'CPP Metalized', solid: 100, density: 0.91 },
  { id: 7, type: 'Substrate', name: 'BOPP Voided', solid: 100, density: 0.62 },
  { id: 8, type: 'Substrate', name: 'BOPP Pearlized', solid: 100, density: 0.7 },
  { id: 9, type: 'Substrate', name: 'LDPE Transparent', solid: 100, density: 0.92 },
  { id: 10, type: 'Substrate', name: 'LDPE White', solid: 100, density: 0.93 },
  { id: 11, type: 'Substrate', name: 'Paper', solid: 100, density: 1.0 },
  { id: 12, type: 'Substrate', name: 'PET Transparent', solid: 100, density: 1.4 },
  { id: 13, type: 'Substrate', name: 'PET Metalized', solid: 100, density: 1.4 },
  { id: 14, type: 'Substrate', name: 'PET Shrink', solid: 100, density: 1.32 },
  { id: 15, type: 'Substrate', name: 'PVC Shrink', solid: 100, density: 1.35 },
];

// Mock data for machines
export const mockMachines = [
  {
    id: 1,
    name: "CNC Mill",
    description: "Computer Numerical Control milling machine",
    status: "active",
    capacity: 100,
    created_at: "2024-03-14T10:00:00Z",
    updated_at: "2024-03-14T10:00:00Z"
  },
  {
    id: 2,
    name: "Lathe",
    description: "Precision lathe for metal working",
    status: "active",
    capacity: 80,
    created_at: "2024-03-14T10:00:00Z",
    updated_at: "2024-03-14T10:00:00Z"
  }
];

// Mock data for products
export const mockProducts = [
  {
    id: 1,
    name: "Steel Bracket",
    description: "Heavy-duty steel mounting bracket",
    unit: "piece",
    price: 15.99,
    created_at: "2024-03-14T10:00:00Z",
    updated_at: "2024-03-14T10:00:00Z"
  },
  {
    id: 2,
    name: "Aluminum Frame",
    description: "Lightweight aluminum support frame",
    unit: "piece",
    price: 25.50,
    created_at: "2024-03-14T10:00:00Z",
    updated_at: "2024-03-14T10:00:00Z"
  }
]; 