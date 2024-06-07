
import React from 'react';
import { Typography, Button } from '@mui/material';

const Card = ({ card }) => {
  return (
    <div>
      <Typography variant="h4">{card.name}</Typography>
      {card.card && <img src={card.card} alt={card.name} style={{ maxWidth: '100%', borderRadius: "25px" }} />}
      
      {card.prices && (
        <Typography variant="body1">Price (Euros): {card.prices}</Typography>
      )}
     
    </div>
  );
};

export default Card;
