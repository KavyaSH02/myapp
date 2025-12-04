import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../attendance.css";

const AttendanceForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    date: "",
    inTime: "",
    outTime: "",
    leaveType: "",
    signature: "",
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
    const savedRecords = localStorage.getItem('attendanceRecords');
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
    localStorage.setItem('attendanceRecords', JSON.stringify(newRecords));
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

  const handleUpdate = (e) => {
    e.preventDefault();
    const newRecords = records.map((record, index) => 
      (record.id === editingId || index === editingId) ? { ...record, ...form } : record
    );
    setRecords(newRecords);
    localStorage.setItem('attendanceRecords', JSON.stringify(newRecords));
    setForm({ date: "", inTime: "", outTime: "", leaveType: "", signature: "" });
    setEditingId(null);
  };

  const handleDelete = (id, index) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    const newRecords = records.filter((_, i) => i !== index);
    setRecords(newRecords);
    localStorage.setItem('attendanceRecords', JSON.stringify(newRecords));
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/switch-rack" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' }}>
            Go to Switch Rack
          </Link>
          <Link to="/work-station" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
            Go to Work Station
          </Link>
        </div>
        <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Logout
        </button>
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
