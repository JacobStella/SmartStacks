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
  const [cards, setCards] = useState([
    { front: 'Front 1', back: 'Back 1' },
    { front: 'Front 2', back: 'Back 2' },
    { front: 'Front 3', back: 'Back 3' },
    // ... more cards
  ]);
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

useEffect(() => {
  const userDataString = localStorage.getItem('user_data');
  if (!userDataString) {
      console.log('No user data found in localStorage.');
      localStorage.setItem('preLoginPath', location.pathname);
      navigate('/login');
  } else {
      const setId = localStorage.getItem('setId');
      if(!setId){
        console.log('no setId found in local storage');
      }else{
      const userData = JSON.parse(userDataString);
      if (userData && userData.id) {
          // Fetch classes as soon as we have the user's ID
          fetchSetWithCards(setId).then(classes => {
              if (classes && classes.length > 0) {
                  setCards(classes); // Assuming the API returns an array of classes
                  console.log("class useStste stuff")
                  console.log(classes);
              } else {
                  console.log('No classes found for this user.');
              }
          });
      } else {
          console.log('User data is invalid or ID is missing.');
          navigate('/login');
      }
    }
  }
}, [navigate, location.pathname]);

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
      <h1 className="stack-title">Stack Title</h1>
      {cards.length > 0 && (
        <FlipCard
          front={cards[currentIndex].front}
          back={cards[currentIndex].back}
        />
      )}
      <div className="navigation-buttons">
        <button onClick={goToPreviousCard}>&lt; Prev</button>
        <span className="card-counter">{currentIndex + 1}/{cards.length}</span>
        <button onClick={goToNextCard}>Next &gt;</button>
      </div>
      <div>
        <button onClick={toggleFullScreen} className="full-screen-button">Full Screen</button>
      </div>
    </div>
  );
}

export default ViewStackPage;




