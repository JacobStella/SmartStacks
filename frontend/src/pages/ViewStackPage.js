///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//     cards state stores all of the cards for the stack
//     stackName stores the name of the stack 
//     stackDesc this will store the desc of the stack

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
  const [stackName, setStackName] = useState("Stack Title"); // Default value as "Stack Title"
  const [stackDesc, setStackDesc] = useState(""); // Default value as an empty string
  const navigate = useNavigate();
  const location = useLocation();
  

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
      const setId = localStorage.getItem('setId');
      if (!setId) {
        console.log('No setId found in local storage');
      } else {
          fetchSetWithCards(setId).then(data => {
            if (data && data.cards && data.cards.length > 0) {
              setCards(data.cards);
              setStackName(data.SetName);
              setStackDesc(data.Description);
              console.log("fetched cards correctly!");
              console.log(data);
            } else {
              console.log('No cards found for this set.');
            }
          }).catch(error => {
            console.error('Error fetching cards:', error);
          });
        } 
  }, [setCards]);


  const toggleFullScreen = () => {
    const rootElement = document.documentElement; // This assumes the root element should toggle the class

    if (!document.fullscreenElement) {
        rootElement.requestFullscreen().catch((e) => {
            console.error("Fullscreen mode failed: ", e);
        });
        setIsFullScreen(true); // Entering full screen mode
        rootElement.classList.add('fullscreen-active'); // Add the class to hide elements
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        setIsFullScreen(false); // Exiting full screen mode
        rootElement.classList.remove('fullscreen-active'); // Remove the class to show elements
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
        <h1 className="stack-title">{stackName || 'Stack Title'}</h1>
        {cards.length > 0 && (
            <FlipCard
                front={cards[currentIndex].Term}
                back={cards[currentIndex].Definition}
            />
        )}
        <div className="navigation-buttons">
            <button onClick={goToPreviousCard}>&lt; Prev</button>
            <span className="card-counter">{currentIndex + 1}/{cards.length}</span>
            <button onClick={goToNextCard}>Next &gt;</button>
        </div>
        <h1 className="stack-description hide-in-fullscreen">Stack Description:</h1>
        <div className="description-container hide-in-fullscreen">
           {stackDesc && <h2 className="stack-description hide-in-fullscreen">{stackDesc}</h2>}
        </div>
        <div className="all-cards-info hide-in-fullscreen">
        <h1 className="list-view hide-in-fullscreen">List View:</h1>
            {cards.map((card, index) => (
                <div key={index} className="card-info hide-in-fullscreen">
                    <div className="term hide-in-fullscreen">
                        <p> {card.Term}</p>
                    </div>
                    <div className="def hide-in-fullscreen">
                        <p> {card.Definition}</p>
                    </div>
                </div>
            ))}
        </div>
        <div>
            <button onClick={toggleFullScreen} className="full-screen-button">Full Screen</button>
        </div>
    </div>
);

}

export default ViewStackPage;