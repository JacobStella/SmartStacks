import React from 'react';
import Login from '../components/Login';
import NavBar2 from '../components/NavBar2';
import LandingFooter from '../components/LandingFooter';
import '../LoginRegister.css';

const VerifyPage = () => {
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
