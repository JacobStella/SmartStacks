import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Game.css';

const shuffleArray = (array) => {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

const GamePage = () => {
    const [cards, setCards] = useState([]);
    const [displayCards, setDisplayCards] = useState([]);
    const [stackName, setStackName] = useState("Stack Title"); 
    const [stackDesc, setStackDesc] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedCards, setSelectedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState(new Set());
    const [isCorrectMatch, setIsCorrectMatch] = useState(null);
    const [gameCompleted, setGameCompleted] = useState(false);


    function buildPath(route) {
        if (process.env.NODE_ENV === 'production') {
            return 'https://' + 'largeprojectgroup3-efcc1eed906f' + '.herokuapp.com/' + route;
        } else {
            return 'http://localhost:5000/' + route;
        }
    }

    const fetchSetWithCards = async (setId) => {
        try {
            const url = buildPath(`api/getset/${setId}`);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("Data returned by API:", data);
            return data; // Return the entire data object including cards
        } catch (error) {
            console.error("There was an error fetching the set:", error);
            return null;
        }
    };
    const handleCardClick = (card) => {
        if (selectedCards.length < 2) {
          setSelectedCards(prevSelected => [...prevSelected, card]);
        }
      };

      useEffect(() => {
        if (matchedCards.size === cards.length) {
          setGameCompleted(true);
        }
      }, [selectedCards, cards.length, matchedCards.size]);
    
      useEffect(() => {
        if (gameCompleted) {
          navigate('/view');
        }
      }, [gameCompleted, navigate]);

      useEffect(() => {
        let timeoutId = null;
    
        if (selectedCards.length === 2) {
          const [firstCard, secondCard] = selectedCards;
          if (firstCard._id === secondCard._id) {
            // It's a match
            setMatchedCards((prev) => new Set(prev.add(firstCard._id)));
            timeoutId = setTimeout(() => setSelectedCards([]), 1000);
          } else {
            // Not a match
            timeoutId = setTimeout(() => setSelectedCards([]), 1000);
          }
        }
    
        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timeoutId);
      }, [selectedCards]);

      useEffect(() => {
        const userDataString = localStorage.getItem('user_data');
        if (!userDataString) {
          console.log('No user data found in localStorage.');
          localStorage.setItem('preLoginPath', location.pathname);
          navigate('/login');
        } else {
          const setId = localStorage.getItem('setId');
          if (!setId) {
            console.log('No setId found in local storage');
          } else {
            const userData = JSON.parse(userDataString);
            if (userData && userData.id) {
              fetchSetWithCards(setId).then(data => {
                if (data && data.cards && data.cards.length > 0) {
                    setCards(data.cards);
                    setStackName(data.setName);
                  setStackDesc(data.description);
                  console.log("fetched cards correctly!");
                  console.log(data);
    
                  // After setting cards, prepare them for display
                  const selectedCards = data.cards.slice(0, 6);
                  const cardSides = selectedCards.flatMap(card => [
                    { ...card, side: 'Term' },
                    { ...card, side: 'Definition' }
                  ]);
                  const shuffledSides = shuffleArray(cardSides);
                  setDisplayCards(shuffledSides);
                } else {
                  console.log('No cards found for this set.');
                }
              }).catch(error => {
                console.error('Error fetching cards:', error);
              });
            } else {
              console.log('User data is invalid or ID is missing.');
              navigate('/login');
            }
          }
        }
      }, [navigate, location.pathname]);

    // Render function for displaying cards
    const renderCardGrid = () => {
        // Creating a 3x4 grid display
        return (
          <div className="card-grid">
            {displayCards.map((card, index) => (
              <button
                key={index}
                className={`card ${matchedCards.has(card._id) ? 'matched' : ''} ${selectedCards.includes(card) ? 'selected' : ''}`}
                onClick={() => handleCardClick(card)}
                disabled={matchedCards.has(card._id)}
              >
                {card.side === 'Term' ? card.Term : card.Definition}
              </button>
            ))}
          </div>
        );
      };

      const renderPopup = () => {
        if (isCorrectMatch) {
          return <div>Correct Match!</div>;
        } else if (isCorrectMatch === false) {
          return <div>Incorrect Match!</div>;
        }
        return null;
      };

      return (
        <div className="game-page">
          <h1>{stackName}</h1>
          <p>{stackDesc}</p>
          {renderCardGrid()}
          {renderPopup()}
          {gameCompleted && (
            <div>
              You have completed the study game!
              <a href="/view">Return to view stack page</a>
            </div>
          )}
        </div>
      );
    };
    
    export default GamePage;
