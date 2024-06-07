import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../components/Card';
import { getCardDetailsByName } from '../../services/card-service';

const CardScene = () => {
  const { id } = useParams();
  const [searchInput, setSearchInput] = useState('Cosmic Epiphany');
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const fetchedCard = await getCardDetailsByName(searchInput);
        setCard(fetchedCard);
      } catch (error) {
        console.error("Error fetching card:", error);
      }
    };
    fetchCard();
  }, [searchInput]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div>
      <h1>Card Details</h1>
      <input
        type="text"
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      {card && (
        <Card card={card} />
      )}
    </div>
  );
};

export default CardScene;


