import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardMedia } from '@mui/material';
import { getCardsByString } from '../../services/card-service';
import CardListDisplay from '../../components/CardListDisplay';

const CardSearchScene = ({ searchInput }) => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetchCards(searchInput);
    }, [searchInput]);

    const fetchCards = async (searchInput) => {
        try {
            const fetchedCards = await getCardsByString(searchInput);
            setCards(fetchedCards);
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    };

    const handleCardClick = (cardId) => {
        // Navigate to the specified list URL programmatically
        window.location.href = `/list/${cardId}`;
    };

    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '20px',
        }}>
            {cards.map(card => (
                <Card
                    key={card.id}
                    onClick={() => handleCardClick(card.id)} // Call handleCardClick on card click
                    sx={{ width: 200, cursor: 'pointer' }} // Add cursor pointer style
                >
                    <CardMedia
                        component="img"
                        image={card.card}
                        alt={card.name}
                        sx={{ height: "100%", borderRadius: "25px" }}
                    />
                </Card>
            ))}
        </Box>
    );
};

CardListDisplay.propTypes = {
    searchInput: PropTypes.string.isRequired,
};

export default CardSearchScene;
