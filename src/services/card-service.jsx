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

        // Filter out cards with names starting with "A-"
        const nonAlchemyCards = response.data.data.filter(card => !card.name.startsWith("A-"));

        if (nonAlchemyCards.length === 0) {
            console.error("No non-Alchemy cards found in the response:", response);
            throw new Error("No non-Alchemy cards found");
        }

        const processedCards = nonAlchemyCards.map((element) => ({
            name: element.name,
            id: element.id,
            card: element.image_uris
                ? element.image_uris.large
                : element.card_faces[0].image_uris.large,
            mana_cost: element.mana_cost,
            prices: element.prices.eur,
            art: element.image_uris ? element.image_uris.art_crop : element.card_faces[0].image_uris.large
        }));

        console.log("Processed cards:", processedCards);
        return processedCards;

    } catch (error) {
        console.error("Error fetching cards:", error);
        throw error;
    }
}

export async function fetchRandomCardImage() {
    const searchString = "scroll"; 
    const cards = await getCardsByString(searchString);
    return cards[Math.floor(Math.random() * cards.length)];
}

export async function fetchCardImage() {
    const searchString = "archive"; 
    const cards = await getCardsByString(searchString);
    return cards[0];
}
