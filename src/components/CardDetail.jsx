import React from 'react';
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';

const CardDetail = ({ card }) => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    alt={card.name}
                    height="140"
                    image={card.card}
                    title={card.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {card.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Mana Cost: {card.mana_cost || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Price: {card.prices ? `€${card.prices}` : 'N/A'}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default CardDetail;
