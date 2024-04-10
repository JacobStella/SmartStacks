import React, { useState, useEffect } from 'react'; // Import useEffect here
import { useNavigate, useLocation } from 'react-router-dom'; // Removed unused import 'Link'
import NavBar2 from '../components/NavBar2';
import LandingFooter from '../components/LandingFooter';
import '../CreateStack.css';
import '../Web.css';

// Updated CardPair component with arrow buttons and move functionality
const CardPair = ({ onMoveUp, onMoveDown, index }) => (
  <div className="term-definition-pair">
    <input type="text" placeholder="Enter term" className="term-input" />
    <input type="text" placeholder="Enter definition" className="definition-input" />
    <button onClick={() => onMoveUp(index)} className="arrow-button">↑</button>
    <button onClick={() => onMoveDown(index)} className="arrow-button">↓</button>
  </div>
);

const CreateStackPage = () => {
  const [cardPairs, setCardPairs] = useState(Array.from({ length: 3 }, (_, index) => ({ id: index })));
  const [isPublic, setIsPublic] = useState(true);
  const [folders, setFolders] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();


  // Function to move a card pair up
  const moveCardUp = (index) => {
    if (index === 0) return;
    const newCardPairs = [...cardPairs];
    [newCardPairs[index], newCardPairs[index - 1]] = [newCardPairs[index - 1], newCardPairs[index]];
    setCardPairs(newCardPairs);
  };

  // Function to move a card pair down
  const moveCardDown = (index) => {
    if (index === cardPairs.length - 1) return;
    const newCardPairs = [...cardPairs];
    [newCardPairs[index], newCardPairs[index + 1]] = [newCardPairs[index + 1], newCardPairs[index]];
    setCardPairs(newCardPairs);
  };

  // Function to add a new card pair
  const addCardPair = () => {
    setCardPairs([...cardPairs, { id: cardPairs.length }]);
  };

  // Function to toggle the switch between public and private
  const toggleSwitch = () => {
    setIsPublic(!isPublic);
  };

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

  const getClassAndSets = async (userId) => {
    try {
        const url = buildPath(`api/getClassAndSets/${userId}`);
        console.log(`Fetching from URL: ${url}`);
        const response = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Received non-JSON response from server");
        }

        const data = await response.json();
        //console.log('Classes and their sets:', data);
        return data; // Return the data here
    } catch (error) {
        console.error('Error fetching classes and sets:', error);
        return null; // Return null in case of an error
    }
};

  useEffect(() => {
    const userDataString = localStorage.getItem('user_data');
    if (!userDataString) {
        console.log('No user data found in localStorage.');
        localStorage.setItem('preLoginPath', location.pathname);
        navigate('/login');
    } else {
        const userData = JSON.parse(userDataString);
        if (userData && userData.id) {
            // Fetch classes as soon as we have the user's ID
            getClassAndSets(userData.id).then(classes => {
                if (classes && classes.length > 0) {
                    setFolders(classes); // Assuming the API returns an array of classes
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
}, [navigate, location.pathname]);

  return (
    <div className="page-container-landing">
      <NavBar2 />
      <div className="create-study-set-container">
        <h1>Create new stack</h1>
        <input type="text" placeholder="Title" className="title-input" />

        <div className="description-switch-container">
          <textarea placeholder="Description..." className="description-input"></textarea>
          {/* Switch element */}
          <label className="switch">
            <input type="checkbox" checked={isPublic} onChange={toggleSwitch} />
            <span className="slider round"></span>
          </label>
          <span className="switch-label">{isPublic ? 'Public' : 'Private'}</span>
        </div>

        <select className="folder-input">
          {folders.map(folder => (<option key={folder._id} value={folder._id}>{folder.className}</option>))}
        </select>

        <div className="terms-container">
          {cardPairs.map((cardPair, index) => (
            <CardPair
              key={cardPair.id}
              index={index}
              onMoveUp={moveCardUp}
              onMoveDown={moveCardDown}
            />
          ))}
        </div>

        <button onClick={addCardPair} className="add-card-button">+ Add Card</button>
        <button className="create-button">Create</button>
      </div>
      <LandingFooter />
    </div>
  );
}

export default CreateStackPage;
