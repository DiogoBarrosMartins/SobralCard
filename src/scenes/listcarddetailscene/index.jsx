// ListCardDetailScene.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getCardsByString } from '../../services/card-service';
import Card from '../../components/Card'; // Ensure this path is correct
import Header from '../../components/Header'; // Ensure this path is correct

const ListCardDetailScene = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const listName = new URLSearchParams(location.search).get('list');
    const [card, setCard] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const fetchedCard = await getCardsByString(name);
                if (fetchedCard && fetchedCard.length > 0) {
                    setCard(fetchedCard[0]);
                } else {
                    setError("No card found");
                }
            } catch (error) {
                setError(error.message);
            }
        };
        fetchCard();
    }, [name]);

    const handleGoBack = () => {
        navigate(`/list?name=${encodeURIComponent(listName)}`);
    };

    return (
        <Box m="20px" height="80vh">
            <Header variant="h4" mb="20px" title="Card Details" subtitle={`From list: ${listName}`} />
            <Box mb="20px" display="flex" alignItems="center">
                <Button variant="contained" color="primary" onClick={handleGoBack}>
                    <Typography>Go back</Typography>
                </Button>
            </Box>
            {card && (
                <Box height="80%" marginLeft={"20px"}>
                    <Card card={card} />
                </Box>
            )}
            {error && <Typography color="error">{error}</Typography>}
        </Box>
    );
};

export default ListCardDetailScene;
