import React, { useState } from 'react';

const ForgorPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Placeholder for the actual email check logic
    if (email === 'existing@email.com') {
      // Send password reset email logic
    } else {
      setError('We cannot find your email.');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(''); // Clear error message when the user starts typing
  };

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <label htmlFor="email">Enter your email and we'll send you a link to reset your password.</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="submit-button">Submit</button>
        <a href="/login">Back to Login</a>
      </form>
    </div>
  );
};

export default ForgorPage;
