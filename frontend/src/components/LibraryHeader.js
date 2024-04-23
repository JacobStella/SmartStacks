import '../Library.css';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const LibraryHeader = ({ createNewFolder, handleFolderSearch, folderSearch, setSearchFolderInput, searchFolderInputRef }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [userInitial, setUserInitial] = useState('');
    const [userId, setUserId] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [message, setMessage] = useState("");
    const [searchResults, setSearchResults] = useState({ sets: [], classes: [] });
    const navigate = useNavigate(); // <-- Defined with useNavigate hook
    const searchInputRef = useRef(null);



    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    useEffect(() => {
        const userDataString = localStorage.getItem('user_data');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          if (userData && userData.firstName) {
            setUserInitial(userData.firstName.charAt(0).toUpperCase());
            setUserId(userData.id); // Set userId using useState
          } else {
            console.log('User data is present but not valid.');
          }
        }
    }, []);

    function buildPath(route) {
        if (process.env.NODE_ENV === 'production') {
            return 'https://' + 'largeprojectgroup3-efcc1eed906f' + '.herokuapp.com/' + route;
        } else {
            return 'http://localhost:5000/' + route;
        }
    }

    const handleSearch = async (event) => {
        event.preventDefault();
        await searchItems(userId, searchInput);
    };

    const searchItems = async (userId, searchTerm) => {
        setShowDropdown(false); // Hide dropdown before fetching new results
        try {
            const url = buildPath(`api/search?userId=${userId}&searchTerm=${encodeURIComponent(searchTerm)}`);
            const response = await fetch(url, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });
            const searchResults = await response.json();

            if (response.ok) {
                console.log('Search Results:', searchResults);
                setSearchResults({
                    sets: searchResults.sets || [],
                    classes: searchResults.classes || [],
                });
                setShowDropdown(true); // Show dropdown with results
            } else {
                setMessage("Search API Error:" + searchResults.error);
            }
        } catch (e) {
            console.error("Search Fetch Error:", e.toString());
            setMessage(e.toString());
        }
    };

    /*
    const handleItemClick = (type, item) => {
        const itemId = type === 'classes' ? item.className : item.setName;
        console.log('Attempting to find item with ID:', itemId); // Debug log
        const itemElement = document.getElementById(itemId);
        if (itemElement) {
            console.log('Element found, scrolling into view:', itemElement); // Debug log
            itemElement.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.log('Element not found for ID:', itemId); // Debug log
        }
        setShowDropdown(false);
    };
    */

    const handleItemClick = (type, item) => {
        // Assuming item._id is the unique folder ID passed here
        const itemId = `folder-${item._id}`; // This needs to match exactly the ID set in the FolderContainer
        const itemElement = document.getElementById(itemId);
        if (itemElement) {
            itemElement.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.log('Element not found for ID:', itemId);
        }
        setShowDropdown(false);
    };
    
    

    /*
    const handleItemClick = (type, item) => {
        navigate(`/${type}/${item._id}`); // Update with actual path structure
        setShowDropdown(false); // Hide dropdown after navigation
    };
    */

    return (
        <header className="library-header">
            <h1>Your Library</h1>
            <div className="header-controls">
                <div className="filter-dropdown">
                    <select className="filter-select">
                        <option value="">Select Filter</option>
                        <option value="date-asc">Date Ascending</option>
                        <option value="date-desc">Date Descending</option>
                        <option value="name-asc">Name Ascending</option>
                        <option value="name-desc">Name Descending</option>
                        <option value="type">Type</option>
                    </select>
                </div>
                <button className="new-folder-btn" onClick={createNewFolder}>Create New Folder</button>
                <div className="search-container">
                    <input type="text" placeholder="Search your library..." className="search-input" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} ref={searchInputRef}/>
                    <button type="submit" className="search-btn" onClick={handleSearch}>Search</button>
                    {showDropdown && (
                    <div className="search-dropdown">
                        {searchResults.classes.slice(0, 5).map((item, index) => (
                            item.className ? ( 
                                <div key={item._id} onClick={() => handleItemClick('classes', item)}>
                                {item.className}
                                </div>
                            ) : null
                        ))}
                        {searchResults.sets.slice(0, 5).map((item, index) => (
                            item.setName ? ( 
                                <div key={item._id} onClick={() => handleItemClick('sets', item)}>
                                {item.setName}
                                </div>
                            ) : null
                        ))}
                    </div>
                )}
                </div>
            </div>
        </header>
    );
};

export default LibraryHeader;