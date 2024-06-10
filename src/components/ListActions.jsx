import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const ListActions = ({ handleAddNewList, randomCardImage }) => {
    return (
        <Box mx="10px" display="flex" alignItems="stretch" width="200px" height="300px">
            <Button
                onClick={handleAddNewList}
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                }}
            >
                <Box
                    style={{
                        backgroundImage: `url(${randomCardImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%',
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
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        padding: '8px',
                        borderRadius: '5px',
                        fontSize: '16px', 
                    }}
                >
                    ADD NEW LIST
                </Typography>
            </Button>
        </Box>
    );
};

export default ListActions;
