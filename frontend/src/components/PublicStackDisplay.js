/////////////////////////////////////////////
//stack.Description is the description lol

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FolderIcon from '../images/FolderIcon.png';
import EditIcon from '../images/EditIcon.png';
import PlayLightIcon from '../images/playLight.png';
import createLight from '../images/createLight.png';
import '../Library.css';





const StackContainer = ({ stack }) => {
    const [userDetails, setUserDetails] = useState({ FirstName: '', LastName: '', Username: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("in the useEffect my guy AAAAAAAAAAAAAAAAAAAA");
        const fetchUserDetails = async () => {
            setLoading(true);
            try {
                // Replace `YOUR_API_URL` with the actual base URL of your API
                // Replace `stack.userId` with the actual property that contains the user ID
                const response = await fetch(`https://largeprojectgroup3-efcc1eed906f.herokuapp.com/${stack.userId}`);
                if (!response.ok) {
                    throw new Error('User not found');
                }
                const data = await response.json();
                console.log("USER DATA RAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", data);
                setUserDetails({
                    FirstName: data.FirstName,
                    LastName: data.LastName,
                    Username: data.Username
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (stack.userId) {
            fetchUserDetails();
        }
    }, [stack.userId]); // Ensure you have a userId property in your stack object

    const handleViewStack = () => {
        localStorage.setItem("setId", stack._id);
        navigate('/view');
    };

    if (loading) {
        return <p>Loading user information...</p>;
    }

    if (error) {
        return <p>Error loading user information: {error}</p>;
    }

    return (
        <div className="stack-template">
            <div className="stack-content">
                <span className="stack-name">{stack.SetName}</span>
                <p>Created by: {userDetails.FirstName} {userDetails.LastName} ({userDetails.Username})</p>
                <button onClick={handleViewStack}>
                    <img src={PlayLightIcon} alt="View" />
                </button>
                {/* Add other buttons and interactions here */}
            </div>
        </div>
    );
};



  

  
const PublicStacksDisplay = ({ publicStacks }) => {

    useEffect(() => {
        console.log("im in this bitch");
    }, []);
    console.log("in stack display",publicStacks);
    return (
      <section className="stacks-display">
        {publicStacks.map(stack => (
          <StackContainer key={stack._id} stack={stack} />
        ))}
      </section>
    );
  };
  
  export default PublicStacksDisplay;




























/*
const StackContainer = ({name, onEdit, onAdd, sets, isEditing: initialIsEditing }) => {
  const [isEditing, setIsEditing] = useState(initialIsEditing || false);
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
      setIsEditing(true);
    }
  }, [isEditing]);

  const handleEditStart = (e) => {
    e.stopPropagation(); // Prevent any parent handlers from being executed
    setIsEditing(true);
  };

  const handleEditComplete = () => {
    if(name == null){
      onAdd(editedName);
    }
    else if (editedName.trim() !== '' && editedName !== name) {
        onEdit(editedName); // Now just pass the new name
    }
    console.log('Exiting edit mode');
    setTimeout(() => setIsEditing(false), 0);
  };

const handleButtonClick = (e) => {
  e.preventDefault();
  if (isEditing) {
    handleEditComplete();
  } else {
    handleEditStart(e);
  }
};


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleEditComplete();
    }
  };

  const handleBlur = () => {
    setTimeout(handleEditComplete, 0);
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
            <>
              <input
                ref={editInputRef}
                className="folder-name-edit"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
              />
            </>
          ) : (
            <>
              <span className="folder-name">{name}</span>
            </>
          )}
          <button 
            className="folder-edit-button" 
            onClick={handleButtonClick}
          >
            <img src={EditIcon} alt={isEditing ? "Complete" : "Edit"} />
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


const PublicStacksDisplay = ({ publicStacks }) => {
  console.log("folders", folders);
  return (
    <section className="folders-and-stacks">
      {folders.map(folder => (
        <StackContainer key={folder._id} name={folder.className} onEdit={(newName) => onEditFolder(newName, folder._id)} onAdd={onAddFolder}  sets={folder.sets} isEditing={folder.isEditing} />
      ))}
    </section>
  );
};

export default PublicStacksDisplay;
*/