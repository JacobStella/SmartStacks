import React from 'react';
import { Link } from 'react-router-dom';
import '../Web.css';

function PlayButton() {

    return (
        <div className="play-section">
            <Link to="/game" className="play-link">
                <button className="play-button">Play</button>
            </Link>
        </div>
    );
}

export default PlayButton;
