import React from 'react';
import '../Web.css';

const handlePlayStack = (setId) => {
    localStorage.setItem("setId", setId);
    navigate('/game');
  };

function PlayButton() {

    return (
        <div className="play-section">
            <button className="play-button" onClick={() => handlePlayStack(setId)}>Play</button>
        </div>
    );
}

export default PlayButton;