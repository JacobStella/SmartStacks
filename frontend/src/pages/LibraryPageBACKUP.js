import React, { useState, useEffect } from 'react'; // Import useEffect here
import NavBar2 from '../components/NavBar2';
import LibraryHeader from '../components/LibraryHeader';
import FolderStacksDisplay from '../components/FolderStacksDisplay';
import { useNavigate, useLocation } from 'react-router-dom'; // Removed unused import 'Link'
import '../Library.css';

/*             OLD GETCLASSANDSETS
const getClassAndSets = async (userId) => {
    try {
        const url = buildPath(`api/getClassAndSets/${userId}`);
        console.log(`Fetching from URL: ${url}`); // This will log the full URL being requested
        const response = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        // Before attempting to parse JSON, check if the response is actually JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Received non-JSON response from server");
        }
d
        const classAndSets = await response.json();
        console.log('Classes and their sets:', classAndSets);
    } catch (error) {
        console.error('Error fetching classes and sets:', error);
    }
};
;
*/

const getClassAndSets = async (userId) => {
    try {
        const url = buildPath(`api/getClassAndSets/${userId}`);
        console.log(`Fetching from URL: ${url}`);
        const response = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Received non-JSON response from server");
        }

        const data = await response.json();
        console.log('Classes and their sets:', data);
        return data; // Return the data here
    } catch (error) {
        console.error('Error fetching classes and sets:', error);
        return null; // Return null in case of an error
    }
};



function buildPath(route)
{
    if (process.env.NODE_ENV === 'production')
    {
        return 'https://' + 'largeprojectgroup3-efcc1eed906f' + '.herokuapp.com/' + route;
    }
    else
    {
        return 'http://localhost:5000/' + route;
    }
}

const LibraryPage = () => {
    const [folders, setFolders] = useState([{ id: 1, name: 'Folder 1' }]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const userDataString = localStorage.getItem('user_data');
        if (!userDataString) {
            console.log('No user data found in localStorage.');
            localStorage.setItem('preLoginPath', location.pathname);
            navigate('/login');
        } else {
            const userData = JSON.parse(userDataString);
            if (userData && userData.id) {
                // Fetch classes as soon as we have the user's ID
                getClassAndSets(userData.id).then(classes => {
                    if (classes && classes.length > 0) {
                        setFolders(classes); // Assuming the API returns an array of classes
                    } else {
                        console.log('No classes found for this user.');
                    }
                });
            } else {
                console.log('User data is invalid or ID is missing.');
                navigate('/login');
            }
        }
    }, [navigate, location.pathname]);// Dependence on navigate and location.pathname

    const handleRedirect = () => {
        console.log('Redirecting to login...');
        localStorage.setItem('preLoginPath', location.pathname);
        navigate('/login');
    };

    const getUserData = () => {
        const userDataString = localStorage.getItem('user_data');
        if (!userDataString) {
            console.log('No user data found in localStorage.');
            handleRedirect();
            return null;
        }
        try {
            const userData = JSON.parse(userDataString);
            if (!userData || !userData.id) {
                console.log('User data is invalid or ID is missing.');
                handleRedirect();
                return null;
            }
            return userData;
        } catch (error) {
            console.error('Error parsing user data from localStorage:', error);
            handleRedirect();
            return null;
        }
    };

    const userData = getUserData(); // Attempt to retrieve user data at component mount
/*
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
*/

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


    const addFolder = async (folderName) => {
        if (!userData) return; // Early return if userData is null

        const userId = userData.id;
        let classObj = { userId: userId, className: folderName };
        let classJson = JSON.stringify(classObj);

        try {
            const response = await fetch('api/addclass', { // Ensure this endpoint is correct
                method: 'POST',
                body: classJson,
                headers: {'Content-Type': 'application/json'}
            });

            const res = await response.json();

            if (response.ok) {
                setFolders(prevFolders => [...prevFolders, { id: res.id, name: res.name }]);
                setMessage("Folder has been added.");
            } else {
                setMessage("API Error: " + (res.error || "Failed to add folder."));
            }
        } catch (error) {
            setMessage("API Error: " + error.toString());
        }
    };

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
                <LibraryHeader createNewFolder={createNewFolder} />
                <div className="folder-stacks-display-container">
                    <FolderStacksDisplay folders={folders} onEditFolder={editFolderName} />
                </div>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default LibraryPage;
