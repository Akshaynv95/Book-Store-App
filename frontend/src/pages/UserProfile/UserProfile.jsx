import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserProfilePage = () => {
  const { id } = useParams();
  const { token, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (token && id && user?.role === 'user') {
      // Fetch user details
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => setFormData({ ...res.data, password: '' }))
        .catch(() => setStatus('Failed to load profile'));

      // Fetch user reviews
     
    }
  }, [id, token, user?.role]);

  //  Move conditional rendering AFTER hooks
  if (user?.role === 'admin') {
    return <div className="access-denied">Access Denied: Admin cannot view this page</div>;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/user/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStatus('Profile updated successfully!');
    } catch {
      setStatus('Failed to update profile.');
    }
  };

  return (
    <div className="profile-page">
      <h2>Your Profile</h2>
      {status && <p className="status-msg">{status}</p>}

      <form className="profile-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name || ''}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email || ''}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>

     
    </div>
  );
};

export default UserProfilePage;
