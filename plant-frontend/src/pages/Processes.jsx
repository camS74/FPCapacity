import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';

const Processes = () => {
  const [processes, setProcesses] = useState([]);
  const [machines, setMachines] = useState([]);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    machineId: '',
    productId: '',
    duration: '',
    status: 'active',
  });
  const [newProcess, setNewProcess] = useState({
    name: '',
    description: '',
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'machineName', headerName: 'Machine', width: 150 },
    { field: 'productName', headerName: 'Product', width: 150 },
    { field: 'duration', headerName: 'Duration (min)', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            size="small"
            onClick={() => handleEdit(params.row)}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [processesRes, machinesRes, productsRes] = await Promise.all([
        axios.get('http://localhost:3000/api/processes'),
        axios.get('http://localhost:3000/api/machines'),
        axios.get('http://localhost:3000/api/products'),
      ]);

      const processesWithNames = processesRes.data.map(process => ({
        ...process,
        machineName: machinesRes.data.find(m => m.id === process.machineId)?.name || 'Unknown',
        productName: productsRes.data.find(p => p.id === process.productId)?.name || 'Unknown',
      }));

      setProcesses(processesWithNames);
      setMachines(machinesRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setSelectedProcess(null);
    setFormData({
      name: '',
      description: '',
      machineId: '',
      productId: '',
      duration: '',
      status: 'active',
    });
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProcess(null);
  };

  const handleEdit = (process) => {
    setSelectedProcess(process);
    setFormData({
      name: process.name,
      description: process.description,
      machineId: process.machineId,
      productId: process.productId,
      duration: process.duration,
      status: process.status,
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this process?')) {
      try {
        await axios.delete(`http://localhost:3000/api/processes/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting process:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedProcess) {
        await axios.put(`http://localhost:3000/api/processes/${selectedProcess.id}`, formData);
      } else {
        await axios.post('http://localhost:3000/api/processes', formData);
      }
      handleClose();
      fetchData();
    } catch (error) {
      console.error('Error saving process:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Processes</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Process
        </Button>
      </Box>

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={processes}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedProcess ? 'Edit Process' : 'Add New Process'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Machine</InputLabel>
              <Select
                name="machineId"
                value={formData.machineId}
                onChange={handleChange}
                required
              >
                {machines.map((machine) => (
                  <MenuItem key={machine.id} value={machine.id}>
                    {machine.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Product</InputLabel>
              <Select
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                required
              >
                {products.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="duration"
              label="Duration (minutes)"
              type="number"
              fullWidth
              value={formData.duration}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="status"
              label="Status"
              type="text"
              fullWidth
              value={formData.status}
              onChange={handleChange}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedProcess ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Processes; 