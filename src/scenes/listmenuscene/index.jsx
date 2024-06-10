import React, { useState, useEffect } from 'react';
import { Box, Button, MenuItem, Select, TextField, useTheme } from '@mui/material';
import Header from "../../components/Header";
import ListActions from '../../components/ListActions';
import ListDisplay from '../../components/ListDisplay';
import { fetchRandomCardImage, getCardsByString } from "../../services/card-service";
import { useNavigate } from 'react-router-dom';
import { tokens } from '../../theme';

const ListMenuScene = ({ storedLists, setStoredLists, updateSidebar }) => {
    const [randomCardImage, setRandomCardImage] = useState('');
    const [selectedListToDelete, setSelectedListToDelete] = useState('');
    const [listImages, setListImages] = useState({});
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();
    const theme = useTheme();

    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        const storedListsString = localStorage.getItem('storedLists');
        if (storedListsString) {
            setStoredLists(JSON.parse(storedListsString));
        }
    }, [setStoredLists]);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const card = await fetchRandomCardImage();
                console.log("Card fetched:", card); 
                setRandomCardImage(card.art);
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
                if (list && list.name) {
                    try {
                        const card = await getCardsByString(list.name);
                        if (card.length > 0) {
                            images[list.name] = card[0].art;
                        } else {
                            images[list.name] = 'https://via.placeholder.com/150';
                        }
                    } catch (error) {
                        console.error(`Error fetching image for list ${list.name}:`, error);
                        images[list.name] = 'https://via.placeholder.com/150';
                    }
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
                    updateSidebar(); // Update sidebar after adding list
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
                updateSidebar(); // Update sidebar after deleting list
            }
        }
    };

    const handleDeleteAllLists = () => {
        const confirmed = window.confirm("Are you sure you want to delete all lists?");
        if (confirmed) {
            localStorage.removeItem('storedLists');
            setStoredLists([]);
            updateSidebar(); // Update sidebar after deleting all lists
        }
    };

    const handleListButtonClick = (listName) => {
        if (listName) {
            navigate(`/list?name=${encodeURIComponent(listName)}`);
        } else {
            console.log("No list selected.");
        }
    };

    const filteredLists = storedLists.filter(list => 
        list && list.name && list.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    // Define common button styles
    const deleteButtonStyles = {
        backgroundColor: colors.redAccent[500],
        color: colors.primary[900],
        '&:hover': {
            backgroundColor: colors.redAccent[600],
        },
    };

    return (
        <Box m="20px" display="flex" flexDirection="column" height="84vh">
            <Header title="My Lists" subtitle="Your Lists" />
            <Box display="flex" alignItems="center" mb={2}>
                <Button variant="contained"  onClick={handleDeleteAllLists} sx={{ ml: 2, ...deleteButtonStyles }}>
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
                <Button variant="contained" onClick={handleDeleteList} sx={{ ml: 2, ...deleteButtonStyles }}>
                    Delete List
                </Button>
                <TextField
                    variant="outlined"
                    placeholder="Search Lists"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    sx={{ ml: 2, minWidth: 300 }}
                />
            </Box>
            <Box display="flex" flexWrap="wrap" gap="20px" justifyContent="center">
                <ListActions 
                    handleAddNewList={handleAddNewList} 
                    randomCardImage={randomCardImage} 
                />
                <ListDisplay
                    filteredLists={filteredLists}
                    handleListButtonClick={handleListButtonClick}
                    listImages={listImages}
                />
            </Box>
        </Box>
    );
};

export default ListMenuScene;
