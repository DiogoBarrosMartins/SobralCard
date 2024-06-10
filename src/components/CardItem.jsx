import React from 'react';
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';

const CardItem = ({ card, onCardClick }) => {
    const handleClick = () => {
        if (onCardClick) {
            onCardClick(card);
        } else {
            console.error('onCardClick is not a function');
        }
    };

    return (
        <Box component="button" onClick={handleClick} sx={{ textDecoration: 'none', cursor: 'pointer' }}>
            <Card sx={{ width: 200 }}>
                <CardMedia
                    component="img"
                    image={card.image}
                    alt={card.name}
                    sx={{ height: "250px", borderRadius: "4px" }}
                />
                <CardContent>
                    <Typography variant="h6">{card.name}</Typography>
                    <Typography variant="body2">Mana Cost: {card.mana_cost || 'N/A'}</Typography>
                    <Typography variant="body2">Price: {card.prices ? `€${card.prices}` : 'N/A'}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default CardItem;
