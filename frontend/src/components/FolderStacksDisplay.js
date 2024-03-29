// FolderStacksDisplay.js

import React from 'react';
import '../Library.css';

const FolderTemplate = ({ name }) => {
    return (
        <div className="folder-template">
            <div className="folder-image">
                {/* Placeholder for folder icon */}
                <img src="./images/FolderIcon.png" alt="Folder" />
            </div>
            <span className="folder-name">{name}</span>
            <button className="folder-action-button">
                {/* Placeholder for button icon */}
                <img src="./images/EditIcon.png" alt="Action" />
            </button>
        </div>
    );
};

const FolderStacksDisplay = () => {
    // Sample data - eventually this would be dynamic
    const folders = [
        { id: 1, name: 'Folder 1' },
        // ... other folders
    ];

    return (
        <section className="folders-and-stacks">
            {/* Map over your folders to display them */}
            {folders.map(folder => (
                <FolderTemplate key={folder.id} name={folder.name} />
            ))}
        </section>
    );
};

export default FolderStacksDisplay;
