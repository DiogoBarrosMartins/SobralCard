import React from 'react';
import { Typography, Box } from '@mui/material';

const Card = ({ card }) => {
  return (
    <Box display="flex" alignItems="center" gap={2} height="90%" width="80%">
      {card.card && <img src={card.card} alt={card.name} style={{ maxWidth: '80%', maxHeight: '80%',borderRadius: "25px" }} />}
      <Box flex="1">
        <Typography variant="h4">{card.name}</Typography>
        {card.prices ? (
          <Typography variant="body1">Price: {card.prices}€</Typography>
        ) : (
          <Typography variant="body1">Priceless</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Card;
