import React, { useState } from 'react';
import '../Library.css';

const LibraryHeader = ({ createNewFolder, handleFolderSearch, folderSearch, setSearchFolderInput, searchFolderInputRef, searchResults, handleSearchItemClick }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        handleFolderSearch(event);
        setShowDropdown(true); // Show dropdown after search
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
                    {showDropdown && searchResults && (
                        <div className="search-dropdown">
                            {searchResults.classes.slice(0, 5).map((item, index) => (
                                <div key={item._id} onClick={() => handleSearchItemClick('classes', item)}>
                                    {item.className}
                                </div>
                            ))}
                            {searchResults.sets.slice(0, 5).map((item, index) => (
                                <div key={item._id} onClick={() => handleSearchItemClick('sets', item)}>
                                    {item.setName}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default LibraryHeader;