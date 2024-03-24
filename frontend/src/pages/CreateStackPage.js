import React from 'react';
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
  return (
    <div className="page-container-landing">
      <NavBar2 />
      <div className="create-study-set-container">
        <h1>Create a new study set</h1>
        <input type="text" placeholder="Enter a title, like “Biology - Chapter 22: Evolution”" className="title-input" />
        <textarea placeholder="Add a description..." className="description-textarea"></textarea>
        <input type="text" placeholder="University of Central Florida - Orlando, FL" className="university-input" />
        <input type="text" placeholder="Enter the course code or name or select it from the list" className="course-input" />
        
        <div className="import-options">
          <button>Import</button>
          <button>Add diagram</button>
          <button>Create from notes</button>
        </div>

        <div className="terms-container">
          {/* Updated component names to CardPair */}
          <CardPair number={1} />
          <CardPair number={2} />
          {/* Add more CardPair components as needed */}
        </div>

        <button className="create-button">Create</button>
      </div>
      <LandingFooter />
    </div>
  );
}

export default LandingPage;
