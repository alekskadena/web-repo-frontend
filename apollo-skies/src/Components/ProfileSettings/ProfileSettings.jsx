

import './ProfileSettings.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileSettings() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost/web-repo-backend/profile.php", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        setUsername(data.username);
      })
      .catch(() => setMessage("Failed to load profile data."));
  }, []);

  const handleUpdate = () => {
    fetch("http://localhost/web-repo-backend/update_username.php", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          alert("Username updated successfully!");
          navigate("/profile");
        } else if (data.message && data.message.toLowerCase().includes("duplicate")) {
          setMessage("This username already exists.");
        } else {
          setMessage("Failed to update username.");
        }
      })
      .catch(() => setMessage("Network error while updating username."));
  };

  return (
    <div className="profile-settings-container">
      <h2 className="profile-settings-title">Profile Settings</h2>

      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Enter new username"
        className="profile-settings-input"
      />

      <button onClick={handleUpdate} className="profile-settings-button">
        Update Username
      </button>

      {message && <p className="profile-settings-message">{message}</p>}
    </div>
  );
}

export default ProfileSettings;
