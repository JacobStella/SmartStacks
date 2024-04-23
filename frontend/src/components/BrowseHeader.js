import '../Library.css';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate} from 'react-router-dom';
const BrowseHeader = ({ /*updatePublicStacks*/}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState({ sets: [], classes: [] });
    const navigate = useNavigate(); // <-- Defined with useNavigate hook
    const searchInputRef = useRef(null);
    useEffect(() => {
        handleSearch(" ");
    }, []);
    function buildPath(route) {
        if (process.env.NODE_ENV === 'production') {
            return 'https://' + 'largeprojectgroup3-efcc1eed906f' + '.herokuapp.com/' + route;
        } else {
            return 'http://localhost:5000/' + route;
        }
    }
    const handleSearch = async (event) => {
        console.log("searchInput", searchInput);
        await fetchPublicSearch(searchInput);
    };
    const fetchPublicSearch = async (searchTerm) => {
        console.log("searchTerm:", searchTerm);
        let obj = { searchTerm: searchTerm };
        let js = JSON.stringify(obj);
        try {
            const response = await fetch(buildPath('api/public-search'), {
                method: 'POST',
                body: js,
                headers: {'Content-Type': 'application/json'}
            });

            let res = await response.json();

            if (res.error) {
                alert(res.error);
            } else {
                console.log("Search results", res);
                // Filter sets with public status true and update state
                const publicSets = res.sets.filter(set => set.public === true);
                //updatePublicStacks(publicSets);
                console.log("publicSets", publicSets);
                setSearchResults(res); // Assuming you still want to keep the original search results
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