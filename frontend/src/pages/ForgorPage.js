import React, { useState } from 'react';
import '../Forgor.css';

const ForgorPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Sending a POST request using the Fetch API
    fetch('/api/sendforgot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    })
    .then(response => {
      if (!response.ok) {
        // If the server response was not OK, we get the error message from the response and throw it
        return response.json().then(errorData => {
          throw new Error(errorData.message || 'Network response was not OK');
        });
      }
      return response.json();
    })
    .then(data => {
      setMessage(data.message);  // Display success message from server
      setError('');  // Clear any previous errors if email is sent successfully
    })
    .catch(error => {
      setError(error.message || 'Failed to send reset email. Please try again later.');  // Set generic error message for other failures
    });
  };
  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');  // Clear error message when the user starts typing
    setMessage(''); // Clear success message when the user starts typing
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password?</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email and we'll send you a link to reset your password.</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}
        <button type="submit" className="submit-button">Submit</button><br/>
        <a href="/login"> &lt; Back to Login</a>
      </form>
    </div>
  );
};

export default ForgorPage;
