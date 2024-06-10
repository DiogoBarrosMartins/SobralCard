import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCardsByString } from '../../services/card-service';
import CardList from '../../components/CardList';
import Header from "../../components/Header"
const ListScene = () => {
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();

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
                const cardArray = await getCardsByString(cardName);
                if (cardArray && cardArray.length > 0) {
                    const card = cardArray[0];
                    if (!card.name.startsWith("A-")) {
                        const newCards = [...cards, card];
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
                }
            } catch (error) {
                console.error('Error adding card:', error);
            }
        }
    };

    const handleDeleteAllCards = () => {
        const confirmed = window.confirm("Are you sure you want to delete all cards from this list?");
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
            sessionStorage.setItem('currentList', JSON.stringify({ name: listName, cards: [] }));
        }
    };

    const handleGoBack = () => {
        navigate('/deck');
    };

    return (
        <Box m="20px"><Header title={listName} subtitle="Create a New List" />
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '20px',
        }}>
             
            <Typography variant="h4">{listName}</Typography>
            <Typography variant="subtitle1">Cards in your list: {cards.length}</Typography>
            <Box sx={{ display: 'flex', gap: '10px' }}>
                <Button variant="contained" color="primary" onClick={handleAddCard}>Add New Card</Button>
                <Button variant="contained" color="secondary" onClick={handleDeleteAllCards}>Delete All Cards</Button>
                <Button variant="contained" color="primary" onClick={handleGoBack}>Go Back to List Menu</Button>
            </Box>
            <CardList cards={cards} handleCardClick={handleCardClick} />
        </Box>
        </Box>
    );
};

export default ListScene;
