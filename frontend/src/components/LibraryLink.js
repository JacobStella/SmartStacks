import React from 'react';
import { Link } from 'react-router-dom';
import LibraryImage from '../images/IMAGELINK';
import '../Web.css';

function LibraryLink() {
    // Include state and functions specific to library management

    return (
        <div className="library-section">
            <Link to="/play">
                <img src={LibraryImage} alt="Library" className="image-button" />
            </Link>
        </div>
    );
}

export default LibraryLink;
