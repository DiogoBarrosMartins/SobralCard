import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import CardListDisplay from '../../components/CardListDisplay';
import Header from '../../components/Header';

const CardListPage = () => {
    const [searchInput, setSearchInput] = useState('shop');

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    return (
        <Box m="20px">
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
            <CardListDisplay searchInput={searchInput} />
        </Box>
    );
};

export default CardListPage;
