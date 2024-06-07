
import React from 'react';
import { Typography, Button } from '@mui/material';

const Card = ({ card }) => {
  return (
    <div>
      <Typography variant="h4">{card.name}</Typography>
      {card.card && <img src={card.card} alt={card.name} style={{ maxWidth: '100%', borderRadius: "25px" }} />}
      <Typography variant="body1">Type: {card.type_line}</Typography>
      <Typography variant="body1">Rarity: {card.rarity}</Typography>
      {card.prices && (
        <Typography variant="body1">Price (Euros): {card.prices}</Typography>
      )}
      <Button variant="contained" color="primary" onClick={() => {}}>
        Add to Favorites
      </Button>
    </div>
  );
};

export default Card;
