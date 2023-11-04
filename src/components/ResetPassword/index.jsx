import React, { useState } from 'react';
import axios from 'axios';


import { useParams } from 'react-router-dom'; // Import useParams

const ResetPassword = () => {
  const { id, token } = useParams(); // Extract the userId and token from the route

  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(`https://corneredu.onrender.com/users/${id}/reset-password/${token}`, { password });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred while processing your request.');
      }
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="Enter your new password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
      <p>{message}</p>
    </div>
  );
};

export default ResetPassword;
