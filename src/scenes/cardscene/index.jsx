import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import Card from '../../components/Card';
import { getCardDetailsByName } from "../../services/card-service";
import { useLocation } from 'react-router-dom';

const CardScene = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchInputFromURL = searchParams.get('name') || 'Cosmic Epiphany'; // Default to 'Cosmic Epiphany' if no name is provided

    const [searchInput, setSearchInput] = useState(searchInputFromURL);
    const [card, setCard] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const fetchedCard = await getCardDetailsByName(searchInput);
                setCard(fetchedCard);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchCard();
    }, [searchInput]);

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearchClick = async () => {
        try {
            const fetchedCard = await getCardDetailsByName(searchInput);
            if (fetchedCard) {
                setCard(fetchedCard);
            } else {
                setError("No card found");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoBack = () => {
        window.location.href = '/';
    };

    return (
        <Box m="20px">
            <Typography variant="h4" mb="20px">
                Magic Card Scene
            </Typography>
            <Box mb="20px" display="flex" alignItems="center">
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchInput}
                    onChange={handleSearchChange}
                    sx={{ mr: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleSearchClick}>
                    Search
                </Button>
                
                <Button variant="contained" color="primary" onClick={handleGoBack}>
                    Go back 
                </Button>
            </Box>
            {error && <div>Error: {error}</div>}
            {card && <Card card={card} />}
        </Box>
    );
};

export default CardScene;
