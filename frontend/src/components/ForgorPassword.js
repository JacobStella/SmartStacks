import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function ResetPasswordPage() {
    var newPassword;
    var confirmPassword;
    const { userId } = useParams(); // Use useParams to get userId from the URL
    const [message, setMessage] = useState('');

    const resetPassword = async event => {
        event.preventDefault();

        // Regular expression to check password complexity
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(newPassword.value)) {
            setMessage('Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.');
            return;
        }

        if (newPassword.value !== confirmPassword.value) {
            setMessage('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('https://largeprojectgroup3-efcc1eed906f.herokuapp.com/api/forgot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    newPass: newPassword.value,
                }),
            });

            if (response.ok) {
                setMessage('Password reset successfully.');
            } else {
                const errorData = await response.json(); // Assuming the server sends back a JSON response with error details
                setMessage(errorData.message || 'Failed to reset password.');
            }
        } catch (error) {
            setMessage('Failed to reset password due to a network error.');
        }
    };

    return (
        <div id="resetPasswordDiv" style={{ position: 'relative' }}>
            <h1 id="title">Reset Your Password</h1>
            <form onSubmit={resetPassword}>
                <input type="password" id="newPassword" placeholder="New Password" ref={(c) => newPassword = c} required />
                <input type="password" id="confirmPassword" placeholder="Confirm New Password" ref={(c) => confirmPassword = c} required />
                <button type="submit" id="resetPasswordButton" className="buttons">Reset Password</button>
                <a href="/login" className="back-to-login">&lt; Back to Login</a>
            </form>
            <span id="resetResult">{message}</span>
        </div>
    );
};

export default ResetPasswordPage;
