// components/CardList.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, Card as MUICard, CardMedia, CardContent } from '@mui/material';

/**
 * CardList – aceita uma única carta (prop `card`) ou um array (prop `cards`).
 * Campos por carta: { id, name, card (image url), mana_cost, prices, count }
 */
const CardList = (props) => {
  const cards = Array.isArray(props.cards)
    ? props.cards
    : props.card
    ? [props.card]
    : [];

  if (!cards.length) {
    return <Typography color="error">Card data is missing</Typography>;
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {cards.map((c, idx) => {
          const imageUrl = c.card || c.imageUrl;
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={c.id || `${c.name}-${idx}`}>
              <MUICard>
                {imageUrl ? (
                  <CardMedia
                    component="img"
                    image={imageUrl}
                    alt={c.name}
                    sx={{ height: 360, objectFit: 'contain', borderRadius: '20px' }}
                  />
                ) : (
                  <Box p={2}><Typography>Sem imagem</Typography></Box>
                )}
                <CardContent>
                  <Typography variant="subtitle1" noWrap>{c.name}</Typography>
                  {c.mana_cost && (
                    <Typography variant="caption" color="text.secondary">
                      Mana Cost: {c.mana_cost}
                    </Typography>
                  )}
                  <Box display="flex" justifyContent="space-between" mt={0.5}>
                    <Typography variant="caption" color="text.secondary">
                      {c.prices ? `€${c.prices}` : 'Priceless'}
                    </Typography>
                    {typeof c.count === 'number' && c.count > 1 ? (
                      <Typography variant="caption" color="text.secondary">x{c.count}</Typography>
                    ) : null}
                  </Box>
                </CardContent>
              </MUICard>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

CardList.propTypes = {
  card: PropTypes.object,
  cards: PropTypes.array,
};

export default CardList;
