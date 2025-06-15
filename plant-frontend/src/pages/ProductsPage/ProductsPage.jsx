import React, { useState, useEffect } from "react";
import { useProducts } from "../../hooks/useApi";
import "./ProductsPage.css";

function ProductsPage() {
  const { getAll, create } = useProducts();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    group: "",
    processing_time: "",
    setup_time: "",
    priority: "medium",
    status: "active"
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    try {
      const data = getAll();
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products");
      console.error("Error fetching products:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      create(newProduct);
      setNewProduct({
        name: "",
        group: "",
        processing_time: "",
        setup_time: "",
        priority: "medium",
        status: "active"
      });
      fetchProducts();
    } catch (err) {
      setError("Failed to add product");
      console.error("Error adding product:", err);
    }
  };

  return (
    <div className="products-page">
      <h1>Products</h1>
      
      <div className="add-product-section">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="group">Product Group:</label>
            <input
              type="text"
              id="group"
              name="group"
              value={newProduct.group}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="processing_time">Processing Time (minutes):</label>
            <input
              type="number"
              id="processing_time"
              name="processing_time"
              value={newProduct.processing_time}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="setup_time">Setup Time (minutes):</label>
            <input
              type="number"
              id="setup_time"
              name="setup_time"
              value={newProduct.setup_time}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority:</label>
            <select
              id="priority"
              name="priority"
              value={newProduct.priority}
              onChange={handleInputChange}
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <button type="submit" className="submit-button">Add Product</button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="products-list">
        <h2>Existing Products</h2>
        <table className="products-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Group</th>
              <th>Processing Time</th>
              <th>Setup Time</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.group}</td>
                <td>{product.processing_time} min</td>
                <td>{product.setup_time} min</td>
                <td>{product.priority}</td>
                <td>{product.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsPage; 