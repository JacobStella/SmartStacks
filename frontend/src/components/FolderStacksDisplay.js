import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FolderIcon from '../images/FolderIcon.png';
import EditIcon from '../images/EditIcon.png';
import PlayLightIcon from '../images/playLight.png';
import createLight from '../images/createLight.png';
import '../Library.css';

const FolderContainer = ({ name, onEdit, sets }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const editInputRef = useRef(null);
  const [showStacks, setShowStacks] = useState(false);
  const navigate = useNavigate();

  const handleCreateNewStack = () => {
    navigate('/create');
  };

  const handleViewStack = (setId) => {
    localStorage.setItem("setId", setId);
    navigate('/view');
  };

  const handleGamePage = (setId) => {
    localStorage.setItem("setId", setId);
    navigate('/game');
  };

  const handleEditStack = (setId, e) => {
    e.stopPropagation(); // Prevent the dropdown from toggling when editing
    // Logic to handle stack editing
  };

  const toggleStacks = () => {
    setShowStacks(!showStacks);
  };

  // Automatically focus and select the input text when editing starts
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleEditStart = (e) => {
    e.stopPropagation(); // Prevent any parent handlers from being executed
    setIsEditing(true);
  };

  const handleEditComplete = () => {
    if (editedName !== name) {
      onEdit(editedName); // Call the onEdit prop with the new name
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEditComplete();
    }
  };

  // ... other functions remain unchanged

  return (
    <div className="folder-container">
      <div className="folder-template">
        <div className="folder-image" onClick={toggleStacks}>
          <button className="folder-icon-button">
            <img src={FolderIcon} alt="Folder" />
          </button>
        </div>
        <div className="folder-content">
          {isEditing ? (
            <input
              ref={editInputRef}
              className="folder-name-edit"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onBlur={handleEditComplete}
              onKeyPress={handleKeyPress}
            />
          ) : (
            <>
              <span className="folder-name">{name}</span>
              <button className="folder-edit-button" onClick={handleEditStart}>
                <img src={EditIcon} alt="Edit" />
              </button>
            </>
          )}
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