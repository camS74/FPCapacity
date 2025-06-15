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
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';

const Machines = () => {
  const [machines, setMachines] = useState([]);
  const [open, setOpen] = useState(false);
  const [newMachine, setNewMachine] = useState({
    name: '',
    type: '',
    status: 'Active',
    capacity: '',
  });

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      const response = await fetch('/api/machines');
      const data = await response.json();
      setMachines(data);
    } catch (error) {
      console.error('Error fetching machines:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/machines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMachine),
      });
      if (response.ok) {
        setOpen(false);
        setNewMachine({
          name: '',
          type: '',
          status: 'Active',
          capacity: '',
        });
        fetchMachines();
      }
    } catch (error) {
      console.error('Error adding machine:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'capacity', headerName: 'Capacity', width: 130 },
    {
      field: 'created_at',
      headerName: 'Created At',
      width: 200,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Machines</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Machine
        </Button>
      </Box>

      <DataGrid
        rows={machines}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        autoHeight
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Machine</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={newMachine.name}
              onChange={(e) =>
                setNewMachine({ ...newMachine, name: e.target.value })
              }
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Type"
              value={newMachine.type}
              onChange={(e) =>
                setNewMachine({ ...newMachine, type: e.target.value })
              }
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Capacity"
              type="number"
              value={newMachine.capacity}
              onChange={(e) =>
                setNewMachine({ ...newMachine, capacity: e.target.value })
              }
              margin="normal"
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Machines; 