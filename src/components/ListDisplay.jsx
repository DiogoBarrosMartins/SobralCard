import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const ListDisplay = ({ filteredLists, handleListButtonClick, listImages }) => {
    return (
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap="20px">
            {filteredLists.map((list, index) => (
                <Box key={index} mx="10px" width="200px" height="300px">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleListButtonClick(list.name)}
                        fullWidth
                        sx={{ height: "100%", minHeight: "250px" }}
                        style={{ 
                            backgroundImage: `url(${listImages[list.name] || 'https://via.placeholder.com/150'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <Typography
                            variant="h2"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                padding: '8px',
                                borderRadius: '5px',
                                fontSize: '16px', // Adjust font size for consistency
                            }}
                        >  
                            {list.name}
                        </Typography>
                    </Button>
                </Box>
            ))}
        </Box>
    );
};

export default ListDisplay;
