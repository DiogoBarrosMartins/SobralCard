import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardMedia, CardContent, Typography, Link as MuiLink, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCardsByString } from '../../services/card-service';
import { tokens } from '../../theme';

const ListScene = () => {
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const location = useLocation();
    const listName = new URLSearchParams(location.search).get('name');

    useEffect(() => {
        if (listName) {
            fetchCardsForList(listName);
        }
    }, [listName]);

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
                setCards(selectedList.cards || []);
            }
        } catch (error) {
            console.error('Error fetching cards for list:', error);
            setCards([]);
        }
    };

    const handleCardClick = (cardName) => {
        navigate(`/card?name=${encodeURIComponent(cardName)}`);
    };

    const handleAddCard = async () => {
        const cardName = prompt('Enter the name of the card to add:');
        if (cardName) {
            try {
                const card = await getCardsByString(cardName);
                if (card && card.length > 0) {
                    const newCards = [...cards, ...card];
                    setCards(newCards);

                    // Update local storage
                    const storedListsString = localStorage.getItem('storedLists');
                    if (storedListsString) {
                        const storedLists = JSON.parse(storedListsString);
                        const listIndex = storedLists.findIndex(list => list.name === listName);
                        if (listIndex !== -1) {
                            storedLists[listIndex].cards = newCards;
                            localStorage.setItem('storedLists', JSON.stringify(storedLists));
                        }
                    }

                    const listJson = { name: listName, cards: newCards };
                    sessionStorage.setItem('currentList', JSON.stringify(listJson));
                }
            } catch (error) {
                console.error('Error adding card:', error);
            }
        }
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
            <Typography variant="h4">{listName}</Typography>
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
        </Box>
    );
};

ListScene.propTypes = {
    selectedList: PropTypes.string.isRequired,
};

export default ListScene;
