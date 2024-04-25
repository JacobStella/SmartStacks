import React from 'react';
import { Link } from 'react-router-dom';
import '../Footer.css'; 

const LandingFooter = () => {
    return (
        <footer className="landingFooter">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>About Us</h3>
                    <a href="https://r.mtdv.me/videos/mYab7lGTaD" target="_blank" rel="noopener noreferrer">Who We Are</a>
                    <a href="https://r.mtdv.me/videos/mYab7lGTaD" target="_blank" rel="noopener noreferrer">Our Team</a>
                    <a href="https://r.mtdv.me/videos/mYab7lGTaD" target="_blank" rel="noopener noreferrer">Our Mission</a>
                </div>
                <div className="footer-section">
                    <h3>Socials</h3>
                    <a href="https://r.mtdv.me/videos/mYab7lGTaD" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://r.mtdv.me/videos/mYab7lGTaD" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://r.mtdv.me/videos/mYab7lGTaD" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
                <div className="footer-section">
                    <h3>Legal</h3>
                    <a href="https://r.mtdv.me/videos/mYab7lGTaD" target="_blank" rel="noopener noreferrer">Terms of Use</a>
                    <a href="https://r.mtdv.me/videos/mYab7lGTaD" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                    <p>&copy; {new Date().getFullYear()} Skunkworks Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;
