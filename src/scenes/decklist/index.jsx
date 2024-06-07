import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';

const DeckList = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [storedLists, setStoredLists] = useState([]);

  useEffect(() => {
    const storedListsString = localStorage.getItem('storedLists');
    if (storedListsString) {
      setStoredLists(JSON.parse(storedListsString));
    }
  }, []);

  const handleAddNewList = () => {
    const newListName = prompt('Enter the name of the new list:');
    if (newListName !== null && newListName.trim() !== '') {
      const updatedLists = [...storedLists, { name: newListName, cards: [] }];
      localStorage.setItem('storedLists', JSON.stringify(updatedLists));
      setStoredLists(updatedLists);
    }
  };

  const handleListButtonClick = (listName) => {
    const selectedList = storedLists.find((list) => list.name === listName);
    const updatedList = { ...selectedList, cards: [...selectedList.cards, ...selectedCards] };

    const updatedLists = storedLists.map((list) => (list.name === listName ? updatedList : list));
    localStorage.setItem('storedLists', JSON.stringify(updatedLists));
    setStoredLists(updatedLists);
    setSelectedCards([]);
  };

  return (
    <Box m="20px">
      <Typography variant="h4" mb="20px">
        My Decks
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddNewList}>
        Add New List
      </Button>
      {storedLists.map((list, index) => (
        <Button key={index} variant="contained" color="primary" onClick={() => handleListButtonClick(list.name)}>
          {list.name}
        </Button>
      ))}
    </Box>
  );
};

export default DeckList;
