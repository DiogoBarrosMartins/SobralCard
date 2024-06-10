import axios from 'axios';
const API_BASE_URL = 'https://api.scryfall.com/';

export async function getCardsByString(searchInput) {
    console.log("getCardsByString called with searchInput:", searchInput);

    try {
        const response = await axios.get(`${API_BASE_URL}/cards/search`, {
            params: { q: searchInput }
        });

        console.log("Response received:", response);

        if (!response.data.data) {
            console.error("No cards found in the response:", response);
            throw new Error("No cards found");
        }

        console.log("Processing cards data:", response.data.data);
        const processedCards = response.data.data.map((element) => ({
            name: element.name,
            id: element.id,
            card: element.image_uris
                ? element.image_uris.normal
                : element.card_faces[0].image_uris.normal,
            mana_cost: element.mana_cost,
            prices: element.prices.eur
        }));

        console.log("Processed cards:", processedCards);
        return processedCards;

    } catch (error) {
        console.error("Error fetching cards:", error);
        throw error;
    }
}

export async function fetchRandomCardImage() {
    const searchString = "archive"; // Replace with a string that fetches a random card
    const cards = await getCardsByString(searchString);
    return cards[Math.floor(Math.random() * cards.length)];
}
export async function fetchCardImage() {
    const searchString = "archive"; // Replace with a string that fetches a random card
    const cards = await getCardsByString(searchString);
    return cards[0];
}