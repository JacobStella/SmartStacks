import React, { useState } from 'react';
import NavBar2 from '../components/NavBar2';
import LibraryHeader from '../components/LibraryHeader';
import FolderStacksDisplay from '../components/FolderStacksDisplay';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import '../Library.css';

const LibraryPage = () => {
    const [folders, setFolders] = useState([{ id: 1, name: 'Folder 1' }]);
    const [message, setMessage] = useState(""); // For API call feedback
    const navigate = useNavigate(); // Initialize useNavigate hook

    // Function to retrieve user data from localStorage
    const getUserData = () => {
        const userDataString = localStorage.getItem('user_data');
        if (!userDataString) {
            console.log('No user data found in localStorage.');
            localStorage.setItem('preLoginPath', window.location.pathname); // Store the current path
            navigate('/login'); // Redirect to login
            return null; // It's important to return here to avoid further execution in this case
        }
        try {
            const userData = JSON.parse(userDataString);
            return userData;
        } catch (error) {
            console.error('Error parsing user data from localStorage:', error);
            return null;
        }
    };

    const userData = getUserData(); // Retrieve user data at the beginning

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
    }; // Missing closing brace for editFolderName function was added

    const addFolder = async (folderName) => {
        if (!userData) { // Ensure userData is not null before proceeding
            console.log('No user data available.');
            return;
        }
        const userId = userData.id;
        let classObj = { userId, className: folderName };
        let classJson = JSON.stringify(classObj);

        try {
            const response = await fetch('http://localhost:5000/api/addclass', { // Update your API endpoint accordingly
                method: 'POST',
                body: classJson,
                headers: {'Content-Type': 'application/json'}
            });

            const res = await response.json();

            if (response.ok) {
                // Assuming the API response includes the folder's ID and name
                setFolders(prevFolders => [...prevFolders, { id: res.id, name: res.name }]);
                setMessage("Folder has been added.");
            } else {
                setMessage("API Error: " + (res.error || "Failed to add folder."));
            }
        } catch (error) {
            setMessage("API Error: " + error.toString());
        }
    };

    // Function to handle the creation of a new folder with user input
    const createNewFolder = () => {
        const folderName = prompt('Enter folder name:');
        if (folderName) {
            addFolder(folderName);
        }
    };

    return (
        <div className="page-container-library">
            <NavBar2 />
            <div className="content-container-library">
                <div className="library-header-container">
                    <LibraryHeader createNewFolder={createNewFolder} />
                </div>
                <div className="folder-stacks-display-container">
                    <FolderStacksDisplay folders={folders} onEditFolder={editFolderName} />
                </div>
                {message && <p>{message}</p>} {/* Display feedback messages */}
            </div>
        </div>
    );
};

export default LibraryPage;
