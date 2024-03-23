import React from 'react';
import { Link } from 'react-router-dom';
import '../Web.css'; 

const LandingFooter = () => {
    return (
        <footer className="landingFooter">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>About Us</h3>
                    <Link to="/about">Who We Are</Link>
                    <Link to="/team">Our Team</Link>
                    <Link to="/mission">Our Mission</Link>
                </div>
                <div className="footer-section">
                    <h3>Socials</h3>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
                <div className="footer-section">
                    <h3>Legal</h3>
                    <Link to="/terms">Terms of Use</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                    <p>&copy; {new Date().getFullYear()} Sunworks Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;
