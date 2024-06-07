import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import Card from '../../components/Card';
import { getCardDetailsByName } from "../../services/card-service";
import { Link } from 'react-router-dom';

const CardScene = () => {
  const [searchInput, setSearchInput] = useState('Cosmic Epiphany');
  const [card, setCard] = useState(null);
  const [error, setError] = useState(null);
  const handleGoBack = () => {
    window.location.href = "/";
  };
  useEffect(() => {
    const fetchCard = async () => {
      try {
        const fetchedCard = await getCardDetailsByName(searchInput);
        if (fetchedCard) {
          setCard(fetchedCard);
        } else {
          setError("No card found");
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCard();
  }, [searchInput]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

 

  const handleSearchClick = async () => {
    try {
      const fetchedCard = await getCardDetailsByName(searchInput);
      if (fetchedCard) {
        setCard(fetchedCard);
      } else {
        setError("No card found");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box m="20px">
      <Typography variant="h4" mb="20px">
        Magic Card Scene
      </Typography>
      <Box mb="20px" display="flex" alignItems="center">
        <TextField
          label="Search"
          variant="outlined"
          value={searchInput}
          onChange={handleSearchChange}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSearchClick}>
          Search
        </Button>
        
        <Link to="/" style={{ textDecoration: 'none' }}>
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Go back 
      </Button>
    </Link>
      </Box>
      {error && <div>Error: {error}</div>}
      {card && <Card card={card} />}
    </Box>
  );
};

export default CardScene;
