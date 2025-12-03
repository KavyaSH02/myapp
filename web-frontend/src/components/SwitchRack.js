import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import "../attendance.css";

const SwitchRack = () => {
  const [form, setForm] = useState({
    date: "",
    details: "",
    unit: "",
    received: "",
    issued: "",
    balance: "",
    sign: "",
  });

  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Load data from backend and localStorage on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/switch-rack`);
        setRecords(response.data);
        localStorage.setItem('switchRackRecords', JSON.stringify(response.data));
      } catch (error) {
        const savedRecords = localStorage.getItem('switchRackRecords');
        if (savedRecords) {
          setRecords(JSON.parse(savedRecords));
        }
      }
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(`${API_BASE_URL}/api/switch-rack`, form);
      const updatedData = await axios.get(`${API_BASE_URL}/api/switch-rack`);
      setRecords(updatedData.data);
    } catch (error) {
      const newRecords = [...records, form];
      setRecords(newRecords);
      localStorage.setItem('switchRackRecords', JSON.stringify(newRecords));
      alert('Saved locally (backend unavailable)');
    }
    
    setForm({ date: "", details: "", unit: "", received: "", issued: "", balance: "", sign: "" });
  };

  const handleEdit = (row, index) => {
    setForm({
      date: row.date,
      details: row.details,
      unit: row.unit,
      received: row.received,
      issued: row.issued,
      balance: row.balance,
      sign: row.sign
    });
    setEditingId(row.id || index);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      await axios.put(`${API_BASE_URL}/api/switch-rack/${editingId}`, form);
      const updatedData = await axios.get(`${API_BASE_URL}/api/switch-rack`);
      setRecords(updatedData.data);
    } catch (error) {
      const newRecords = records.map((record, index) => 
        (record.id === editingId || index === editingId) ? { ...record, ...form } : record
      );
      setRecords(newRecords);
      localStorage.setItem('switchRackRecords', JSON.stringify(newRecords));
      alert('Updated locally (backend unavailable)');
    }
    
    setForm({ date: "", details: "", unit: "", received: "", issued: "", balance: "", sign: "" });
    setEditingId(null);
  };

  const handleDelete = async (id, index) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    
    try {
      await axios.delete(`${API_BASE_URL}/api/switch-rack/${id}`);
      const updatedData = await axios.get(`${API_BASE_URL}/api/switch-rack`);
      setRecords(updatedData.data);
    } catch (error) {
      const newRecords = records.filter((_, i) => i !== index);
      setRecords(newRecords);
      localStorage.setItem('switchRackRecords', JSON.stringify(newRecords));
    }
  };

  return (
    <div className="container">
      <h2>Switch Rack Entry</h2>

      <form onSubmit={editingId ? handleUpdate : handleSubmit} className="stock-form">
        <input type="date" name="date" value={form.date} onChange={handleChange} required />

        <input 
          type="text" 
          name="details" 
          placeholder="Details" 
          value={form.details} 
          onChange={handleChange} 
          required 
        />

        <input 
          type="text" 
          name="unit" 
          placeholder="Unit" 
          value={form.unit} 
          onChange={handleChange} 
          required 
        />

        <input 
          type="number" 
          name="received" 
          placeholder="Received" 
          value={form.received} 
          onChange={handleChange} 
          required 
        />

        <input 
          type="number" 
          name="issued" 
          placeholder="Issued" 
          value={form.issued} 
          onChange={handleChange} 
          required 
        />

        <input 
          type="number" 
          name="balance" 
          placeholder="Balance" 
          value={form.balance} 
          onChange={handleChange} 
          required 
        />

        <input 
          type="text" 
          name="sign" 
          placeholder="Signature" 
          value={form.sign} 
          onChange={handleChange} 
          required 
        />

        <button type="submit">{editingId ? 'Update Entry' : 'Add Entry'}</button>
        {editingId && (
          <button type="button" onClick={() => {
            setForm({ date: "", details: "", unit: "", received: "", issued: "", balance: "", sign: "" });
            setEditingId(null);
          }} style={{ backgroundColor: '#6c757d' }}>
            Cancel
          </button>
        )}
      </form>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Details</th>
            <th>Unit</th>
            <th>Received</th>
            <th>Issued</th>
            <th>Balance</th>
            <th>Sign</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((row, index) => (
            <tr key={index}>
              <td>{row.date}</td>
              <td>{row.details}</td>
              <td>{row.unit}</td>
              <td>{row.received}</td>
              <td>{row.issued}</td>
              <td>{row.balance}</td>
              <td>{row.sign}</td>
              <td>
                <button 
                  onClick={() => handleEdit(row, index)}
                  className="edit-btn"
                  style={{ marginRight: '5px' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(row.id, index)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SwitchRack;