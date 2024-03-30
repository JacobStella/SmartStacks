import React, { useState } from 'react';
import NavBar2 from '../components/NavBar2';
import '../ViewStack.css';
import '../Web.css';

const FlipCard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`card-container ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="card-front">
        {front}
      </div>
      <div className="card-back">
        {back}
      </div>
    </div>
  );
};

const ViewStackPage = () => {
  const [cards, setCards] = useState([
    { front: 'Front 1', back: 'Back 1' },
    { front: 'Front 2', back: 'Back 2' },
    { front: 'Front 3', back: 'Back 3' },
    // ... more cards
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPreviousCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const goToNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex < cards.length - 1 ? prevIndex + 1 : prevIndex));
  };

  return (
    <div className="view-stack-page">
        <NavBar2 />
      <h1 className="stack-title">Stack Title</h1>
      {cards.length > 0 && (
        <FlipCard
          front={cards[currentIndex].front}
          back={cards[currentIndex].back}
        />
      )}
      <div className="navigation-buttons">
        <button onClick={goToPreviousCard}>&lt; Prev</button>
        <span className="card-counter">{currentIndex + 1}/{cards.length}</span>
        <button onClick={goToNextCard}>Next &gt;</button>
      </div>
    </div>
  );
}

export default ViewStackPage;
