import React, { useState } from 'react';
import NavBar2 from '../components/NavBar2';
import LandingFooter from '../components/LandingFooter';
import '../Web.css';

// CardPair component with additional buttons for delete and reorder
const CardPair = ({ number, onDelete, onMove }) => (
  <div className="card-pair">
    <div className="card-header">
      <span className="number">{number}</span>
      <div className="card-actions">
        <button onClick={() => onMove(number, 'up')} className="action-button">↑</button>
        <button onClick={() => onMove(number, 'down')} className="action-button">↓</button>
        <button onClick={() => onDelete(number)} className="action-button">🗑️</button>
      </div>
    </div>
    <div className="card-body">
      <input type="text" placeholder="Enter term" className="term-input" />
      <input type="text" placeholder="Enter definition" className="definition-input" />
      <button className="image-button">IMAGE</button>
    </div>
  </div>
);

// LandingPage component with added functionality
const LandingPage = () => {
  const [cardPairs, setCardPairs] = useState([1, 2, 3]);

  const addCardPair = () => {
    setCardPairs(prevCardPairs => [...prevCardPairs, prevCardPairs.length + 1]);
  };

  const deleteCardPair = (number) => {
    setCardPairs(prevCardPairs => prevCardPairs.filter(cp => cp !== number));
  };

  const moveCardPair = (number, direction) => {
    // This function should be defined to handle moving card pairs up or down
  };

  return (
    <div className="page-container-landing">
      <NavBar2 />
      <div className="create-study-set-container">
        <h1>Create a new study set</h1>
        <input type="text" placeholder="Title" className="title-input" />
        <textarea placeholder="Description..." className="description-textarea"></textarea>
        <input type="text" placeholder="Folder Name" className="university-input" />
        <input type="text" placeholder="Enter the course code or name or select it from the list" className="course-input" />
        
        <div className="terms-container">
          {cardPairs.map((number, index) => (
            <CardPair 
              key={index}
              number={number}
              onDelete={deleteCardPair}
              onMove={moveCardPair}
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
