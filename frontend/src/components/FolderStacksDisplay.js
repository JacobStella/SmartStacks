// FolderStacksDisplay.js

import React from 'react';
import FolderIcon from '../images/FolderIcon.png';
import EditIcon from '../images/EditIcon.png';
import '../Library.css';

const FolderTemplate = ({ name }) => {
    return (
        <div className="folder-template">
            <div className="folder-image">
                {/* Placeholder for folder icon */}
                <img src={FolderIcon} alt="Folder" />
            </div>
            <span className="folder-name">{name}</span>
            <button className="folder-action-button">
                {/* Placeholder for button icon */}
                <img src={EditIcon} alt="Action" />
            </button>
        </div>
    );
};

const FolderStacksDisplay = ({ folders, createNewFolder }) => {
    return (
        <section className="folders-and-stacks">
            {folders.map(folder => (
                <FolderTemplate key={folder.id} name={folder.name} />
            ))}
            <button onClick={createNewFolder} className="create-folder-button">
                {/* Assuming you want to use the EditIcon as the 'create new folder' button icon */}
                <img src={EditIcon} alt="Create new folder" />
            </button>
        </section>
    );
};

export default FolderStacksDisplay;

