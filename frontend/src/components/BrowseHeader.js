import React, { useState } from 'react';
import '../Library.css';

const BrowseHeader = ({ handlePublicSearch, publicSearch, setSearchBrowseInput, searchBrowseInputRef }) => {
    const [showDropdown, setShowDropdown] = useState(false);


    const handleSearch = (event) => {
        event.preventDefault();
        handlePublicSearch(event);
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
                <div className="search-container">
                    <input type="text" placeholder="Browse..." className="search-input" value={publicSearch} onChange={(e) => setSearchBrowseInput(e.target.value)} ref={searchBrowseInputRef}/>
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

export default BrowseHeader;
