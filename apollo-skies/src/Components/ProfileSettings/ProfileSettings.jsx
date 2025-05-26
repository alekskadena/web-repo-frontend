/*import React, { useState, useEffect } from 'react';

function ProfileSettings() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  // Merr username-in aktual nga serveri
  useEffect(() => {
    fetch("http://localhost:8080/Apollo-SKIES/web-repo-backend/profile.php", {
      credentials: "include"
    })
    .then(async res => {
      const text = await res.text();
      console.log("GET profile.php response:", text); // Debug për profile.php

      try {
        const data = JSON.parse(text);
        setUsername(data.username);
      } catch (err) {
        console.error("JSON parse error në profile.php:", err);
      }
    })
    .catch(err => {
      console.error("Gabim në fetch të profile.php:", err);
    });
  }, []);

  // Funksion për përditësim username-i
  const handleUpdate = () => {
    fetch("http://localhost:8080/Apollo-SKIES/web-repo-backend/update_username.php", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username })
    })
    .then(async res => {
      const text = await res.text();
      console.log("POST update_username.php response:", text); // Debug për update

      try {
        const data = JSON.parse(text);
        if (data.status === "success") {
          setMessage("Username updated successfully!");
        } else {
          setMessage("Failed to update username.");
        }
      } catch (err) {
        console.error("JSON parse error ne update_username.php:", err);
        setMessage("Invalid response from server.");
      }
    })
    .catch(err => {
      console.error("Gabim ne fetch te update_username.php:", err);
      setMessage("Error communicating with server.");
    });
  };

  return (
    <div>
      <h2>Profile Settings</h2>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Username</button>
      <p>{message}</p>
    </div>
  );
}

export default ProfileSettings;*/



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
        navigate("/profile");  // redirect SPA style
      } else if (data.message && data.message.toLowerCase().includes("duplicate")) {
        setMessage("This username already exist.");
      } else {
        setMessage("Failed to update username.");
      }
    })
    .catch(() => setMessage("Network error while updating username."));
  };

  return (
    <div>
      <h2>Profile Settings</h2>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Username</button>
      <p style={{ color: 'red' }}>{message}</p>
    </div>
  );
}

export default ProfileSettings;