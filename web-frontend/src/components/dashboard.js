import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config";
import "../attendance.css";

const AttendanceForm = () => {
  const [form, setForm] = useState({
    date: "",
    inTime: "",
    outTime: "",
    leaveType: "",
    signature: "",
  });

  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Load data from backend and localStorage on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Try to load from backend first
        const response = await axios.get(`${API_BASE_URL}/api/attendance`);
        setRecords(response.data);
        // Clear localStorage when backend is available
        localStorage.removeItem('attendanceRecords');
      } catch (error) {
        // If backend fails, load from localStorage
        const savedRecords = localStorage.getItem('attendanceRecords');
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
      // Save to backend first
      await axios.post(`${API_BASE_URL}/api/attendance`, form);
      // Reload data from backend to get the ID
      const updatedData = await axios.get(`${API_BASE_URL}/api/attendance`);
      setRecords(updatedData.data);
      
    } catch (error) {
      // If backend fails, save to localStorage only
      const newRecords = [...records, { ...form, id: Date.now() }];
      setRecords(newRecords);
      localStorage.setItem('attendanceRecords', JSON.stringify(newRecords));
      alert('Saved locally (backend unavailable)');
    }
    
    setForm({ date: "", inTime: "", outTime: "", leaveType: "", signature: "" });
  };

  const handleEdit = (row, index) => {
    setForm({
      date: row.date,
      inTime: row.inTime,
      outTime: row.outTime,
      leaveType: row.leaveType,
      signature: row.signature
    });
    setEditingId(row.id || index);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      await axios.put(`${API_BASE_URL}/api/attendance/${editingId}`, form);
      const updatedData = await axios.get(`${API_BASE_URL}/api/attendance`);
      setRecords(updatedData.data);
    } catch (error) {
      // If backend fails, update localStorage
      const newRecords = records.map((record, index) => 
        (record.id === editingId || index === editingId) ? { ...record, ...form } : record
      );
      setRecords(newRecords);
      localStorage.setItem('attendanceRecords', JSON.stringify(newRecords));
      alert('Updated locally (backend unavailable)');
    }
    
    setForm({ date: "", inTime: "", outTime: "", leaveType: "", signature: "" });
    setEditingId(null);
  };

  const handleDelete = async (id, index) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    
    try {
      await axios.delete(`${API_BASE_URL}/api/attendance/${id}`);
      const updatedData = await axios.get(`${API_BASE_URL}/api/attendance`);
      setRecords(updatedData.data);
    } catch (error) {
      const newRecords = records.filter((_, i) => i !== index);
      setRecords(newRecords);
      localStorage.setItem('attendanceRecords', JSON.stringify(newRecords));
    }
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '20px' }}>
        <Link to="/switch-rack" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' }}>
          Go to Switch Rack
        </Link>
        <Link to="/work-station" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          Go to Work Station
        </Link>
      </div>
      <h2>Daily Attendance Entry</h2>

      <form onSubmit={editingId ? handleUpdate : handleSubmit} className="attendance-form">
        <input type="date" name="date" value={form.date} onChange={handleChange} required />

        <input type="time" name="inTime" value={form.inTime} onChange={handleChange} required />

        <input type="time" name="outTime" value={form.outTime} onChange={handleChange} required />

        <select name="leaveType" value={form.leaveType} onChange={handleChange} required>
          <option value="">Select Leave Type</option>
          <option value="SL">SL</option>
          <option value="CL">CL</option>
          <option value="EL">EL</option>
          <option value="Present">Present</option>
        </select>

        <input
          type="text"
          name="signature"
          placeholder="Signature"
          value={form.signature}
          onChange={handleChange}
          required
        />

        <button type="submit">{editingId ? 'Update Entry' : 'Add Entry'}</button>
        {editingId && (
          <button type="button" onClick={() => {
            setForm({ date: "", inTime: "", outTime: "", leaveType: "", signature: "" });
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
            <th>In Time</th>
            <th>Out Time</th>
            <th>Leave Type</th>
            <th>Signature</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((row, index) => (
            <tr key={index}>
              <td>{row.date}</td>
              <td>{row.inTime}</td>
              <td>{row.outTime}</td>
              <td>{row.leaveType}</td>
              <td>{row.signature}</td>
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

export default AttendanceForm;
