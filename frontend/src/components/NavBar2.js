import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../NavBar.css';
import logo from '../images/browse.png';

const NavBar2 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userInitial, setUserInitial] = useState('');
    const [userId, setUserId] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [message, setMessage] = useState("");
    const searchInputRef = useRef(null);

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
        try {
            const url = buildPath(`api/search?userId=${userId}&searchTerm=${encodeURIComponent(searchTerm)}`);
            const response = await fetch(url, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });
            const searchResults = await response.json();

            if (response.ok) {
                console.log('Search Results:', searchResults);
            } else {
                setMessage("Search API Error:" + searchResults.error);
            }
        } catch (e) {
            console.error("Search Fetch Error:", e.toString());
            setMessage(e.toString());
        }
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
                <input type="text" placeholder="Search..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} ref={searchInputRef} /> 
                <button type="submit" onClick={handleSearch}>Search</button> 
            </div>

            {userLoggedIn ? (
                <div className="profile-circle">{userInitial}</div>
            ) : (
                <button onClick={handleLoginClick} className="nav-button">Login</button>
            )}
        </nav>
    );
};

export default NavBar2;






























/*
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../NavBar.css';
import logo from '../images/browse.png';

const NavBar2 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userInitial, setUserInitial] = useState('');
    const [message, setMessage] = useState("");
    var searchInput;
    var userId;



    useEffect(() => {
        const userDataString = localStorage.getItem('user_data');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          if (userData && userData.firstName) { // Check if firstName is present
            // Use the first character of firstName or lastName, whichever you prefer
            setUserInitial(userData.firstName.charAt(0).toUpperCase());
            userId = userData.id;

          } else {
            console.log('User data is present but not valid.');
          }
        }
      }, []);

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


      const handleSearch = async (event) => {
        event.preventDefault(); // Prevent form submission if you're using a form
        
        await searchItems(userId, searchInput); // Assuming searchItems is the search function we discussed
    };

    
     const searchItems = async (userId, searchTerm) => {
    try {
        // Construct the search URL with query parameters for userId and searchTerm
        const url = buildPath(`api/search?userId=${userId}&searchTerm=${encodeURIComponent(searchTerm)}`);
        const response = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        console.log("userId", userId);
        console.log("searchTerm", searchTerm);
        const searchResults = await response.json();

        if (response.ok) {
            // Handle the search results
            console.log('Search Results:', searchResults);
            // Here, you can update the state or DOM with searchResults.classes, searchResults.sets, and searchResults.cards
            // For example:
            // updateSearchResults(searchResults); // A function you'd define to update your UI with the results
        } else {
            // Handle errors returned from the server
            setMessage("Search API Error:" + searchResults.error);
        }
    } catch (e) {
        // Handle errors in fetching from the search API
        console.error("Search Fetch Error:", e.toString());
        setMessage(e.toString());
    }
 };
      

    const userLoggedIn = !!userInitial; // Boolean conversion: if userInitial is a non-empty string, userLoggedIn is true

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
                <input type="text" placeholder="Search..." ref={(c) => searchInput = c} /> 
                <button type="submit" onClick={handleSearch}>Search</button> 
            </div>


            {userLoggedIn ? (
                <div className="profile-circle">{userInitial}</div>
            ) : (
                <button onClick={handleLoginClick} className="nav-button">Login</button>
            )}
        </nav>
    );
};

export default NavBar2;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////SEARCH STUFF/////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////


  

 /*
    // Update the search term as the user types
    //NEVER CALLED MAY NEED TO UNFUCK
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    */
   
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////SEARCH STUFF/////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
