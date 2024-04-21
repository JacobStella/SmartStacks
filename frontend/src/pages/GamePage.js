import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Game.css';

const ViewStackPage = () => {
    const [cards, setCards] = useState([]);
    const [stackName, setStackName] = useState("Stack Title"); // Default value as "Stack Title"
    const [stackDesc, setStackDesc] = useState(""); // Default value as an empty string
    const navigate = useNavigate();
    const location = useLocation();

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
}

  export default GamePage;