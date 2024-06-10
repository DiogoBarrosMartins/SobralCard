import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import CardItem from './CardItem';
import { getCardsByString } from '../services/card-service';

const CardList = ({ searchInput, onCardClick }) => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        if (searchInput) {
            fetchCards(searchInput);
        }
    }, [searchInput]);

    const fetchCards = async (input) => {
        try {
            const fetchedCards = await getCardsByString(input);
            setCards(fetchedCards);
        } catch (error) {
            console.error('Error fetching cards:', error);
            setCards([]);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
            {cards.length === 0 && <Typography>No cards found.</Typography>}
            {cards.map(card => (
                <CardItem key={card.id} card={card} onCardClick={onCardClick} />
            ))}
        </Box>
    );
};

export default CardList;
