import React from 'react';
import { Link } from 'react-router-dom';
import BrowseImage from '../images/browse.png';
import '../Web.css';

function BrowseLink() {
    // Include state and functions for browsing
    //temporarily renamed the link to /view rther than /browse. (browse is also not in the app.js file)
    return (
        <div className="browse-section">
            <Link to="/browse">
                <img src={BrowseImage} alt="Browse" className="image-button" />
            </Link>
            <p className="browse-section-text">Browse</p>
        </div>
    );
}

export default BrowseLink;
