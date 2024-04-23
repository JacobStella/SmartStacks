import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Login from '../components/Login';
import NavBar2 from '../components/NavBar2';
import LandingFooter from '../components/LandingFooter';
import '../LoginRegister.css';

const VerifyPage = () => {
    const { token } = useParams(); // Extracting token from URL

    useEffect(() => {
        // Immediately upon mounting, send a request to the verification endpoint
        fetch(`/api/verify/${token}`, {
            method: 'GET', // Assuming your endpoint is a GET request
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Handle redirection or display a message based on the response here
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [token]); // Re-run this effect if the token changes

    return (
        <>
            <NavBar2 />
            <div className="login-container">
                <Login />
            </div>
            <LandingFooter />
        </>
    );
};

export default VerifyPage;
