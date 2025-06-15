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

const Products = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    material: '',
    thickness: '',
    width: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        setOpen(false);
        setNewProduct({
          name: '',
          description: '',
          material: '',
          thickness: '',
          width: '',
        });
        fetchProducts();
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'material', headerName: 'Material', width: 150 },
    { field: 'thickness', headerName: 'Thickness (mm)', width: 150 },
    { field: 'width', headerName: 'Width (mm)', width: 150 },
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
        <Typography variant="h4">Products</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Product
        </Button>
      </Box>

      <DataGrid
        rows={products}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        autoHeight
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              margin="normal"
              multiline
              rows={3}
            />
            <TextField
              fullWidth
              label="Material"
              value={newProduct.material}
              onChange={(e) =>
                setNewProduct({ ...newProduct, material: e.target.value })
              }
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Thickness (mm)"
              type="number"
              value={newProduct.thickness}
              onChange={(e) =>
                setNewProduct({ ...newProduct, thickness: e.target.value })
              }
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Width (mm)"
              type="number"
              value={newProduct.width}
              onChange={(e) =>
                setNewProduct({ ...newProduct, width: e.target.value })
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

export default Products; 