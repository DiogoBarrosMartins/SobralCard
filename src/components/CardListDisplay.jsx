import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardMedia, Link as MuiLink, Typography } from '@mui/material';
import { getCardsByString } from '../services/card-service';

const CardListDisplay = ({ searchInput, onCardClick }) => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetchCards(searchInput);
    }, [searchInput]);

    const fetchCards = async (input) => {
        try {
            console.log(`Fetching cards for input: ${input}`);
            const fetchedCards = await getCardsByString(input);
            console.log('Fetched cards:', fetchedCards);
            setCards(fetchedCards);
        } catch (error) {
            console.error('Error fetching cards:', error);
            setCards([]); // Set to empty array on error
        }
    };

    const handleCardClick = (card) => {
        onCardClick(card);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '20px',
        }}>
            {cards.length === 0 && <Typography>No cards found.</Typography>}
            {cards.map(card => (
                <MuiLink 
                    key={card.id} 
                    component="button"
                    onClick={() => handleCardClick(card)} 
                    sx={{ textDecoration: 'none' }}
                >
                    <Card sx={{ width: 200, cursor: 'pointer' }}>
                        <CardMedia
                            component="img"
                            image={card.card}
                            alt={card.name}
                            sx={{ height: "100%", borderRadius: "25px" }}
                        />
                    </Card>
                </MuiLink>
            ))}
        </Box>
    );
};

CardListDisplay.propTypes = {
    searchInput: PropTypes.string.isRequired,
    onCardClick: PropTypes.func.isRequired,
};

export default CardListDisplay;
