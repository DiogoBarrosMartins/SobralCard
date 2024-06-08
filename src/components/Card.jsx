import React from 'react';
import { Typography, Box } from '@mui/material';

const Card = ({ card }) => {
  return (
    <Box display="flex" alignItems="center" gap={2} height="100%">
      {card.card && (
        <Box flex="1" height="100%">
          <img
            src={card.card}
            alt={card.name}
            style={{  borderRadius: '25px', objectFit: 'cover', marginLeft: "20px" }}
          />
        </Box>
      )}
      <Box flex="1" display="flex" flexDirection="column" justifyContent="center">
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
