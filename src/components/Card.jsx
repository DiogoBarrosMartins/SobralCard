import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios'; // Don't forget to import axios
import { useParams } from 'react-router-dom';

const Card = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`https://api.scryfall.com/cards/search?q=${id}`);
        const data = response.data;

        if (!data.data || data.data.length === 0) {
          throw new Error("No card found");
        }

        const firstMatch = data.data[0];

        // Fetch additional details including the price in euros
        const priceResponse = await axios.get(`https://api.scryfall.com/cards/${firstMatch.id}/prices`);
        const prices = priceResponse.data.prices;
        const priceInEuros = prices.eur;

        setCard({
          name: firstMatch.name,
          id: firstMatch.id,
          card: firstMatch.image_uris ? firstMatch.image_uris.normal : firstMatch.card_faces[0].image_uris.normal,
          flavour: firstMatch.flavor_text,
          art: firstMatch.image_uris ? firstMatch.image_uris.art_crop : undefined,
          priceInEuros: priceInEuros,
        });
      } catch (error) {
        console.error("Error fetching card:", error);
      }
    };
    fetchCard();
  }, [id]);

  return (
    <Box m="20px">
      {card && (
        <>
          <Typography variant="h4">{card.name}</Typography>
          <img src={card.card} alt={card.name} style={{ maxWidth: '100%' }} />
          <Typography variant="body1">Type: {card.type}</Typography>
          <Typography variant="body1">Rarity: {card.rarity}</Typography>
          <Typography variant="body1">Price in Euros: {card.priceInEuros}</Typography>
          <Typography variant="body1">Flavour: {card.flavour}</Typography>
          {/* Add more details as needed */}
          <Button variant="contained" color="primary" onClick={() => {}}>
            Add to Favorites
          </Button>
        </>
      )}
    </Box>
  );
};

export default Card;
