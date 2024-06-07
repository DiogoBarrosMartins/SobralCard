// CardListDisplay.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardMedia, Link } from '@mui/material';
import { getCardsByString } from '../services/card-service';

const CardListDisplay = ({ searchInput }) => {
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

    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '20px',
        }}>
            {cards.map(card => (
                <Link key={card.id} href={`/card?name=${encodeURIComponent(card.name)}`} sx={{ textDecoration: 'none' }}>
                    <Card sx={{ width: 200 }}>
                        <CardMedia
                            component="img"
                            image={card.card}
                            alt={card.name}
                            sx={{ height: "100%", borderRadius: "25px" }}
                        />
                    </Card>
                </Link>
            ))}
        </Box>
    );
};

CardListDisplay.propTypes = {
    searchInput: PropTypes.string.isRequired,
};

export default CardListDisplay;
