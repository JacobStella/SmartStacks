import React from 'react';
import NavBar2 from '../components/NavBar2';
import LandingFooter from '../components/LandingFooter';
import '../Web.css';

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
          <TermDefinitionPair number={1} />
          <TermDefinitionPair number={2} />
          {/* Add more TermDefinitionPair components as needed */}
        </div>

        <button className="create-button">Create</button>
      </div>
      <LandingFooter />
    </div>
  );
}

export default LandingPage;
