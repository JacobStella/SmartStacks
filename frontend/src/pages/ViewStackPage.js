import React, { useState } from 'react';
import NavBar2 from '../components/NavBar2';
import PlayButton from '../components/PlayButton'; 
import FlipCard from '../components/FlipCard'
import '../ViewStack.css';
import '../Web.css';

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

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error("Fullscreen mode failed: ", e);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="view-stack-page">
        <NavBar2 />
        <PlayButton />
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
      <button onClick={toggleFullScreen}>Full Screen</button> {/* Full Screen toggle button */}
    </div>
  );
}

export default ViewStackPage;
