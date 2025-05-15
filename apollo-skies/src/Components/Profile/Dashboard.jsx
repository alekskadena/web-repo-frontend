import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ username: '', email: '', role: '1' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch('admin.php')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  };

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

    fetch(url, {
      method: 'POST',
      body: payload
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert(editId ? 'User updated' : 'User added');
          setFormData({ username: '', email: '', role: '1' });
          setEditId(null);
          fetchUsers();
        } else {
          alert(data.message || 'Operation failed');
        }
      })
      .catch(err => alert('Error: ' + err));
  };

  const handleEdit = user => {
    setFormData({ username: user.username, email: user.email, role: user.role_id.toString() });
    setEditId(user.id);
  };

  const handleDelete = id => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    fetch(`delete_passenger.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          alert('User deleted');
          fetchUsers();
        } else {
          alert(data.error || 'Delete failed');
        }
      })
      .catch(err => alert('Error: ' + err));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      <div className="mb-6 border p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">{editId ? 'Edit User' : 'Add New User'}</h3>
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="border p-2 mr-2" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 mr-2" />
        <select name="role" value={formData.role} onChange={handleChange} className="border p-2 mr-2">
          <option value="1">User</option>
          <option value="2">Admin</option>
        </select>
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">{editId ? 'Update' : 'Add'}</button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="text-center">
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role_id === 2 ? 'Admin' : 'User'}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(user)} className="bg-yellow-400 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

