import React from 'react';
import { useNavigate } from 'react-router-dom';
import FolderIcon from '../images/FolderIcon.png';
import EditIcon from '../images/EditIcon.png';
import '../Library.css';

const FolderTemplate = ({ folder, onEditFolder }) => {
  const navigate = useNavigate();

  const handleCreateNewStack = () => {
    navigate('/create');
  };

  const handleViewStack = (setId) => {
    navigate(`/view/${setId}`);
  };

  const handleEditStack = (setId) => {
    // Logic to handle stack editing
  };

  return (
    <div className="folder-template">
      <div className="folder-image">
        <img src={FolderIcon} alt="Folder" onClick={() => onEditFolder(folder._id)} />
      </div>
      <div className="folder-content">
        <span className="folder-name">{folder.className}</span>
        <button className="folder-edit-button" onClick={() => onEditFolder(folder._id)}>
          <img src={EditIcon} alt="Edit" />
        </button>
        <div className="stacks-container">
          {folder.sets && folder.sets.length > 0 ? (
            folder.sets.map(set => (
              <div key={set._id} className="stack-template" onClick={() => handleViewStack(set._id)}>
                <span className="stack-name">{set.className}</span>
                <button className="stack-edit-button" onClick={(e) => { e.stopPropagation(); handleEditStack(set._id); }}>
                  <img src={EditIcon} alt="Edit" />
                </button>
              </div>
            ))
          ) : (
            <div className="empty-folder-message">
              <p>This folder is empty</p>
              <button onClick={handleCreateNewStack}>Create</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FolderStacksDisplay = ({ folders, onEditFolder }) => {
  return (
    <section className="folders-and-stacks">
      {folders.map(folder => (
        <FolderTemplate key={folder._id} name={folder.className} onEdit={() => onEditFolder(folder._id)} />
      ))}
    </section>
  );
};

export default FolderStacksDisplay;
