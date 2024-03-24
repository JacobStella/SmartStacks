import React from 'react';
import NavBar2 from '../components/NavBar2';
import LandingFooter from '../components/LandingFooter';
import '../Web.css';

// Mock component for List Items (you would need to create this with proper logic)
const ListItem = ({ term, definition, isPublic }) => (
  <div className="list-item">
    <span className="term">{term}</span>
    <span className="definition">{definition}</span>
    <span className="visibility">{isPublic ? 'Public' : 'Private'}</span>
    <button className="reorder-button">&#8593;&#8595;</button> {/* Up and down arrows */}
    <button className="delete-button">*</button> {/* Placeholder for delete icon */}
  </div>
);

const LandingPage = () => {
  // Placeholder data for list items
  const listItems = [
    { term: 'Term 1', definition: 'Definition 1', isPublic: true },
    { term: 'Term 2', definition: 'Definition 2', isPublic: false },
    // Add more items as needed
  ];

  return (
    <div className="page-container-landing">
      <NavBar2 />
      <div className="content-container-landing"> 
        <h1>Title</h1>
        <p>Description</p>
        <div className="folder-public-private">
          <button>Folder</button>
          <button>Public</button>
          <button>Private</button>
          <button>Re-order</button>
        </div>
        {listItems.map((item, index) => (
          <ListItem key={index} term={item.term} definition={item.definition} isPublic={item.isPublic} />
        ))}
        <button className="add-card-button">+ Add Card</button>
      </div>
      <LandingFooter />
    </div>
  );
}

export default LandingPage;
