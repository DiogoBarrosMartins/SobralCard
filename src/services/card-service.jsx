import axios from 'axios';

const API_BASE_URL = 'https://api.scryfall.com/cards';

async function fetchWithRetry(url, retries = 5) {
    try {
        const response = await axios.get(url);
        const data = response.data;

        if (!data.image_uris || !data.image_uris.normal) {
            if (retries > 0) {
                console.log("Retry fetching card due to missing 'normal' image.");
                return fetchWithRetry(url, retries - 1);
            } else {
                throw new Error("Max retries reached");
            }
        }

        return data;
    } catch (error) {
        console.error("Fetch failed:", error);
        throw error;
    }
}

export async function getRandomCard(callbackFunction) {
    try {
        const cardData = await fetchWithRetry(`${API_BASE_URL}/random`);
        const card = {
            name: cardData.name,
            card: cardData.image_uris.normal,
            flavour: cardData.flavor_text,
            art: cardData.image_uris.art_crop,
        };
        callbackFunction(card);
    } catch (error) {
        console.error("Error in getRandomCard:", error);
        callbackFunction(null, error);
    }
}


export async function getCardDetailsByName(searchInput) {
    try {
        const response = await axios.get(`${API_BASE_URL}/search`, {
            params: { q: searchInput }
        });
        const data = response.data;

        if (!data.data || data.data.length === 0) {
            throw new Error("No cards found");
        }

        // Check if there's a card without the "A-" prefix
        const nonAPrefixedCard = data.data.find(card => !card.name.startsWith("A-"));

        // If there's a non-"A-" version of the card, use it; otherwise, use the first match
        const selectedCard = nonAPrefixedCard || data.data[0];

        // Extracting prices in euros if available
        const pricesInEuros = selectedCard.prices ? selectedCard.prices.eur : null;

        return {
            name: selectedCard.name,
            id: selectedCard.id,
            card: selectedCard.image_uris
                ? selectedCard.image_uris.normal
                : selectedCard.card_faces[0].image_uris.normal,
            flavour: selectedCard.flavor_text,
            art: selectedCard.image_uris ? selectedCard.image_uris.art_crop : undefined,
            prices: pricesInEuros // Add prices in euros to the returned object
        };
    } catch (error) {
        console.error("Error fetching card details:", error);
        throw error;
    }
}


export async function getCardsByString(searchInput) {
    try {
        const response = await axios.get(`${API_BASE_URL}/search`, {
            params: { q: searchInput }
        });
        const data = response.data;

        if (!Array.isArray(data.data)) {
            throw new Error("Expected an array of cards");
        }

        const processedCards = data.data.map((element) => ({
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

export async function openBooster(callbackFunction) {
    try {
        const response = await axios.get(`${API_BASE_URL}/search`, {
            params: { q: 'r>=rare+e:dmu' }
        });
        const data = response.data.data;

        const cards = data.map((element) => ({
            name: element.name,
            id: element.id,
            card: element.image_uris
                ? element.image_uris.normal
                : element.card_faces[0].image_uris.normal,
        }));

        callbackFunction(cards);
    } catch (error) {
        console.error("Error in openBooster:", error);
        callbackFunction(null, error);
    }
}

export async function generateRandomBooster(setCode, callbackFunction) {
    try {
        const response = await axios.get(`${API_BASE_URL}/search`, {
            params: { q: `set:${setCode}` }
        });
        const data = response.data.data;

        const cards = data.map((element) => ({
            name: element.name,
            id: element.id,
            card: element.image_uris
                ? element.image_uris.normal
                : element.card_faces[0].image_uris.normal,
            rarity: element.rarity,
            color: element.color,
        }));

        const rareMythic = cards.filter(card => card.rarity === 'rare' || card.rarity === 'mythic');
        const uncommons = cards.filter(card => card.rarity === 'uncommon');
        const commons = cards.filter(card => card.rarity === 'common' &&
            !['forest', 'island', 'swamp', 'mountain', 'plains'].includes(card.name.toLowerCase()));

        const booster = [];

        if (rareMythic.length > 0) {
            booster.push(rareMythic[Math.floor(Math.random() * rareMythic.length)]);
        } else {
            booster.push(commons[Math.floor(Math.random() * commons.length)]);
        }

        for (let i = 0; i < 3; i++) {
            booster.push(uncommons[Math.floor(Math.random() * uncommons.length)]);
        }

        for (let i = 0; i < 11; i++) {
            booster.push(commons[Math.floor(Math.random() * commons.length)]);
        }

        callbackFunction(booster);
    } catch (error) {
        console.error("Error in generateRandomBooster:", error);
        callbackFunction(null, error);
    }
}

export async function generate8RandomBoosters(setCode) {
    const boosters = [];
    for (let i = 0; i < 8; i++) {
        await generateRandomBooster(setCode, (booster) => {
            boosters.push(booster);
        });
    }
    return boosters;
}
