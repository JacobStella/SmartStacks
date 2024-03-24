import React, { useState } from 'react';
import NavBar2 from '../components/NavBar2';
import LandingFooter from '../components/LandingFooter';
import '../Web.css';

const CardPair = ({ number }) => (
  <div className="term-definition-pair">
    <div className="number">{number}</div>
    <input type="text" placeholder="Enter term" className="term-input" />
    <input type="text" placeholder="Enter definition" className="definition-input" />
    <div className="image-placeholder">IMAGE</div>
  </div>
);

const LandingPage = () => {
  const [cardPairs, setCardPairs] = useState([1, 2, 3]); // Initial card pair numbers

  // Function to add a new card pair
  const addCardPair = () => {
    setCardPairs([...cardPairs, cardPairs.length + 1]);
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
          {cardPairs.map((number) => (
            <CardPair key={number} number={number} />
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
