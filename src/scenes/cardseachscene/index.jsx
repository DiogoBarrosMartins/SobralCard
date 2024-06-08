import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardMedia, TextField, Button, CircularProgress, Typography } from '@mui/material';
import { getCardsByString } from '../../services/card-service';
import { useNavigate } from 'react-router-dom';

const CardSearchScene = ({ initialSearchInput }) => {
    const [searchInput, setSearchInput] = useState(initialSearchInput);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCards(searchInput);
    }, [searchInput]);

    const fetchCards = async (input) => {
        setLoading(true);
        setError(null);
        try {
            const fetchedCards = await getCardsByString(input);
            setCards(fetchedCards);
        } catch (error) {
            setError('Error fetching cards. Please try again.');
            console.error('Error fetching cards:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearchClick = () => {
        fetchCards(searchInput);
    };

    const handleCardClick = (cardId) => {
        navigate(`/list/${cardId}`);
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchInput}
                    onChange={handleSearchChange}
                    sx={{ marginRight: '10px' }}
                />
                <Button variant="contained" color="primary" onClick={handleSearchClick}>
                    Search
                </Button>
            </Box>
            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}
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
                        onClick={() => handleCardClick(card.id)}
                        sx={{ width: 200, cursor: 'pointer' }}
                    >
                        <CardMedia
                            component="img"
                            image={card.imageUrl}
                            alt={card.name}
                            sx={{ height: 300, borderRadius: '5px' }}
                        />
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

CardSearchScene.propTypes = {
    initialSearchInput: PropTypes.string.isRequired,
};

export default CardSearchScene;
