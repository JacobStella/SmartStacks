import React from 'react';
import { Link } from 'react-router-dom';
import LibraryImage from '../images/library.png';
import '../Web.css';

function LibraryLink() {
    // Include state and functions specific to library management

    return (
        <div className="library-section">
            <Link to="/library">
                <img src={LibraryImage} alt="Library" className="image-button" />
            </Link>
            <p className="library-section-text">Library</p>
        </div>
    );
}

export default LibraryLink;
