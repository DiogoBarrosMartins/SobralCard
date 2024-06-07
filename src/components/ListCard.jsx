import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia } from '@mui/material';

const ListCard = ({ name, imageUrl }) => {
    return (
        <Card>
            <CardMedia
                component="img"
                image={imageUrl}
                alt={name}
            />
        </Card>
    );
};

ListCard.propTypes = {
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
};

export default ListCard;
