import React, { useState } from 'react';
import '../Library.css';

const LibraryHeader = ({ createNewFolder, handleFolderSearch, folderSearch, setSearchFolderInput, searchFolderInputRef, searchResults }) => {
    const [showDropdown, setShowDropdown] = useState(false);

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

    const handleSearch = async (event) => {
        event.preventDefault();
        await searchItems(userId, searchInput);
    };

    const handleItemClick = (type, item) => {
        navigate(`/${type}/${item._id}`); // Update with actual path structure
        setShowDropdown(false); // Hide dropdown after navigation
    };

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
                    <input type="text" placeholder="Search your library..." className="search-input" value={folderSearch} onChange={(e) => setSearchFolderInput(e.target.value)} ref={searchFolderInputRef}/>
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