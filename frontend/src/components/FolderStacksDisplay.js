import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FolderIcon from '../images/FolderIcon.png';
import EditIcon from '../images/EditIcon.png';
import create from '../images/create.png';
import '../Library.css';

const FolderContainer = ({ name, onEdit, sets }) => {
  const [showStacks, setShowStacks] = useState(false);
  const navigate = useNavigate();

  const handleCreateNewStack = () => {
    navigate('/create');
  };

  const handleViewStack = (setId) => {
    navigate(`/view/${setId}`);
  };

  const handleEditStack = (setId, e) => {
    e.stopPropagation(); // Prevent the dropdown from toggling when editing
    // Logic to handle stack editing
  };

  const toggleStacks = () => {
    setShowStacks(!showStacks);
  };

  return (
    <div className="folder-container">
      <div className="folder-template">
        <div className="folder-image" onClick={toggleStacks}>
          <button className="folder-icon-button">
            <img src={FolderIcon} alt="Folder" />
          </button>
        </div>
        <div className="folder-content">
          <span className="folder-name">{name}</span>
          <button className="folder-edit-button" onClick={onEdit}>
            <img src={EditIcon} alt="Edit" />
          </button>
        </div>
      </div>
      {showStacks && (
        <div className="stacks-container">
          {sets && sets.length > 0 ? (
            sets.map(set => (
              <div key={set._id} className="stack-template">
                <button className="stack-view-button" onClick={(e) => handleViewStack(set._id)}>
                  <img src={create} alt="Edit" />
                </button>
                <span className="stack-name">{set.SetName}</span>
              </div>
            ))
          ) : (
            <div className="empty-folder-message">
              <p>This folder is empty</p>
              <button onClick={handleCreateNewStack}>Create</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


const FolderStacksDisplay = ({ folders, onEditFolder }) => {
  return (
    <section className="folders-and-stacks">
      {folders.map(folder => (
        <FolderContainer key={folder._id} name={folder.className} onEdit={() => onEditFolder(folder._id)} sets={folder.sets} />
      ))}
    </section>
  );
};

export default FolderStacksDisplay;
