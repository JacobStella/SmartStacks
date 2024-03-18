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
        let obj = { userId: userId, className: className, setIds: setIds }; // Ensure you have the correct variables declared
        let js = JSON.stringify(obj);
    
        try {
            const response = await fetch(buildPath('api/addclass'), {
                method: 'POST',
                body: js,
                headers: {'Content-Type': 'application/json'}
            });
    
            let res = await response.json();
    
            if (res.error && res.error.length > 0) {
                setMessage("API Error:" + res.error);
            } else {
                setMessage('Class has been added');
            }
        } catch (e) {
            setMessage(e.toString());
        }
    };
    const addSet = async event => {
        event.preventDefault();
    
        // First, create the set without including cards
        let setObj = { UserId: userId, SetName: SetName, public: isPublic };
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
                    let cardObj = { ...card, UserId: userId, SetId: setId };
                    let cardJs = JSON.stringify(cardObj);
    
                    await fetch(buildPath('api/addcard'), {
                        method: 'POST',
                        body: cardJs,
                        headers: {'Content-Type': 'application/json'}
                    });
                    // Note: Here we're not handling the response for individual card creations.
                    // You might want to add logic to handle errors or confirmations for each card.
                }
    
                setMessage('Set and cards have been added');
            }
        } catch (e) {
            setMessage(e.toString());
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
            <input type="text" id="searchText" placeholder="Card To Search For" value={search} onChange={e => setSearch(e.target.value)} />
            <button type="button" id="searchCardButton" className="buttons" onClick={searchCard}> Search Card </button>
            <br />
            <span id="cardSearchResult">{searchResults}</span>
            <p id="cardList">{cardList}</p>
            <br /><br />
            <input type="text" id="cardText" placeholder="Card To Add" value={card} onChange={e => setCard(e.target.value)} />
            <button type="button" id="addCardButton" className="buttons" onClick={addCard}> Add Card </button>
            <br />
            <span id="cardAddResult">{message}</span>
        </div>
    );
}

export default CardUI;
