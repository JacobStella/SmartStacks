import React from 'react';
import '../Library.css';

const LibraryHeader = () => {
    return (
        <header className="library-header">
            <h1>Your Library</h1>
            {/* Search bar */}
            <div className="search-container">
                <input type="text" placeholder="Search your library..." className="search-input"/>
            </div>
            {/* Button for creating a new folder */}
            <button className="new-folder-btn">Create New Folder</button>
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
        </header>
    );
};
