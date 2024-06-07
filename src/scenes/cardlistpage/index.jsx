import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import CardListDisplay from '../../components/CardListDisplay';
import { getCardsByString } from '../../services/card-service';

const CardListPage = () => {
    const [searchInput, setSearchInput] = useState('dragon');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function fetchCards() {
            try {
                const fetchedCards = await getCardsByString(searchInput);
                setCards(fetchedCards);
            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        }
        fetchCards();
    }, [searchInput]);

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearchClick = async () => {
        try {
            const fetchedCards = await getCardsByString(searchInput);
            setCards(fetchedCards);
        } catch (error) {
            console.error("Error fetching cards:", error);
        }
    };

    return (
        <Box m="20px">
            <Typography variant="h4" mb="20px">
                Magic Card List
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
            </Box>
            <CardListDisplay searchInput={searchInput} cards={cards} />
        </Box>
    );
};

export default CardListPage;

