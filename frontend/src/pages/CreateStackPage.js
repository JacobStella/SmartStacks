import React, { useState } from 'react';
import NavBar2 from '../components/NavBar2';
import LandingFooter from '../components/LandingFooter';
import '../CreateStack.css';

// Removed the number prop as it's no longer needed
const CardPair = () => (
  <div className="term-definition-pair">
    <input type="text" placeholder="Enter term" className="term-input" />
    <input type="text" placeholder="Enter definition" className="definition-input" />
  </div>
);

const LandingPage = () => {
  const [cardPairCount, setCardPairCount] = useState(3); // Use count for card pairs instead of an array

  // Function to add a new card pair
  const addCardPair = () => {
    setCardPairCount(cardPairCount + 1); // Increment card pair count
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
          {/* Using Array.from to create an array of the specified length and map over it */}
          {Array.from({ length: cardPairCount }, (_, index) => (
            <CardPair key={index} />
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
