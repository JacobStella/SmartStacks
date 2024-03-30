// libraryPage.js
import React, { useState } from 'react';
import NavBar2 from '../components/NavBar2';
import LibraryHeader from '../components/LibraryHeader';
import FolderStacksDisplay from '../components/FolderStacksDisplay';
import '../Library.css';

const LibraryPage = () => {
    const [folders, setFolders] = useState([{ id: 1, name: 'Folder 1' }]); // Initialized state

    // Function to handle the creation of a new folder
    const createNewFolder = () => {
        const newFolderId = folders.length + 1;
        const newFolderName = `Folder ${newFolderId}`;
        setFolders([...folders, { id: newFolderId, name: newFolderName }]);
    };

    // Function to handle the editing of a folder name
    const editFolderName = (folderId) => {
        const newName = prompt('Enter new folder name:');
        if (newName) {
            const updatedFolders = folders.map(folder => {
                if (folder.id === folderId) {
                    return { ...folder, name: newName };
                }
                return folder;
            });
            setFolders(updatedFolders);
        }
    };

    return (
        <div className="page-container-library">
            <NavBar2 />
            <div className="content-container-library">
                {/* LibraryHeader now receives the createNewFolder function as a prop */}
                <div className="library-header-container">
                    <LibraryHeader createNewFolder={createNewFolder} />
                </div>
                <div className="folder-stacks-display-container">
                    <FolderStacksDisplay folders={folders} onEditFolder={editFolderName} />
                </div>
            </div>
        </div>
    );
}

export default LibraryPage;
