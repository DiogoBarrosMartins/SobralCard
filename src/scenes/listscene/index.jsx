import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardMedia, CardContent, Typography, Link as MuiLink, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCardsByString } from '../../services/card-service';
import { tokens } from '../../theme';

const ListScene = ({ selectedList }) => {
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        fetchCardsForList(selectedList);
    }, [selectedList]);

    const fetchCardsForList = async (listName) => {
        try {
            const storedListsString = localStorage.getItem('storedLists');
            if (storedListsString) {
                const storedLists = JSON.parse(storedListsString);
                let selectedList = storedLists.find(list => list.name === listName);
                if (!selectedList) {
                    selectedList = { name: listName, cards: [] }; 
                    storedLists.push(selectedList); 
                    localStorage.setItem('storedLists', JSON.stringify(storedLists));
                }
                setCards(selectedList.cards);
            }
        } catch (error) {
            console.error('Error fetching cards for list:', error);
        }
    };
    
    const handleAddCard = async () => {
        const cardName = prompt('Enter the name of the card to add:');
        if (cardName) {
            try {
                const cards = await getCardsByString(cardName);
                const newCards = [...cards, ...cards];  // Merging the existing cards with the new one
                setCards(newCards);
    
                console.log('New cards:', newCards);
    
                const storedListsString = localStorage.getItem('storedLists');
                if (storedListsString) {
                    const storedLists = JSON.parse(storedListsString);
                    const listIndex = storedLists.findIndex(list => list.name === selectedList);
                    if (listIndex !== -1) {
                        storedLists[listIndex].cards.push(...cards); // Add the card to the list
                        localStorage.setItem('storedLists', JSON.stringify(storedLists)); // Update the local storage
                        console.log('Local storage updated:', storedLists);
                    }
                }
    
                const listJson = { name: selectedList, cards: newCards };
                sessionStorage.setItem('currentList', JSON.stringify(listJson));
            } catch (error) {
                console.error('Error adding card:', error);
            }
        }
    };
    

    const handleCardClick = (cardName) => {
        navigate(`/card?name=${encodeURIComponent(cardName)}`);
    };

    const handleGoBack = () => {
        navigate('/deck');
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '20px',
        }}>
            <Typography variant="h4">{selectedList}</Typography>
            <Typography variant="subtitle1">Cards in your list: {cards.length}</Typography>
            <Button variant="contained" color="primary" onClick={handleAddCard}>Add New Card</Button>
            <Button variant="contained" color="primary" onClick={handleGoBack}>Go Back to List Menu</Button>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '20px',
            }}>
                {cards.map(card => (
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
                                    Mana Cost: {card.mana_cost || 'N/A'}
                                </Typography>
                                <Typography variant="body2" color={colors.grey[100]}>
                                    Price: {card.prices ? `€${card.prices}` : 'N/A'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </MuiLink>
                ))}
            </Box>
            <Button variant="outlined" onClick={handleGoBack}>Go Back to List Menu</Button>
        </Box>
    );
};

ListScene.propTypes = {
    selectedList: PropTypes.string.isRequired,
};

export default ListScene;