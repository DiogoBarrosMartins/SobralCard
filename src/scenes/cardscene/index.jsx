import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import Card from '../../components/Card';
import { getCardsByString } from "../../services/card-service";
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';


const CardScene = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let searchInputFromURL = searchParams.get('name') || 'Cosmic Epiphany'; 

    if (searchInputFromURL.startsWith("A-")) {
        searchInputFromURL = searchInputFromURL.substring(2);
    }

    const [searchInput, setSearchInput] = useState(searchInputFromURL);
    const [card, setCard] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const fetchedCard = await getCardsByString(searchInput);
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
            const fetchedCard = await getCardsByString(searchInput);
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
        <Box m="20px" height="80vh"> {/* Set height to 80vh */}
            <Header variant="h4" mb="20px" title="Search your cards" subtitle="yeah">               
            </Header>
            <Box mb="20px" display="flex" alignItems="center">
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchInput}
                    onChange={handleSearchChange}
                    sx={{ mr: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleSearchClick}>
                    <Typography>Search</Typography> 
                </Button>
                
                <Button variant="contained" color="primary" onClick={handleGoBack}>
                  <Typography>Go back</Typography> 
                </Button>
            </Box>
            {error && <div>Error: {error}</div>}
            {card && (
                <Box height="80%" marginLeft={"20px"}>
                    <Card card={card} />
                </Box>
            )}
        </Box>
    );
};

export default CardScene;
