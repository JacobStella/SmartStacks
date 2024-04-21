import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Web.css';

function PlayButton() {
    const setId = localStorage.getItem('setId');
    const navigate = useNavigate();
    const location = useLocation();

    const handlePlayStack = (setId) => {
    localStorage.setItem("setId", setId);
    navigate('/game');
  };


    return (
        <div className="play-section">
            <button className="play-button" onClick={() => handlePlayStack(setId)}>Play</button>
        </div>
    );
}

export default PlayButton;