import React, { useState } from 'react';
import '../LoginRegister.css';

function Register() {
    var registerName;
    var registerPassword;
    var confirmPassword;
    var firstName;
    var lastName;
    var email;
    const [message, setMessage] = useState('');

    const doRegister = async event => {
        event.preventDefault();

        // Regular expression to check password complexity
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(registerPassword.value)) {
            setMessage('Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.');
            return;
        }

        if (registerPassword.value !== confirmPassword.value) {
            setMessage('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('https://largeprojectgroup3-efcc1eed906f.herokuapp.com/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.value,
                    firstName: firstName.value,
                    lastName: lastName.value,
                    username: registerName.value,
                    password: registerPassword.value,
                }),
            });

            if (response.status == 201) {
                const res = await response.json();
                const userId = res.userId;
                console.log("User ID:", userId);

                // Registration successful, send verification email
                const verificationResponse = await fetch('/api/send-verif', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userId,
                        email: email.value,
                    }),
                });

                const verificationData = await verificationResponse.json();
                if (verificationResponse.ok) {
                    setMessage('User registered successfully. Verification email sent.');
                } else {
                    setMessage('User registered successfully, but failed to send verification email.');
                }
            } else {
                setMessage('Failed to register user.');
            }
        } catch (error) {
            setMessage('Failed to register user due to an error.');
            console.error("Registration error:", error);
        }
    };

    return (
        <div id="registerDiv">
            <h1 id="title">Welcome to Smart Stacks!</h1>
            <form onSubmit={doRegister}>
                <span id="inner-title">PLEASE REGISTER</span><br />
                <input type="text" id="firstName" placeholder="First Name" ref={(c) => firstName = c} />
                <input type="text" id="lastName" placeholder="Last Name" ref={(c) => lastName = c} />
                <input type="text" id="registerName" placeholder="Username" ref={(c) => registerName = c} />
                <input type="email" id="email" placeholder="Email" ref={(c) => email = c} />
                <input type="password" id="registerPassword" placeholder="Password" ref={(c) => registerPassword = c} />
                <input type="password" id="confirmPassword" placeholder="Confirm Password" ref={(c) => confirmPassword = c} />
                <input type="submit" id="registerButton" className="buttons" value="Register" />
                <a href="/login" className="back-to-login">&lt; Back to Login</a>
            </form>
            <span id="registerResult">{message}</span>
        </div>
    );
};

export default Register;
