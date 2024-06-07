import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import CardListDisplay from '../../components/CardListDisplay';

const CardListPage = () => {
    const [searchInput, setSearchInput] = useState('dragon');

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    return (
        <Box m="20px">
            <Typography variant="h4" mb="20px">
                Magic Card List
            </Typography>
            <Box mb="20px" display="flex" alignItems="center">
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchInput}
                    onChange={handleSearchChange}
                    sx={{ mr: 2 }}
                />
                <Button variant="contained" color="primary" onClick={() => {}}>
                    Search
                </Button>
            </Box>
            <CardListDisplay searchInput={searchInput} />
        </Box>
    );
};

export default CardListPage;
