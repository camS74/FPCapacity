import { useState, useCallback } from 'react';
import apiService from '../services/api';

export const useApi = (apiMethod) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback((...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = apiMethod(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiMethod]);

  return execute;
};

export const useMachines = () => ({
  getAll: useApi(apiService.machines.getAll),
  create: useApi(apiService.machines.create),
  update: useApi(apiService.machines.update),
  delete: useApi(apiService.machines.delete),
});

export const useProducts = () => ({
  getAll: useApi(apiService.products.getAll),
  create: useApi(apiService.products.create),
  update: useApi(apiService.products.update),
  delete: useApi(apiService.products.delete),
});

export const useRawMaterials = () => ({
  getAll: useApi(apiService.rawMaterials.getAll),
  create: useApi(apiService.rawMaterials.create),
  update: useApi(apiService.rawMaterials.update),
  delete: useApi(apiService.rawMaterials.delete),
}); 