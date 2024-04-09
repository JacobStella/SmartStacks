// FolderStacksDisplay.js

import React from 'react';
import FolderIcon from '../images/FolderIcon.png';
import EditIcon from '../images/EditIcon.png';
import '../Library.css';

const FolderTemplate = ({ name, onEdit }) => {
    return (
        <div className="folder-template">
            <div className="folder-image">
                <img src={FolderIcon} alt="Folder" />
            </div>
            <span className="folder-name">{name}</span>
            <button className="folder-edit-button" onClick={onEdit}>
                <img src={EditIcon} alt="Edit" />
            </button>
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


