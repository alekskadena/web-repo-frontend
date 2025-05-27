import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ username: '', email: '', role: '1' });
  const [editId, setEditId] = useState(null);
  const [unauthorized, setUnauthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost/web-repo-backend/admin.php', {
      credentials: 'include'
    })
      .then(res => {
        if (res.status === 401) {
          setUnauthorized(true);
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data?.users) {
          setUsers(data.users);
        } else if (data?.error) {
          console.error('Error:', data.error);
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setUnauthorized(true);
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const url = editId ? 'update_passenger.php' : 'add_user.php';
    const payload = new FormData();
    if (editId) payload.append('id', editId);
    payload.append('username', formData.username);
    payload.append('email', formData.email);
    payload.append('role', formData.role);

    fetch(`http://localhost/web-repo-backend/${url}`, {
      method: 'POST',
      body: payload,
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert(editId ? 'User updated' : 'User added');
          setFormData({ username: '', email: '', role: '1' });
          setEditId(null);
          // Refresh user list
          fetch('http://localhost/web-repo-backend/admin.php', { credentials: 'include' })
            .then(res => res.json())
            .then(data => setUsers(data.users || []));
        } else {
          alert(data.message || 'Operation failed');
        }
      })
      .catch(err => alert('Error: ' + err));
  };

  const handleEdit = user => {
    setFormData({ username: user.username, email: user.email, role: user.role === 'Admin' ? '2' : '1' });
    setEditId(user.id);
  };

  const handleDelete = id => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    fetch(`http://localhost/web-repo-backend/delete_passenger.php?id=${id}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          alert('User deleted');
          // Refresh user list
          fetch('http://localhost/web-repo-backend/admin.php', { credentials: 'include' })
            .then(res => res.json())
            .then(data => setUsers(data.users || []));
        } else {
          alert(data.error || 'Delete failed');
        }
      })
      .catch(err => alert('Error: ' + err));
  };

  const handleLogout = () => {
    fetch('http://localhost/web-repo-backend/logout.php', { credentials: 'include' })
      .then(() => navigate('/login'))
      .catch(err => alert('Logout failed: ' + err));
  };

  if (unauthorized) {
    return <div style={{ color: 'red', fontWeight: 'bold' }}>Unauthorized. Please log in as admin.</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>User Management</h2>
      <div className="form-container">
        <h3>{editId ? 'Edit User' : 'Add New User'}</h3>
        <input
          className="input-field"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          className="input-field"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <select
          className="select-field"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="1">User</option>
          <option value="2">Admin</option>
        </select>
        <button onClick={handleSubmit} className="bg-blue-500">{editId ? 'Update' : 'Add'}</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr><th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td><td>{user.username}</td><td>{user.email}</td><td>{user.role}</td>
                <td>
                  <button onClick={() => handleEdit(user)} className="bg-yellow-400">Edit</button>
                  <button onClick={() => handleDelete(user.id)} className="bg-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleLogout} className="bg-gray-500">Logout</button>
      </div>
    </div>
  );
}
