import React, { useState, useEffect, useCallback } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import CardListDisplay from '../../components/CardListDisplay';
import Header from '../../components/Header';
import CardDetail from '../../components/CardDetail'; // Create this component

const CardListPage = () => {
    const [searchInput, setSearchInput] = useState('shop');
    const [selectedCard, setSelectedCard] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleCardClick = useCallback((card) => {
        setSelectedCard(card);
        navigate(`/card/${encodeURIComponent(card.name)}?list=${encodeURIComponent(searchInput)}`);
    }, [navigate, searchInput]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const cardName = params.get('name');
        if (cardName) {
            setSearchInput(cardName);
            handleCardClick({ name: cardName });
        }
    }, [location.search, handleCardClick]);

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleBackButtonClick = () => {
        setSelectedCard(null);
        navigate(`/deck?name=${encodeURIComponent(searchInput)}`);
    };

    return (
        <Box m="20px">
            {selectedCard ? (
                <>
                    <Header title={selectedCard.name} subtitle="Card Details" variant="h4" mb="20px" />
                    <Button variant="contained" color="primary" onClick={handleBackButtonClick} sx={{ mb: 2 }}>
                        Back to List
                    </Button>
                    <CardDetail card={selectedCard} />
                </>
            ) : (
                <>
                    <Header title="Search cards on our shop" subtitle="Search cards on our shop" variant="h4" mb="20px" />
                    <Box mb="20px" display="flex" alignItems="center">
                        <TextField
                            label="Search"
                            variant="outlined"
                            value={searchInput}
                            onChange={handleSearchChange}
                            sx={{ mr: 2 }}
                        />
                    </Box>
                    <CardListDisplay searchInput={searchInput} onCardClick={handleCardClick} />
                </>
            )}
        </Box>
    );
};

export default CardListPage;
