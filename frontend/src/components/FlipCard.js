import React, { useState } from 'react';
import '../ViewStack.css';
import '../Web.css';

const DifficultySlider = ({ onChange }) => {
  return (
    <div className="difficulty-slider">
      <input type="radio" id="difficultyRed" name="difficulty" value="red" onChange={onChange} />
      <label htmlFor="difficultyRed" style={{ background: 'red' }}></label>
      <input type="radio" id="difficultyYellow" name="difficulty" value="yellow" onChange={onChange} />
      <label htmlFor="difficultyYellow" style={{ background: 'yellow' }}></label>
      <input type="radio" id="difficultyGreen" name="difficulty" value="green" onChange={onChange} />
      <label htmlFor="difficultyGreen" style={{ background: 'green' }}></label>
    </div>
  );
};

const FlipCard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const toggleSlider = (event) => {
    event.stopPropagation(); // Prevent the card flip when clicking the slider button
    setShowSlider(!showSlider);
  };

  const handleDifficultyChange = (event) => {
    // Handle the difficulty change here
    console.log(event.target.value);
  };

  return (
    <div className={`card-container ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="card-front">
        {/* Update the button content based on showSlider state */}
        <button className="slider-toggle-button" onClick={toggleSlider}>
          {showSlider ? '>' : '<'}
        </button>
        {showSlider && <DifficultySlider onChange={handleDifficultyChange} />}
        {front}
      </div>
      <div className="card-back">
        {back}
      </div>
    </div>
  );
};

export default FlipCard;
