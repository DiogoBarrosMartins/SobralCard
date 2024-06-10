import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardMedia, CardContent, Typography, Link as MuiLink, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCardsByString } from '../../services/card-service';
import { tokens } from '../../theme';
import Header from '../../components/Header';

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
        navigate(`/list/card/${encodeURIComponent(cardName)}?list=${encodeURIComponent(listName)}`);
    };

    const handleAddCard = async () => {
        const cardName = prompt('Enter the name of the card to add:');
        if (cardName) {
            try {
                const card = await getCardsByString(cardName);
                if (card && card.length > 0) {
                    const newCards = [...cards, card[0]]; // Add only the first card
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

    const handleDeleteAllCards = () => {
        const confirmed = window.confirm("Are you sure you want to delete all cards from the list?");
        if (confirmed) {
            setCards([]);
            const storedListsString = localStorage.getItem('storedLists');
            if (storedListsString) {
                const storedLists = JSON.parse(storedListsString);
                const listIndex = storedLists.findIndex(list => list.name === listName);
                if (listIndex !== -1) {
                    storedLists[listIndex].cards = [];
                    localStorage.setItem('storedLists', JSON.stringify(storedLists));
                }
            }
        }
    };

    const handleGoBack = () => {
        navigate('/deck');
    };

    return (
        <Box m="20px">
            <Header   title={`List: ${listName}`} subtitle={`Cards in your list : ${cards.length}`} variant="h4" mb="20px" />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                marginBottom: '20px',
            }}>
              
                <Button variant="contained" color="primary" onClick={handleAddCard}>Add New Card</Button>
                <Button variant="contained" color="primary" onClick={handleDeleteAllCards}>Delete All Cards</Button>
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
        </Box>
    );
};

ListScene.propTypes = {
    selectedList: PropTypes.string.isRequired,
};

export default ListScene;
