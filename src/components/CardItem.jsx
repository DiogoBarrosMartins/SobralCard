import React from 'react';
import { Card, CardMedia, CardContent, Typography, Link as MuiLink, useTheme } from '@mui/material';
import { tokens } from '../theme';

const CardItem = ({ card, handleCardClick }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MuiLink 
            key={card.id} 
            component="button"
            onClick={() => handleCardClick(card.name)} 
            sx={{ textDecoration: 'none' }}
        >
            <Card sx={{ width: 200, cursor: 'pointer' }}>
                <CardMedia
                    component="img"
                    image={card.card}
                    alt={card.name}
                    sx={{ height: "250px", borderRadius: "4px" }}
                />
                <CardContent sx={{ backgroundColor: colors.primary[400] }}>
                    <Typography variant="h6" color={colors.grey[100]}>{card.name}</Typography>
                    <Typography variant="body2" color={colors.grey[100]}>
                        {card.prices ? `€${card.prices}` : 'N/A'}
                    </Typography>
                </CardContent>
            </Card>
        </MuiLink>
    );
};

export default CardItem;
