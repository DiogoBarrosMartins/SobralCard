import axios from 'axios';
const API_BASE_URL = 'https://api.scryfall.com/';


export async function getCardDetailsByName(searchInput) {
    try {
        const response = await axios.get(`${API_BASE_URL}/cards/named`, {
            params: { exact: searchInput }
        });
        const data = response.data;

        if (!data) {
            throw new Error("No card found");
        }

        const pricesInEuros = data.prices ? data.prices.eur : null;

        return {
            name: data.name,
            id: data.id,
            card: data.image_uris
                ? data.image_uris.normal
                : data.card_faces[0].image_uris.normal,
            flavour: data.flavor_text,
            art: data.image_uris ? data.image_uris.art_crop : undefined,
            prices: pricesInEuros
        };
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error("Card not found:", error.message);
        } else {
            console.error("Error fetching card details:", error);
        }
        throw error;
    }
}


export async function getCardsByString(searchInput) {
    try {
        const response = await axios.get(`${API_BASE_URL}/cards/search`, {
            params: { q: searchInput }
        });
        if (!response.data.data) {
            throw new Error("No cards found");
        }
        const processedCards = response.data.data.map((element) => ({
            name: element.name,
            id: element.id,
            card: element.image_uris
                ? element.image_uris.normal
                : element.card_faces[0].image_uris.normal,
        }));
        return processedCards;
    } catch (error) {
        console.error("Error fetching cards:", error);
        throw error;
    }
}


export const fetchRandomCardImage = async () => {
    try {
        const cardNames = ["Book Burning", "Book Devourer", "Book of Mazarbul", "Bookwurm", "Storybook Ride", "Spellbook Vendor"];
        const searchString = 'book';
        let response = await getCardsByString(searchString);

        console.log("Response from getCardDetailsByName:", response);

        // Ensure response is always an array
        if (!Array.isArray(response)) {
            response = [response];
        }

        // Filter out cards with names in the cardNames array
        const filteredCards = response.filter(card => !cardNames.includes(card.name));

        if (filteredCards.length === 0) {
            throw new Error("No matching cards found");
        }

        // Select a random card from the filtered cards
        const randomCard = filteredCards[Math.floor(Math.random() * filteredCards.length)];

        

        // Return the cropped illustration image URL
        return randomCard;
    } catch (error) {
        console.error("Error fetching random card image:", error);
        // If there's an error, return a default image URL
        return 'default_image_url';
    }
};

