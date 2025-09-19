// services/card-service.js
import axios from 'axios';
const API_BASE_URL = 'https://api.scryfall.com';

// Cache simples em memória (nome -> carta processada)
const _cache = new Map();

const mapScryfallToCard = (element) => {
  const getImage = (el) => {
    if (!el) return undefined;
    if (el.image_uris?.large) return el.image_uris.large;
    if (el.image_uris?.normal) return el.image_uris.normal;
    if (el.card_faces?.[0]?.image_uris?.large) return el.card_faces[0].image_uris.large;
    if (el.card_faces?.[0]?.image_uris?.normal) return el.card_faces[0].image_uris.normal;
    return undefined;
  };

  return {
    name: element.name,
    id: element.id,
    card: getImage(element),
    mana_cost: element.mana_cost || element.card_faces?.[0]?.mana_cost || '',
    prices: element.prices?.eur || element.prices?.eur_foil || null,
    art: element.image_uris?.art_crop || element.card_faces?.[0]?.image_uris?.art_crop || getImage(element),
  };
};

export async function getCardsByString(searchInput) {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/cards/search`, { params: { q: searchInput } });
    if (!data?.data) throw new Error('No cards found');

    const nonAlchemy = data.data.filter((c) => !c.name?.startsWith('A-'));
    if (!nonAlchemy.length) throw new Error('No non-Alchemy cards found');

    return nonAlchemy.map(mapScryfallToCard);
  } catch (error) {
    console.error('Error fetching cards:', error);
    throw error;
  }
}

// Mais rápido/preciso por nome
export async function getCardsByExactName(name) {
  const key = name.toLowerCase();
  if (_cache.has(key)) return _cache.get(key);

  try {
    const { data } = await axios.get(`${API_BASE_URL}/cards/named`, { params: { exact: name } });
    const card = mapScryfallToCard(data);
    _cache.set(key, card);
    return card;
  } catch {
    // fallback: fuzzy
    const { data } = await axios.get(`${API_BASE_URL}/cards/named`, { params: { fuzzy: name } });
    const card = mapScryfallToCard(data);
    _cache.set(key, card);
    return card;
  }
}

export async function getCardsByNamesBatch(names = []) {
  const unique = [...new Set(names.map((n) => n.trim()).filter(Boolean))];
  const results = await Promise.allSettled(unique.map((n) => getCardsByExactName(n)));
  const map = new Map();
  results.forEach((r, i) => {
    const nm = unique[i];
    if (r.status === 'fulfilled') map.set(nm, r.value);
  });
  return map; // Map name -> processed card
}

export async function fetchRandomCardImage() {
  const cards = await getCardsByString('scroll');
  return cards[Math.floor(Math.random() * cards.length)];
}

export async function fetchCardImage() {
  const cards = await getCardsByString('archive');
  return cards[0];
}
