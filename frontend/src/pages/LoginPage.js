import React from 'react';
import Login from '../components/Login';
import NavBar2 from '../components/NavBar2';
import LandingFooter from '../components/LandingFooter';
import '../LoginRegister.css';

const LoginPage = () => {
    return (
        <>
            <NavBar2 />
            <div className="login-container">
                <h1 id="title">Welcome to Smart Stacks!</h1>
                <Login />
            </div>
            <LandingFooter />
        </>
    );
};

export default LoginPage;
