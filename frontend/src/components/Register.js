import React, { useState } from 'react';

function Register() {
    var registerName;
    var registerPassword;
    var confirmPassword;
    var firstName;
    var lastName;
    var email; // Added for email input
    const [message, setMessage] = useState('');

    const doRegister = async event => {
        event.preventDefault();

        if(registerPassword.value !== confirmPassword.value) {
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
                    email: email.value, // Include email in the request
                    firstName: firstName.value,
                    lastName: lastName.value,
                    username: registerName.value,
                    password: registerPassword.value,
                }),
            });

            if(response.ok) {
                setMessage('User registered successfully');
                // Consider clearing the form or redirecting the user after successful registration
                window.location.href = "https://largeprojectgroup3-efcc1eed906f.herokuapp.com/";
            } else {
                setMessage('Failed to register user');
            }
        } catch (error) {
            setMessage('Failed to register user');
        }
    };

    return (
        <div id="registerDiv">
            <form onSubmit={doRegister}>
                <span id="inner-title">PLEASE REGISTER</span><br />
                <input type="text" id="firstName" placeholder="First Name" ref={(c) => firstName = c} /><br />
                <input type="text" id="lastName" placeholder="Last Name" ref={(c) => lastName = c} /><br />
                <input type="text" id="registerName" placeholder="Username" ref={(c) => registerName = c} /><br />
                <input type="email" id="email" placeholder="Email" ref={(c) => email = c} /><br /> {/* Email input field */}
                <input type="password" id="registerPassword" placeholder="Password" ref={(c) => registerPassword = c} /><br />
                <input type="password" id="confirmPassword" placeholder="Confirm Password" ref={(c) => confirmPassword = c} /><br />
                <input type="submit" id="registerButton" className="buttons" value="Register" />
            </form>
            <span id="registerResult">{message}</span>
        </div>
    );
};

export default Register;
