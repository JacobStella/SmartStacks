import '../Library.css';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate} from 'react-router-dom';

const BrowseHeader = ({ }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState({ sets: [], classes: [] });
    const navigate = useNavigate(); // <-- Defined with useNavigate hook
    const searchInputRef = useRef(null);

    useEffect(() => {
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
        await fetchPublicSearch(searchInput);
    };


      const fetchPublicSearch = async (searchTerm) => {
        let obj = { searchTerm: searchTerm }; // Modified to use searchTerm only
        let js = JSON.stringify(obj);

        try {
            const response = await fetch(buildPath('api/public-search'), { // Assuming 'api/search' is your endpoint
                method: 'GET', // If your backend is expecting a GET request for searches, this needs adjustment
                body: js,
                headers: {'Content-Type': 'application/json'}
            });

            let res = await response.json();

            if (res.error) {
                alert(res.error);
            } else {
                // Assuming the response structure you want is an array of card details
                // Adjust how you handle and display these results accordingly
                console.log("here are the search results", res);
            }
        } catch (e) {
            alert(e.toString());
        }
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
                <div className="search-container">
                    <input type="text" placeholder="Browse..." className="search-input" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} ref={searchInputRef}/>
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

export default BrowseHeader;