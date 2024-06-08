import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import Header from "../../components/Header";

const DeckList = () => {
  const [storedLists, setStoredLists] = useState([]);

  useEffect(() => {
    const storedListsString = localStorage.getItem('storedLists');
    if (storedListsString) {
      setStoredLists(JSON.parse(storedListsString));
    }
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
        {/* Render stored lists */}
        {storedLists.map((list, index) => (
          <Box key={index} mx="10px" flex="1" height="80vh">
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleListButtonClick(index)}
              fullWidth
              sx={{ height: "100%", minHeight: "64px" }} // Set a minimum height for the button
            >
              {list.name}
            </Button>
          </Box>
        ))}
        {/* Button to add new list */}
        <Box mx="10px" flex="1" height="80vh">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewList}
            fullWidth
            sx={{ height: "100%", minHeight: "64px" }} // Set a minimum height for the button
          >
            Add List
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DeckList;
