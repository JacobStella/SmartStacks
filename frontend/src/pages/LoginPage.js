
//comment
import React from 'react';
import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import '../LoginRegister.css';
import NavBar2 from '../components/NavBar2';
import LandingFooter from '../components/LandingFooter';

const LoginPage = () => {
    return (
        <div className="login-container">
            <NavBar2 />
            <div>
                <Login />
            </div>
            <LandingFooter />
        </div>
    );
};


export default LoginPage;
