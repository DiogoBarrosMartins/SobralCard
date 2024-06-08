import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import Header from "../../components/Header";
import { fetchRandomCardImage, getCardsByString } from "../../services/card-service"; // Import getCardsByString
import { tokens } from "../../theme";

const DeckList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [storedLists, setStoredLists] = useState([]);
    const [randomCardImage, setRandomCardImage] = useState('');

    useEffect(() => {
        const storedListsString = localStorage.getItem('storedLists');
        if (storedListsString) {
            setStoredLists(JSON.parse(storedListsString));
        }
    }, []);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const card = await fetchRandomCardImage();
                console.log("Card fetched:", card);
                setRandomCardImage(card.card);
            } catch (error) {
                console.error("Error fetching card:", error);
            }
        };
        fetchImage();
    }, []);

    const handleAddNewList = async () => {
        const newListName = prompt('Enter the name of the new list:');
        if (newListName && newListName.trim() !== '') {
            try {
                const cards = await getCardsByString(newListName); // Fetch cards by search input
                if (cards.length > 0) {
                    const updatedLists = [...storedLists, { name: newListName, backgroundImage: cards[0].card }]; // Update background image
                    localStorage.setItem('storedLists', JSON.stringify(updatedLists));
                    setStoredLists(updatedLists);
                } else {
                    console.error("No cards found for the search input:", newListName);
                }
            } catch (error) {
                console.error("Error adding new list:", error);
            }
        }
    };

    const handleListButtonClick = (index) => {
        const updatedLists = [...storedLists];
        updatedLists.splice(index, 1);
        localStorage.setItem('storedLists', JSON.stringify(updatedLists));
        setStoredLists(updatedLists);
    };

    return (
        <Box height="80vh" width="100%" display="flex" flexDirection="column">
            <Header title="My Lists" subtitle="Your Lists" />

            <Box flex="1" display="flex" flexDirection="row" justifyContent="center">
                <Box mx="10px" flex="1" display="flex" alignItems="stretch">
                    <Button
                        onClick={handleAddNewList}
                        style={{
                            position: 'relative',
                            flex: '1',
                            overflow: 'hidden',
                        }}
                    >
                       <Box
                            style={{
                                backgroundImage: `url(${randomCardImage})`,
                                backgroundSize: `${120 + (storedLists.length * 100)}%`,
                                backgroundPosition: '55% 20%',
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                            }}
                        ></Box>

                        <Typography
                            variant="body1"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: 'black',
                                color: 'white',
                                padding: '8px',
                                borderRadius: '5px',
                            }}
                        >
                            Add New List
                        </Typography>
                    </Button>
                </Box>

                {storedLists.map((list, index) => (
    <Box key={index} mx="10px" flex="1" height="80vh">
        <Button
            variant="contained"
            color="primary"
            onClick={() => handleListButtonClick(index)}
            fullWidth
            sx={{ height: "100%", minHeight: "64px" }}
            style={{ 
                backgroundImage: `url(${list.backgroundImage})`,
                backgroundSize: `${120 + (storedLists.length * 100)}%`,
                backgroundPosition: '55% 20%',
            }}
        >
            <Typography
                variant="body1"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'black',
                    color: 'white',
                    padding: '8px',
                    borderRadius: '5px',
                }}
            >  
                {list.name}
            </Typography>
        </Button>
    </Box>
))}



            </Box>
        </Box>
    );
};

export default DeckList;
