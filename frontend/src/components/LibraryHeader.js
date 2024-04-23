import React from 'react';
import '../Library.css';

// Add the prop createNewFolder in the function parameter list
const LibraryHeader = ({ createNewFolder, handleFolderSearch, folderSearch, setSearchFolderInput, searchFolderInputRef }) => {
    return (
        <header className="library-header">
            <h1>Your Library</h1>
            <div className="header-controls">
                {/* Dropdown menu for filters */}
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
                {/* Button for creating a new folder, now with onClick event handler */}
                <button className="new-folder-btn" onClick={createNewFolder}>Create New Folder</button>
                {/* Search bar and button */}
                <div className="search-container">
                    <input type="text" placeholder="Search your library..." className="search-input" value={folderSearch} onChange={(e) => setSearchFolderInput(e.target.value)} ref={searchFolderInputRef}/>
                    <button type="submit" className="search-btn" onClick={handleFolderSearch}>Search</button>
                </div>
            </div>
        </header>
    );
};

export default LibraryHeader;
