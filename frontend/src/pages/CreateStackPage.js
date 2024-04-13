import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar2 from '../components/NavBar2';
import LandingFooter from '../components/LandingFooter';
import '../CreateStack.css';
import '../Web.css';

// Updated CardPair component to include inputs handling
const CardPair = ({ onMoveUp, onMoveDown, index, card, updateCard }) => (
  <div className="term-definition-pair">
    <input type="text" placeholder="Enter term" className="term-input" value={card.term} onChange={e => updateCard(index, 'term', e.target.value)} />
    <input type="text" placeholder="Enter definition" className="definition-input" value={card.definition} onChange={e => updateCard(index, 'definition', e.target.value)} />
    <button onClick={() => onMoveUp(index)} className="arrow-button">↑</button>
    <button onClick={() => onMoveDown(index)} className="arrow-button">↓</button>
  </div>
);

const CreateStackPage = () => {
  const [cardPairs, setCardPairs] = useState(Array.from({ length: 3 }, () => ({ term: '', definition: '' })));
  const [isPublic, setIsPublic] = useState(true);
  const [folders, setFolders] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState('');
  const [stackTitle, setStackTitle] = useState('');
  const [stackDescription, setStackDescription] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle updating card values
  const updateCard = (index, field, value) => {
    const newCardPairs = [...cardPairs];
    newCardPairs[index][field] = value;
    setCardPairs(newCardPairs);
  };

  // Function to move a card pair up
  const moveCardUp = index => {
    if (index === 0) return;
    const newCardPairs = [...cardPairs];
    [newCardPairs[index - 1], newCardPairs[index]] = [newCardPairs[index], newCardPairs[index - 1]];
    setCardPairs(newCardPairs);
  };

  // Function to move a card pair down
  const moveCardDown = index => {
    if (index === cardPairs.length - 1) return;
    const newCardPairs = [...cardPairs];
    [newCardPairs[index + 1], newCardPairs[index]] = [newCardPairs[index], newCardPairs[index + 1]];
    setCardPairs(newCardPairs);
  };

  // Function to add a new card pair
  const addCardPair = () => {
    setCardPairs([...cardPairs, { term: '', definition: '' }]);
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

const handleRedirect = () => {
  console.log('Redirecting to login...');
  localStorage.setItem('preLoginPath', location.pathname);
  navigate('/login');
};

const getUserData = () => {
  const userDataString = localStorage.getItem('user_data');
  if (!userDataString) {
      console.log('No user data found in localStorage.');
      handleRedirect();
      return null;
  }
  try {
      const userData = JSON.parse(userDataString);
      if (!userData || !userData.id) {
          console.log('User data is invalid or ID is missing.');
          handleRedirect();
          return null;
      }
      return userData;
  } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      handleRedirect();
      return null;
  }
};

const userData = getUserData();

  // Function to create a new set
  const addSet = async () => {
    if (!userData) return; // Early return if userData is null

    const userId = userData.id;
    const newSet = {
      userId: userId,
      setName: stackTitle,
      public: isPublic,
      classId: selectedFolderId,
      cards: cardPairs,
    };

    try {
      const response = await fetch(buildPath('api/addset'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSet),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to create the set.");

      setMessage("Set created successfully.");
      //navigate('/library'); // Redirect to the library page or wherever appropriate
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

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
                    //console.log("class useStste stuff")
                    //console.log(classes);
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
        <input type="text" placeholder="Title" className="title-input" value={stackTitle} onChange={e => setStackTitle(e.target.value)} />
        <div className="description-switch-container">
          <textarea placeholder="Description..." className="description-input" value={stackDescription} onChange={e => setStackDescription(e.target.value)}></textarea>
          <label className="switch">
            <input type="checkbox" checked={isPublic} onChange={toggleSwitch} />
            <span className="slider round"></span>
          </label>
          <span className="switch-label">{isPublic ? 'Public' : 'Private'}</span>
        </div>
        <select className="folder-input" value={selectedFolderId} onChange={e => setSelectedFolderId(e.target.value)}>
          {folders.map(folder => (<option key={folder._id} value={folder._id}>{folder.className}</option>))}
        </select>
        <div className="terms-container">
          {cardPairs.map((card, index) => (
            <CardPair
              key={index}
              index={index}
              card={card}
              onMoveUp={moveCardUp}
              onMoveDown={moveCardDown}
              updateCard={updateCard}
            />
          ))}
        </div>
        <button onClick={addCardPair} className="add-card-button">+ Add Card</button>
        <button onClick={addSet} className="create-button">Create</button>
      </div>
      <LandingFooter />
    </div>
  );
}

export default CreateStackPage;

