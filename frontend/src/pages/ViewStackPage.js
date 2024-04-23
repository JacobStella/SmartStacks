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
  const [flippedIndexes, setFlippedIndexes] = useState(new Set()); // Tracks flipped cards
  const [showSliders, setShowSliders] = useState(new Set()); // Tracks visibility of the difficulty slider for each card

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

  ////////////////////////////////YAP
  const flipCard = (index) => {
    setFlippedIndexes(prev => {
      const newFlipped = new Set(prev);
      if (newFlipped.has(index)) {
        newFlipped.delete(index);
      } else {
        newFlipped.add(index);
      }
      return newFlipped;
    });
  };
  
  const toggleSlider = (index) => {
    setShowSliders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };
  
  const handleDifficultyChange = (event, index) => {
    console.log("Difficulty for card", index, "set to", event.target.value);
    // Implement additional logic here if you need to react to the difficulty change
  };

  /////////////////////////////////////////END YAP

  return (
    <div className="view-stack-page">
        {!isFullScreen && <NavBar2 />}
        {!isFullScreen && <PlayButton />}
        {stackDesc && <h2 className="stack-description">{stackDesc}</h2>} 
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
  <FlipCard
    front={cards[currentIndex].term}
    back={cards[currentIndex].definition}
    isFlipped={flippedIndexes.has(currentIndex)}
    onClick={() => flipCard(currentIndex)}
    onDifficultyChange={(event) => handleDifficultyChange(event, currentIndex)}
    showSlider={showSliders.has(currentIndex)}
    toggleSlider={(e) => {
      e.stopPropagation(); // Prevent card flip when clicking the slider button
      toggleSlider(currentIndex);
    }}
  />
)}

        <div>
            <button onClick={toggleFullScreen} className="full-screen-button">Full Screen</button>
        </div>
    </div>
  );
}

export default ViewStackPage;

