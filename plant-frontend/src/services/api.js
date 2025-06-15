import { mockRawMaterials, mockMachines, mockProducts } from '../data/mockData';

// API Configuration
const API_BASE_URL = 'http://localhost:3001/api';

// API Endpoints
const ENDPOINTS = {
  MACHINES: '/machines',
  PRODUCTS: '/products',
  RAW_MATERIALS: '/raw-materials',
};

// API Service
const apiService = {
  // Generic request handler
  request(method, url, data) {
    // Use mock data by default
    if (url.startsWith(ENDPOINTS.RAW_MATERIALS)) {
      if (method === 'get') return mockRawMaterials;
      if (method === 'post') return [...mockRawMaterials, { ...data, id: mockRawMaterials.length + 1 }];
      if (method === 'put') return mockRawMaterials.map(m => m.id === data.id ? { ...m, ...data } : m);
      if (method === 'delete') return mockRawMaterials.filter(m => m.id !== data.id);
    }
    if (url.startsWith(ENDPOINTS.MACHINES)) {
      if (method === 'get') return mockMachines;
    }
    if (url.startsWith(ENDPOINTS.PRODUCTS)) {
      if (method === 'get') return mockProducts;
    }
  },

  // Machines endpoints
  machines: {
    getAll: () => apiService.request('get', ENDPOINTS.MACHINES),
    getById: (id) => apiService.request('get', `${ENDPOINTS.MACHINES}/${id}`),
    create: (data) => apiService.request('post', ENDPOINTS.MACHINES, data),
    update: (id, data) => apiService.request('put', `${ENDPOINTS.MACHINES}/${id}`, data),
    delete: (id) => apiService.request('delete', `${ENDPOINTS.MACHINES}/${id}`)
  },

  // Products endpoints
  products: {
    getAll: () => apiService.request('get', ENDPOINTS.PRODUCTS),
    getById: (id) => apiService.request('get', `${ENDPOINTS.PRODUCTS}/${id}`),
    create: (data) => apiService.request('post', ENDPOINTS.PRODUCTS, data),
    update: (id, data) => apiService.request('put', `${ENDPOINTS.PRODUCTS}/${id}`, data),
    delete: (id) => apiService.request('delete', `${ENDPOINTS.PRODUCTS}/${id}`)
  },

  // Raw Materials endpoints
  rawMaterials: {
    getAll: () => apiService.request('get', ENDPOINTS.RAW_MATERIALS),
    getById: (id) => apiService.request('get', `${ENDPOINTS.RAW_MATERIALS}/${id}`),
    create: (data) => apiService.request('post', ENDPOINTS.RAW_MATERIALS, data),
    update: (id, data) => apiService.request('put', `${ENDPOINTS.RAW_MATERIALS}/${id}`, data),
    delete: (id) => apiService.request('delete', `${ENDPOINTS.RAW_MATERIALS}/${id}`)
  }
};

export default apiService; 