/* 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css'; 

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
 
    fetch('http://localhost/web-repo-backend/session_check.php', {  //by using kte fetch me session_check shikojm nese useri eshte perdorues i thjehst or an admin
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success' && data.role === 'admin') {
          setIsAdmin(true); 
        } else {
          setIsAdmin(false); 
          navigate('/login'); //behet redirect te login page nese nuk esht admin
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsAdmin(false); 
        navigate('/login'); 
      });
  }, [navigate]);

  const logout = () => {
    fetch('http://localhost/web-repo-backend/logout.php', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate('/'); // Redirect to home page after logout
      })
      .catch((error) => console.error('Error:', error));
  };

  //kjo eshte ne rast se ka probleme ne identifikim dhe ne rast se smth goes wrong perdoruesit i del loading
  if (isAdmin === null) {
    return <div className="loading">Loading... Please wait.</div>; 
  }

  return (
    <div className="admin-container">
      <h1>Welcome Admin</h1>
      <p>You're viewing the admin dashboard.</p>
      <h4>Hey colleague! Go to work now.</h4>
      <button className="logout-button" onClick={logout}>Logout</button>
    </div>
  );
};

export default Admin;
*/

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css'; 

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost/web-repo-backend/session_check.php', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success' && data.role === 2) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          //navigate('/login');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsAdmin(false);
        navigate('/login');
      });
  }, [navigate]);

  const logout = () => {
    fetch('http://localhost/web-repo-backend/logout.php', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then(() => navigate('/'))
      .catch((error) => console.error('Error:', error));
  };

  if (isAdmin === null) {
    return <div className="loading">Loading... Please wait.</div>;
  }

  return (
    <div className="admin-container">
      <h1>Welcome Admin</h1>
      <p>You're viewing the admin dashboard.</p>
      <h4>Hey colleague! Go to work now.</h4>
      <button className="logout-button" onClick={logout}>Logout</button>
    </div>
  );
};

export default Admin;

