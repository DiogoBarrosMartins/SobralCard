import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

const SelectedCardsList = ({ selectedCards }) => {
  return (
    <Box>
      <Typography variant="h5">Selected Cards</Typography>
      <ul>
        {selectedCards.map((card, index) => (
          <li key={index}>
            {card.name} - {card.rarity}
          </li>
        ))}
      </ul>
    </Box>
  );
};

SelectedCardsList.propTypes = {
  selectedCards: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      rarity: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SelectedCardsList;
