import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import Header from "../../components/Header";
import {  fetchRandomCardImage } from "../../services/card-service";

const DeckList = () => {
  const [storedLists, setStoredLists] = useState([]);
  const [randomCardImage, setRandomCardImage] = useState('');

 
  useEffect(() => {
    const storedListsString = localStorage.getItem('storedLists');
    if (storedListsString) {
      setStoredLists(JSON.parse(storedListsString));
    }
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const image = await fetchRandomCardImage();
        console.log("Image fetched:", image);
        setRandomCardImage(image); 
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    fetchImage();
  }, []);
  

  
  const handleAddNewList = () => {
    const newListName = prompt('Enter the name of the new list:');
    if (newListName && newListName.trim() !== '') {
      const updatedLists = [...storedLists, { name: newListName }];
      localStorage.setItem('storedLists', JSON.stringify(updatedLists));
      setStoredLists(updatedLists);
    }
  };

  const handleListButtonClick = (index) => {
    const updatedLists = [...storedLists];
    updatedLists.splice(index, 1);
    localStorage.setItem('storedLists', JSON.stringify(updatedLists));
    setStoredLists(updatedLists);
  };

  return (
    <Box height="80vh" width="100%" display="flex" flexDirection="column">
      <Header title="My Lists" subtitle="Your Lists" />
      
      
      
      
      <Box flex="1" display="flex" flexDirection="row" justifyContent="center">
      <Box mx="10px" flex="1" height="80vh">
  <Button
    variant="contained"
    color="primary"
    onClick={handleAddNewList}
    fullWidth
    sx={{
      height: "100%",
      minHeight: "64px",
      backgroundImage: `url(${randomCardImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center', // Center the background image
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px' // Add padding to the button's content
    }}
  >
    Add List
  </Button>
</Box>

        {storedLists.map((list, index) => (
          <Box key={index} mx="10px" flex="1" height="80vh">
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleListButtonClick(index)}
              fullWidth
              sx={{ height: "100%", minHeight: "64px" }}
            >
              {list.name}
            </Button>
          </Box>
          
        ))}
 
      </Box>
    </Box>
  );
};

export default DeckList;
