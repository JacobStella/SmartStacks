import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FolderIcon from '../images/FolderIcon.png';
import EditIcon from '../images/EditIcon.png';
import PlayLightIcon from '../images/playLight.png';
import createLight from '../images/createLight.png';
import '../Library.css';

const FolderContainer = ({ name, onEdit, sets }) => {
  const [editing, setEditing] = useState(false);
  const [showStacks, setShowStacks] = useState(false);
  const [folderName, setFolderName] = useState(name); // Store the edited folder name
  const navigate = useNavigate();

  const handleCreateNewStack = () => {
    navigate('/create');
  };

  const handleViewStack = (setId) => {
    navigate(`/view/${setId}`);
  };

  const handleGamePage = (setId) => {
    navigate(`/game/${setId}`);
  };

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const handleInputChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleEditSubmit = () => {
    // Call onEdit with the updated folder name
    onEdit(folderName);
    // Exit editing mode
    setEditing(false);
  };

  return (
    <div className="folder-container">
      <div className="folder-template">
        <div className="folder-image" onClick={toggleEditing}>
          <button className="folder-icon-button">
            <img src={FolderIcon} alt="Folder" />
          </button>
        </div>
        <div className="folder-content">
          {editing ? (
            <input
              type="text"
              value={folderName}
              onChange={handleInputChange}
              onBlur={handleEditSubmit}
              autoFocus // Automatically focus on the input field
            />
          ) : (
            <span className="folder-name">{name}</span>
          )}
          <button className="folder-edit-button" onClick={() => setEditing(true)}> 
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
                  <img src={createLight} alt="Edit" />
                </button>
                <div className="stack-content">
                  <span className="stack-name">{set.SetName}</span>
                  <button className="" onClick={(e) => handleGamePage(set._id)}>
                    <img src={PlayLightIcon} alt="game" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-folder-message">
              <p>This folder is empty</p>
              <button onClick={handleCreateNewStack}>Create new stack</button>
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