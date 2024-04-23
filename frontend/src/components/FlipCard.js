import React from 'react';
import '../ViewStack.css';
import '../Web.css';

const FlipCard = ({ front, back, isFlipped, onClick, onDifficultyChange, showSlider, toggleSlider }) => {
  return (
    <div className={`card-container ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
      <div className="card-front">
        {/* Button to toggle difficulty slider without flipping the card */}
        <button className="slider-toggle-button" onClick={(e) => {
            e.stopPropagation(); // Prevent the card flip when clicking the slider button
            toggleSlider();
          }}>
          {showSlider ? '>' : '<'}
        </button>
        {/* Render DifficultySlider if showSlider state is true */}
        {showSlider && <DifficultySlider onChange={onDifficultyChange} />}
        <div className="card-content">{front}</div>
      </div>
      <div className="card-back">
        <div className="card-content">{back}</div>
      </div>
    </div>
  );
};

export default FlipCard;

/*
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

*/