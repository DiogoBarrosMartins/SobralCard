// scenes/list/ListCardDetailScene.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography, Button, TextField, Stack, LinearProgress } from '@mui/material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getCardsByString, getCardsByNamesBatch } from '../../services/card-service';
import CardList from '../../components/CardList';
import Header from '../../components/Header';

// Parser de decklist → [{ name, count }]
const parseDecklist = (text) => {
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('//') && !/^sideboard/i.test(l));

  const entries = {};
  for (const line of lines) {
    if (/^(commander|companion|maybeboard)/i.test(line)) continue;
    const clean = line.replace(/\s*#.*$/, '');
    const m1 = clean.match(/^(\d+)x?\s+(.*)$/i); // 4 Nome | 4x Nome
    const m2 = clean.match(/^(.*)\s+x\s*(\d+)$/i); // Nome x4
    let count = 1;
    let name = clean;
    if (m1) { count = parseInt(m1[1], 10); name = m1[2].trim(); }
    else if (m2) { name = m2[1].trim(); count = parseInt(m2[2], 10); }
    if (!entries[name]) entries[name] = 0;
    entries[name] += Number.isFinite(count) ? count : 1;
  }
  return Object.entries(entries).map(([name, count]) => ({ name, count }));
};

const ListCardDetailScene = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const listName = new URLSearchParams(location.search).get('list');

  const [singleCard, setSingleCard] = useState(null);
  const [deckText, setDeckText] = useState('');
  const [deckCards, setDeckCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Detalhe de uma carta pelo :name (comportamento anterior)
  useEffect(() => {
    if (!name) return;
    const fetchCard = async () => {
      try {
        setError(null);
        const fetched = await getCardsByString(name);
        if (fetched && fetched.length > 0) setSingleCard(fetched[0]);
        else setError('No card found');
      } catch (e) {
        setError(e?.message || 'Erro ao obter carta');
      }
    };
    fetchCard();
  }, [name]);

  const handleGoBack = () => {
    navigate(`/list?name=${encodeURIComponent(listName || '')}`);
  };

  const parsed = useMemo(() => parseDecklist(deckText), [deckText]);

  const importDeck = async () => {
    setLoading(true);
    setError(null);
    try {
      const map = await getCardsByNamesBatch(parsed.map((p) => p.name));
      const built = parsed.map(({ name, count }) => {
        const found = map.get(name) || null;
        if (!found) return { name, card: undefined, mana_cost: '', prices: null, count };
        return { ...found, count };
      });
      setDeckCards(built);
    } catch (e) {
      setError(e?.message || 'Erro ao importar deck');
    } finally {
      setLoading(false);
    }
  };

  const saveDeckToList = () => {
    const storedListsString = localStorage.getItem('storedLists') || '[]';
    const storedLists = JSON.parse(storedListsString);
    const idx = storedLists.findIndex((l) => l.name === (listName || 'Imported'));
    if (idx >= 0) storedLists[idx].cards = deckCards;
    else storedLists.push({ name: listName || 'Imported', cards: deckCards });
    localStorage.setItem('storedLists', JSON.stringify(storedLists));
    alert('Deck guardado na lista.');
  };

  return (
    <Box m="20px" height="auto">
      <Header variant="h4" mb="20px" title="Card / Deck" subtitle={listName ? `From list: ${listName}` : ''} />

      <Box mb="20px" display="flex" alignItems="center" gap={2}>
        <Button variant="contained" color="primary" onClick={handleGoBack}>
          <Typography>Go back</Typography>
        </Button>
      </Box>

      {name && singleCard && (
        <Box mb={4} ml="20px">
          <Typography variant="h6" gutterBottom>Card Details</Typography>
          <CardList card={singleCard} />
        </Box>
      )}

      {/* Importador de deck */}
      <Box mb={2}>
        <Typography variant="h6" gutterBottom>Importar deck (colar lista)</Typography>
        <TextField
          label="Decklist"
          placeholder={`4x Illusions of Grandeur\n1 Donate\n1 Demonic Pact\n...`}
          value={deckText}
          onChange={(e) => setDeckText(e.target.value)}
          multiline
          minRows={8}
          fullWidth
        />
        <Stack direction="row" spacing={2} mt={2} alignItems="center">
          <Button variant="contained" color="secondary" onClick={importDeck} disabled={!parsed.length || loading}>
            Importar deck
          </Button>
          <Typography variant="body2" color="text.secondary">
            {parsed.length ? `${parsed.length} nomes detetados` : 'Sem cartas detetadas'}
          </Typography>
          {deckCards.length > 0 && (
            <Button variant="outlined" onClick={saveDeckToList}>Guardar deck nesta lista</Button>
          )}
        </Stack>
        {loading && <Box mt={2}><LinearProgress /></Box>}
      </Box>

      {deckCards.length > 0 && (
        <Box mt={3}>
          <Typography variant="h6" gutterBottom>Deck (imagens)</Typography>
          <CardList cards={deckCards} />
        </Box>
      )}

      {error && <Typography mt={2} color="error">{error}</Typography>}
    </Box>
  );
};

export default ListCardDetailScene;
