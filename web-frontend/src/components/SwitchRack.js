import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../attendance.css";

const SwitchRack = () => {
  const navigate = useNavigate();
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

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedRecords = localStorage.getItem('switchRackRecords');
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecords = [...records, { ...form, id: Date.now() }];
    setRecords(newRecords);
    localStorage.setItem('switchRackRecords', JSON.stringify(newRecords));
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

  const handleUpdate = (e) => {
    e.preventDefault();
    const newRecords = records.map((record, index) => 
      (record.id === editingId || index === editingId) ? { ...record, ...form } : record
    );
    setRecords(newRecords);
    localStorage.setItem('switchRackRecords', JSON.stringify(newRecords));
    setForm({ date: "", details: "", unit: "", received: "", issued: "", balance: "", sign: "" });
    setEditingId(null);
  };

  const handleDelete = (id, index) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    const newRecords = records.filter((_, i) => i !== index);
    setRecords(newRecords);
    localStorage.setItem('switchRackRecords', JSON.stringify(newRecords));
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/dashboard" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' }}>
            Back to Dashboard
          </Link>
          <Link to="/work-station" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
            Go to Work Station
          </Link>
        </div>
        <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>
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