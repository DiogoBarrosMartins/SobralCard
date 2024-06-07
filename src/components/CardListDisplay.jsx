// CardListDisplay.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardMedia } from '@mui/material';
import { getCardsByString } from '../services/card-service';

const CardListDisplay = ({ searchInput }) => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        // Fetch cards based on the searchInput when it changes
        fetchCards(searchInput);
    }, [searchInput]);

    const fetchCards = async (searchInput) => {
        try {
            const fetchedCards = await getCardsByString(searchInput); // Use the card service to fetch cards
            setCards(fetchedCards);
        } catch (error) {
            console.error('Error fetching cards:', error);
            // Handle errors, e.g., show an error message to the user
        }
    };

    // Render the cards
    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '20px',
            
        }}>
            {cards.map(card => (
                <Card key={card.id} sx={{ width: 200 }}>
                    <CardMedia
                        component="img"
                        image={card.card}
                        alt={card.name}
                        sx={{height:"100%",  borderRadius: "25px"    }}
                    />
                </Card>
            ))}
        </Box>
    );
};

CardListDisplay.propTypes = {
    searchInput: PropTypes.string.isRequired,
};

export default CardListDisplay;
