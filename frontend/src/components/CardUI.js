import React, { useState } from 'react';
//commit test
function CardUI() {
    const [card, setCard] = useState('');
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');
    const [searchResults, setResults] = useState('');
    const [cardList, setCardList] = useState('');
    const [SetName, setSetName] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [className, setClassName] = useState('');
    const [setIds, setSetIds] = useState([]);
    const [term, setTerm] = useState('');
    const [definition, setDefinition] = useState('');
    const [setId, setSetId] = useState('');
    const [classId, setClassId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
  // Use className and setIds in your component

    const [cards, setCards] = useState([]);

    const app_name = 'largeprojectgroup3'
    function buildPath(route)
    {
    if (process.env.NODE_ENV === 'production')
    {
    return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else
    {
    return 'http://localhost:5000/' + route;
    }
    }
    // Assuming user_data is correctly stored in localStorage
    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud) || {};
    let userId = ud.id || '';

    const handleSearch = async (event) => {
        event.preventDefault(); // Prevent form submission if you're using a form
        if (!searchTerm.trim()) {
            setMessage('Please enter a search term.');
            return;
        }
        await searchItems(userId, searchTerm); // Assuming searchItems is the search function we discussed
    };

    // Update the search term as the user types
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    
    const addCard = async event => {
        event.preventDefault();
        
        // Create an object with the new card details
        let cardObj = { 
            userId: userId, // Make sure userId is defined in your component, fetched from user data
            term: term,
            definition: definition,
            setId: setId // Make sure setId is obtained from the state or props
        };
        let js = JSON.stringify(cardObj);

        try {
            const response = await fetch(buildPath('api/addcard'), {
                method: 'POST',
                body: js,
                headers: {'Content-Type': 'application/json'}
            });

            let res = await response.json();

            if (res.error) {
                setMessage('API Error: ' + res.error);
            } else {
                setMessage('Card has been added');
                setTerm(''); // Clear the input after successful addition
                setDefinition(''); // Clear the input after successful addition
            }
        } catch (e) {
            setMessage(e.toString());
        }
    };

    const addClass = async event => {
        event.preventDefault();
    
        // Ensure userId and className are populated from your form or application state
        let classObj = { userId: userId, className: className };
        let classJson = JSON.stringify(classObj);
    
        try {
            const response = await fetch(buildPath('api/addclass'), {
                method: 'POST',
                body: classJson,
                headers: {'Content-Type': 'application/json'}
            });
    
            let res = await response.json();
    
            if (res.error && res.error.length > 0) {
                setMessage("API Error:" + res.error);
            } else {
                // Notify the user that the class has been added
                setMessage(`Class has been added. Class ID: ${res.classId}`);
    
                // If you have a follow-up action that requires the class ID, you can call it here
                // For example, if you have a function to update sets with this new class ID:
                // updateSetsWithClassId(res.classId);
                
                // This assumes that your backend is indeed returning the `classId` in the response
                // and that `updateSetsWithClassId` is a function you've defined elsewhere
            }
        } catch (e) {
            setMessage(e.toString());
        }
    };
    
    const getClassAndSets = async (classId) => {
        try {
            const url = buildPath(`api/getClassAndSets/${classId}`);
            const response = await fetch(url, {
                method: 'GET', // Method is optional here since GET is the default value
                headers: {'Content-Type': 'application/json'}
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const classAndSets = await response.json();
            console.log('Class and its sets:', classAndSets);
            // Here you can further handle the response, like updating the UI accordingly
        } catch (error) {
            console.error('Error fetching class and sets:', error);
        }
    };
    
    

    
const addSet = async event => {
    event.preventDefault();

    // Assume classId is available and correctly set, representing the class this set belongs to
    let setObj = { UserId: userId, SetName: SetName, public: isPublic, classId: classId }; // Include classId here
    let setJs = JSON.stringify(setObj);

    try {
        const setResponse = await fetch(buildPath('api/addset'), {
            method: 'POST',
            body: setJs,
            headers: {'Content-Type': 'application/json'}
        });

        let setRes = await setResponse.json();

        if (setRes.error && setRes.error.length > 0) {
            setMessage("API Error:" + setRes.error);
            return; // Stop the process if there was an error creating the set
        } else {
            // Set has been successfully created, proceed to add cards
            const setId = setRes.setId; // Get the newly created set's ID

            // Iterate through each card and create it with the new setId
            for (let card of cards) {
                let cardObj = { ...card, UserId: userId, SetId: setId }; // Assuming SetId should remain for card association
                let cardJs = JSON.stringify(cardObj);

                await fetch(buildPath('api/addcard'), {
                    method: 'POST',
                    body: cardJs,
                    headers: {'Content-Type': 'application/json'}
                });
                // Consider handling response for individual card creations
            }

            setMessage('Set and cards have been added');
        }
    } catch (e) {
        setMessage(e.toString());
    }
};
const searchItems = async (userId, searchTerm) => {
    event.preventDefault(); // Prevent default if this is tied to a form submit event

    try {
        // Construct the search URL with query parameters for userId and searchTerm
        const url = buildPath(`api/search?userId=${userId}&searchTerm=${encodeURIComponent(searchTerm)}`);
        const response = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });

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


    
    const fetchSetWithCards = async (setId) => {
        try {
            // Use buildPath to construct the URL
            const url = buildPath(`api/getset/${setId}`);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data; // This includes the set and its associated cards
        } catch (error) {
            console.error("There was an error fetching the set:", error);
            return null;
        }
    };
    
    

      
    
    

    const searchCard = async event => {
        event.preventDefault();
        let obj = { userId: userId, search: search };
        let js = JSON.stringify(obj);

        try {
            const response = await fetch(buildPath('api/searchcards'), {
                method: 'POST',
                body: js,
                headers: {'Content-Type': 'application/json'}
            });

            let res = await response.json();
            let resultText = res.results?.join(', ') || '';
            setResults('Card(s) have been retrieved');
            setCardList(resultText);
        } catch (e) {
            alert(e.toString());
            setResults(e.toString());
        }
    };

    return (
        <div id="accessUIDiv">
            <br />
            <input 
                type="text" 
                id="searchText" 
                placeholder="Card To Search For" 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} // Update searchTerm state on change
            />
            <button 
                type="button" 
                id="searchCardButton" 
                className="buttons" 
                onClick={handleSearch} // Call handleSearch on click
            > 
                Search Card 
            </button>
            <br />
            <span id="cardSearchResult">{searchResults}</span> // Display search results
            <p id="cardList">{cardList}</p> // This might need adjustment based on how you handle and display search results
            <br /><br />
            {/* Term input */}
            <input 
                type="text" 
                id="termInput" 
                placeholder="Term" 
                value={term} 
                onChange={e => setTerm(e.target.value)}
            />
            <br />
            {/* Definition input */}
            <input 
                type="text" 
                id="definitionInput" 
                placeholder="Definition" 
                value={definition} 
                onChange={e => setDefinition(e.target.value)}
            />
            <br />
            <button 
                type="button" 
                id="addCardButton" 
                className="buttons" 
                onClick={addCard}
            > 
                Add Card 
            </button>
            <br />
            <span id="cardAddResult">{message}</span>
        </div>
    );
    
}

export default CardUI;
