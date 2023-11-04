import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRecoverPassword = async () => {
    try {
      const response = await axios.post('https://corneredu.onrender.com/users/reset', { email });
      setMessage(response.data.message);
    } catch (error) {
      if(error.response){
      setMessage(error.response.data.message);
    } else{
      setMessage('An error occurred while processing your request.');
    }
  }};

  return (
    <div>
      <h2>Password Recovery</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleEmailChange}
      />
      <button onClick={handleRecoverPassword}>Recover Password</button>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;
