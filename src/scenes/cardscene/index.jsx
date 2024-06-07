import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Card from '../../components/Card';
import { getCardDetailsByName } from "../../services/card-service";

const CardScene = () => {
  const [searchInput, setSearchInput] = useState('Cosmic Epiphany'); // Update default search input
  const [card, setCard] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const fetchedCard = await getCardDetailsByName(searchInput);
        setCard(fetchedCard);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCard();
  }, [searchInput]);

  return (
    <Box m="20px">
      {error && <div>Error: {error}</div>}
      {card && <Card card={card} />}
    </Box>
  );
};

export default CardScene;
