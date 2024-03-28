import React, { useState } from 'react';
import NavBar2 from '../components/NavBar2';
import LandingFooter from '../components/LandingFooter';
import '../CreateStack.css';
import '../Web.css';

// Updated CardPair component with arrow buttons and move functionality
const CardPair = ({ onMoveUp, onMoveDown, index }) => (
  <div className="term-definition-pair">
    <input type="text" placeholder="Enter term" className="term-input" />
    <input type="text" placeholder="Enter definition" className="definition-input" />
    <button onClick={() => onMoveUp(index)} className="arrow-button">↑</button>
    <button onClick={() => onMoveDown(index)} className="arrow-button">↓</button>
  </div>
);

const LandingPage = () => {
  // Use an array to keep track of the card pairs
  const [cardPairs, setCardPairs] = useState(Array.from({ length: 3 }, (_, index) => ({ id: index })));

  // Function to move a card pair up
  const moveCardUp = (index) => {
    if (index === 0) return;
    const newCardPairs = [...cardPairs];
    [newCardPairs[index], newCardPairs[index - 1]] = [newCardPairs[index - 1], newCardPairs[index]];
    setCardPairs(newCardPairs);
  };

  // Function to move a card pair down
  const moveCardDown = (index) => {
    if (index === cardPairs.length - 1) return;
    const newCardPairs = [...cardPairs];
    [newCardPairs[index], newCardPairs[index + 1]] = [newCardPairs[index + 1], newCardPairs[index]];
    setCardPairs(newCardPairs);
  };

  // Function to add a new card pair
  const addCardPair = () => {
    setCardPairs([...cardPairs, { id: cardPairs.length }]);
  };

  return (
    <div className="page-container-landing">
      <NavBar2 />
      <div className="create-study-set-container">
        <h1>Create a new study set</h1>
        <input type="text" placeholder="Title" className="title-input" />
        <textarea placeholder="Description..." className="description-input"></textarea>
        <input type="text" placeholder="Folder Name" className="folder-input" />

        <div className="terms-container">
          {/* Map over the cardPairs array and pass the move functions down to CardPair */}
          {cardPairs.map((cardPair, index) => (
            <CardPair
              key={cardPair.id}
              index={index}
              onMoveUp={moveCardUp}
              onMoveDown={moveCardDown}
            />
          ))}
        </div>

        <button onClick={addCardPair} className="add-card-button">+ Add Card</button>
        <button className="create-button">Create</button>
      </div>
      <LandingFooter />
    </div>
  );
}

export default LandingPage;
