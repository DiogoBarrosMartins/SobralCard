import React from 'react';
import { Box } from '@mui/material';
import CardItem from './CardItem';

const CardList = ({ cards, handleCardClick }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
        }}>
            {cards.map(card => (
                <CardItem key={card.id} card={card} handleCardClick={handleCardClick} />
            ))}
        </Box>
    );
};

export default CardList;
