import React, { useState } from 'react';

function Register() {
    var registerName;
    var registerPassword;
    var confirmPassword;
    var firstName;
    var lastName;
    var email; // Added for email input
    var userId;
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the popup

    const renderPopup = () => {
        setShowPopup(true);
    };

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
            
            if(response.status == 201) {
                const res = await response.json();
                userId = res.userId;
                console.log(userId);
                console.log("the response is", res);
                // Registration successful, send verification email
                const verificationResponse = await fetch('/api/send-verif', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userId, // You may need to modify this based on your backend response
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
                setMessage('Failed to register user');
            }
        } catch (error) {
            setMessage('Failed to register user');
        }
    };

    return (
        <div id="registerDiv" style={{ position: 'relative' }}> {/* Set position relative */}
            <h1 id="title">Welcome to Smart Stacks!</h1>
            <form onSubmit={doRegister}>
                <span id="inner-title">PLEASE REGISTER</span><br />
                <input type="text" id="firstName" placeholder="First Name" ref={(c) => firstName = c} />
                <input type="text" id="lastName" placeholder="Last Name" ref={(c) => lastName = c} />
                <input type="text" id="registerName" placeholder="Username" ref={(c) => registerName = c} />
                <input type="email" id="email" placeholder="Email" ref={(c) => email = c} />
                <input type="password" id="registerPassword" placeholder="Password" ref={(c) => registerPassword = c} />
                <input type="password" id="confirmPassword" placeholder="Confirm Password" ref={(c) => confirmPassword = c} />
                {/* Add onClick event handler to the Register button */}
                <input type="button" id="registerButton" className="buttons" value="Register" onClick={renderPopup} />
                <a href="/login" className="back-to-login">&lt; Back to Login</a>
            </form>
            <span id="registerResult">{message}</span>
            {/* Render the pop-up textbox based on the state */}
            {showPopup && (
                <div className="popup" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
                    <span className="popuptext" id="myPopup">Check your email for account verification.</span>
                </div>
            )}
        </div>
    );
};

export default Register;
