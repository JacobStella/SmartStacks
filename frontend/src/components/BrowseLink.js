import React from 'react';
import { Link } from 'react-router-dom';
import BrowseImage from '../images/IMAGELINK';
import '../Web.css';

function BrowseLink() {
    // Include state and functions for browsing

    return (
        <div className="browse-section">
            <Link to="/browse">
                <img src={BrowseImage} alt="Browse" className="image-button" />
            </Link>
        </div>
    );
}

export default BrowseLink;
