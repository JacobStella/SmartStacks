///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//     cards state stores all of the cards for the stack
//     stackName stores the name of the stack 
//     stackDesc NOT WORKING, this will store the desc of the stack

import React, { useState, useEffect } from 'react';
import NavBar2 from '../components/NavBar2';
import PlayButton from '../components/PlayButton'; 
import FlipCard from '../components/FlipCard'
import { useNavigate, useLocation } from 'react-router-dom';
import '../ViewStack.css';
import '../Web.css';


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

const ViewStackPage = () => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  var stackName;
  var stackDesc;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false); // New state to track full-screen mode

  const goToPreviousCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const goToNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex < cards.length - 1 ? prevIndex + 1 : prevIndex));
  };

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
              stackName = data.setName;
              stackDesc = data.description
              console.log("fetched cards correctly!");
              console.log(data.cards);
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
  }, [navigate, location.pathname, setCards]);


  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error("Fullscreen mode failed: ", e);
      });
      setIsFullScreen(true); // Entering full screen mode
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullScreen(false); // Exiting full screen mode
    }
  };

  // Event listener for fullscreen change
  React.useEffect(() => {
    function handleFullScreenChange() {
      setIsFullScreen(!!document.fullscreenElement);
    }

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  return (
    <div className="view-stack-page">
        {!isFullScreen && <NavBar2 />}
        {!isFullScreen && <PlayButton />}
        {stackDesc && <h2 className="stack-description">{stackDesc}</h2>} {/* This is where you will show the description */}
        <h1 className="stack-title">{stackName || 'Stack Title'}</h1>
        {cards.length > 0 && (
            <FlipCard
                front={cards[currentIndex].term} // Assuming 'term' is the property for the term
                back={cards[currentIndex].definition} // Assuming 'definition' is the property for the definition
            />
        )}
        <div className="navigation-buttons">
            <button onClick={goToPreviousCard}>&lt; Prev</button>
            <span className="card-counter">{currentIndex + 1}/{cards.length}</span>
            <button onClick={goToNextCard}>Next &gt;</button>
        </div>
        {cards.length > 0 && (
            <div className="card-info">
                <p><b>Term:</b> {cards[currentIndex].term}</p>
                <p><b>Definition:</b> {cards[currentIndex].definition}</p>
            </div>
        )}
        <div>
            <button onClick={toggleFullScreen} className="full-screen-button">Full Screen</button>
        </div>
    </div>
  );
}

export default ViewStackPage;