// libraryPage.js
import React, { useState } from 'react';
import NavBar2 from '../components/NavBar2';
import LibraryHeader from '../components/LibraryHeader';
import FolderStacksDisplay from '../components/FolderStacksDisplay';
import '../Library.css';

const LibraryPage = () => {
    const [folders, setFolders] = useState([{ id: 1, name: 'Folder 1' }]); // Initialize with a default folder

    // Function to handle the creation of a new folder
    const createNewFolder = () => {
        const newFolderId = folders.length + 1; // Ensure unique ID for key prop
        const newFolderName = `Folder ${newFolderId}`;
        setFolders([...folders, { id: newFolderId, name: newFolderName }]);
    };

    return (
        <div className="page-container-library">
            <NavBar2 />
            <div className="content-container-library">
                <div className="library-header-container">
                    <LibraryHeader />
                </div>
                <div className="folder-stacks-display-container">
                    {/* Pass folders and createNewFolder to FolderStacksDisplay */}
                    <FolderStacksDisplay folders={folders} createNewFolder={createNewFolder} />
                </div>
            </div>
        </div>
    );
}

export default LibraryPage;
