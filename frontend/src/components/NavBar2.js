import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../NavBar.css';
import logo from '../images/SmartStacksLogo.png';

const NavBar2 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userInitial, setUserInitial] = useState('');
    const [userId, setUserId] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [message, setMessage] = useState("");
    const searchInputRef = useRef(null);
    const [searchResults, setSearchResults] = useState({ sets: [], classes: [] });
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const userDataString = localStorage.getItem('user_data');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            if (userData && userData.firstName) {
                setUserInitial(userData.firstName.charAt(0).toUpperCase());
                setUserId(userData.id);
            } else {
                console.log('User data is present but not valid.');
            }
        }
    }, []);

    const handleItemClick = (type, item) => {
        const itemId = `folder-${item._id}`;
        localStorage.setItem('folderSearch', itemId); 
        console.log("itemId in navbar", itemId);
        navigate('/library');
        setShowDropdown(false);
    };

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
        setShowDropdown(false);
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
                setShowDropdown(true);
            } else {
                setMessage("Search API Error:" + searchResults.error);
            }
        } catch (e) {
            console.error("Search Fetch Error:", e.toString());
            setMessage(e.toString());
        }
    };

    const handleLogout = () => {
        localStorage.clear();  // Clear all local storage (adjust if needed)
        navigate('/login');  // Redirect to login page
    };

    const userLoggedIn = !!userInitial;

    const handleLoginClick = () => {
        localStorage.setItem('preLoginPath', location.pathname);
        navigate('/login');
    };


    return (
        <nav className="navbar">
            <img src={logo} alt="Company Logo" className="navbar-logo" />
            
            <Link to="/" className="nav-button">Home</Link>
            <Link to="/library" className="nav-button">Library</Link>
            <Link to="/create" className="nav-button">Create</Link>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    ref={searchInputRef}
                />
                <button type="submit" onClick={handleSearch}>Search</button>
                {showDropdown && (
                    <div className="search-dropdown-navbar">
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

            {userLoggedIn ? (
                <button className="profile-circle" onClick={handleLogout}>{userInitial}</button>
            ) : (
                <button onClick={handleLoginClick} className="nav-button">Login</button>
            )}
        </nav>
    );
};

export default NavBar2;
