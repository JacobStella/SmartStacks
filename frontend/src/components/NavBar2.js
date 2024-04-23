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

    const handleItemClick = (type, item) => {
        // Assuming item._id is the unique folder ID passed here
        const itemId = `folder-${item._id}`;
        localStorage.setItem('folderSearch', itemId); 
        console.log("itemId in navbar", itemId);
        navigate('/library');
        /*
        const itemElement = document.getElementById(itemId);
        if (itemElement) {
            itemElement.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.log('Element not found for ID:', itemId);
        }
        */
        setShowDropdown(false);
    };

    const userLoggedIn = !!userInitial;

    const handleLoginClick = () => {
        localStorage.setItem('preLoginPath', location.pathname);
        navigate('/login');
    };

    const handleLogout = () => {
        localStorage.clear();  // Clear all local storage (adjust if needed)
        navigate('/');  // Redirect to login page
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


//////////////Jacks new seacrch function///////////////
/*
const publicSearch = async event => {
    event.preventDefault();
    let obj = { searchTerm: searchTerm }; // Modified to use searchTerm only
    let js = JSON.stringify(obj);

    try {
        const response = await fetch(buildPath('api/public-search'), { // Assuming 'api/search' is your endpoint
            method: 'POST', // If your backend is expecting a GET request for searches, this needs adjustment
            body: js,
            headers: {'Content-Type': 'application/json'}
        });

        let res = await response.json();

        if (res.error) {
            alert(res.error);
            setResults(res.error);
        } else {
            // Assuming the response structure you want is an array of card details
            // Adjust how you handle and display these results accordingly
            let resultText = res.cards?.map(card => ${card.Term}: ${card.Definition}).join(', ') || '';
            setResults('Card(s) have been retrieved');
            setCardList(resultText);
        }
    } catch (e) {
        alert(e.toString());
        setResults(e.toString());
    }
};
*/
//////////////Jacks new seacrch function///////////////





























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
