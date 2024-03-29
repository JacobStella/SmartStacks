import React from 'react';
import { Link } from 'react-router-dom';
import PlayImage from '../images/play.png';
import '../Web.css';

function PlayLink() {
    // Include state and functions for play functionality

    return (
        <div className="play-section">
            <Link to="/play">
                <img src={PlayImage} alt="Play" className="image-button" />
            </Link>
            <p className="play-section-text">Play</p>
        </div>
    );
}

export default PlayLink;
