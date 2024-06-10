import React from 'react';
import { Box, Typography } from '@mui/material';

const CardList = ({ card }) => {
  if (!card) {
    return <Typography color="error">Card data is missing</Typography>;
  }

  const { card: cardImage, name, mana_cost, prices } = card;

  if (!cardImage || !name) {
    return <Typography color="error">Invalid card data</Typography>;
  }

  return (
    <Box display="flex" alignItems="center" gap={2} height="90%" width="80%">
      <img src={cardImage} alt={name} style={{ maxWidth: '80%', maxHeight: '80%', borderRadius: "25px" }} />
      <Box flex="1">
        <Typography variant="h4">{name}</Typography>
        {mana_cost && (
          <Typography variant="body1">Mana Cost: {mana_cost}</Typography>
        )}
        {prices ? (
          <Typography variant="body1">Price: {prices}€</Typography>
        ) : (
          <Typography variant="body1">Priceless</Typography>
        )}
      </Box>
    </Box>
  );
};

export default CardList;
