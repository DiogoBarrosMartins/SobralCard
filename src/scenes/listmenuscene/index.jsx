import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, MenuItem, Select } from '@mui/material';
import Header from "../../components/Header";
import { fetchRandomCardImage, getCardsByString } from "../../services/card-service"; // Import getCardsByString
import { useNavigate } from 'react-router-dom';

const ListMenuScene = () => {
    const [storedLists, setStoredLists] = useState([]);
    const [randomCardImage, setRandomCardImage] = useState('');
    const [selectedListToDelete, setSelectedListToDelete] = useState('');
    const [listImages, setListImages] = useState({});
    const navigate = useNavigate(); // Initialize the navigate function

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
                console.log("Card fetched:", card); // Add console log
                setRandomCardImage(card.card);
            } catch (error) {
                console.error("Error fetching card:", error);
            }
        };
        fetchImage();
    }, []);

    useEffect(() => {
        const fetchListImages = async () => {
            const images = {};
            for (const list of storedLists) {
                try {
                    const card = await getCardsByString(list.name);
                    if (card.length > 0) {
                        images[list.name] = card[0].card;
                    } else {
                        images[list.name] = 'https://via.placeholder.com/150'; // Fallback image
                    }
                } catch (error) {
                    console.error(`Error fetching image for list ${list.name}:`, error);
                    images[list.name] = 'https://via.placeholder.com/150'; // Fallback image
                }
            }
            setListImages(images);
        };
        if (storedLists.length > 0) {
            fetchListImages();
        }
    }, [storedLists]);

    const handleAddNewList = async () => {
        const newListName = prompt('Enter the name of the new list:');
        if (newListName && newListName.trim() !== '') {
            try {
                const existingListIndex = storedLists.findIndex(list => list.name === newListName);
                if (existingListIndex !== -1) {
                    console.log(`List "${newListName}" already exists.`);
                } else {
                    const newList = { name: newListName, backgroundImage: '' };
                    const updatedLists = [...storedLists, newList];
                    localStorage.setItem('storedLists', JSON.stringify(updatedLists));
                    setStoredLists(updatedLists);
                }
            } catch (error) {
                console.error("Error adding new list:", error);
            }
        }
    };

    const handleDeleteList = () => {
        if (selectedListToDelete) {
            const confirmed = window.confirm(`Are you sure you want to delete the list "${selectedListToDelete}"?`);
            if (confirmed) {
                const updatedLists = storedLists.filter(list => list.name !== selectedListToDelete);
                localStorage.setItem('storedLists', JSON.stringify(updatedLists));
                setStoredLists(updatedLists);
            }
        }
    };

    const handleDeleteAllLists = () => {
        const confirmed = window.confirm("Are you sure you want to delete all lists?");
        if (confirmed) {
            localStorage.removeItem('storedLists');
            setStoredLists([]);
        }
    };

    const handleListButtonClick = (listName) => {
        if (listName) {
            navigate(`/list?name=${encodeURIComponent(listName)}`);
        } else {
            // Handle the case when no list is selected
            console.log("No list selected.");
        }
    };

    return (
        <Box m="20px" display="flex" flexDirection="column" height="84vh">
            <Box display="flex" alignItems="center" mb={2}>
                <Header title="My Lists" subtitle="Your Lists" />
                <Button variant="contained" color="secondary" size="small" onClick={handleDeleteAllLists} sx={{ ml: 2 }}>
                    Delete All Lists
                </Button>
                <Select
                    value={selectedListToDelete}
                    onChange={(e) => setSelectedListToDelete(e.target.value)}
                    displayEmpty
                    variant="outlined"
                    sx={{ justifyContent: "space-between", minWidth: 120, ml: 2 }}
                >
                    <MenuItem value="" disabled>
                        Select a list to delete
                    </MenuItem>
                    {storedLists.map((list, index) => (
                        <MenuItem key={index} value={list.name}>
                            {list.name}
                        </MenuItem>
                    ))}
                </Select>
                <Button variant="contained" color="secondary" size="small" onClick={handleDeleteList} sx={{ ml: 2 }}>
                    Delete List
                </Button>
            </Box>
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
                                backgroundSize: 'cover', // Use cover for better image fitting
                                backgroundPosition: 'center',
                                width: '100%',
                                height: '90%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                            }}
                        ></Box>

                        <Typography
                            variant="h1"
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
                            onClick={() => handleListButtonClick(list.name)}
                            fullWidth
                            sx={{ height: "90%", minHeight: "64px" }}
                            style={{ 
                                backgroundImage: `url(${listImages[list.name] || 'https://via.placeholder.com/150'})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                            }}
                        >
                            <Typography
                                variant="h2"
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

export default ListMenuScene;
