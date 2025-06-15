import React, { useEffect, useState } from 'react';
import { useRawMaterials } from '../../hooks/useApi';
import Table from '../../components/Table/Table';
import './RawMaterialsPage.css';

function RawMaterialsPage() {
  const { getAll, create, update, remove } = useRawMaterials();
  const [materials, setMaterials] = useState([]);
  const [form, setForm] = useState({ type: '', name: '', solid: 100, density: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = () => {
    try {
      const data = getAll();
      setMaterials(data);
    } catch (err) {
      setError('Failed to load materials');
      console.error("Error fetching materials:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.type || !form.name || !form.density) {
      setError('Please fill all fields');
      return;
    }
    try {
      if (editId) {
        update(editId, { ...form, solid: Number(form.solid), density: Number(form.density) });
        setEditId(null);
      } else {
        create({ ...form, solid: Number(form.solid), density: Number(form.density) });
      }
      setForm({ type: '', name: '', solid: 100, density: '' });
      fetchMaterials();
    } catch (err) {
      setError('Failed to save material');
      console.error("Error saving material:", err);
    }
  };

  const handleEdit = (row) => {
    setEditId(row.id);
    setForm({ type: row.type, name: row.name, solid: row.solid, density: row.density });
  };

  const handleDelete = (row) => {
    if (window.confirm('Delete this material?')) {
      try {
        remove(row.id);
        fetchMaterials();
      } catch (err) {
        setError('Failed to delete material');
        console.error("Error deleting material:", err);
      }
    }
  };

  const columns = [
    { header: '#', accessor: 'id' },
    { header: 'Type', accessor: 'type' },
    { header: 'Material Name', accessor: 'name' },
    { header: 'Solid', accessor: 'solid' },
    { header: 'Density', accessor: 'density', Cell: (value) => Number(value).toFixed(2) },
  ];

  return (
    <div className="raw-materials-page">
      <h2>Raw Materials</h2>
      <form className="raw-material-form" onSubmit={handleSubmit}>
        <input name="type" placeholder="Type" value={form.type} onChange={handleChange} />
        <input name="name" placeholder="Material Name" value={form.name} onChange={handleChange} />
        <input name="solid" type="number" placeholder="Solid" value={form.solid} onChange={handleChange} />
        <input name="density" type="number" step="0.01" placeholder="Density" value={form.density} onChange={handleChange} />
        <button type="submit">{editId ? 'Update' : 'Add'} Material</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ type: '', name: '', solid: 100, density: '' }); }}>Cancel</button>}
      </form>
      {error && <div className="error">{error}</div>}
      <Table columns={columns} data={materials} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default RawMaterialsPage; 