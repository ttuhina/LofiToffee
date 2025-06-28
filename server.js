const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const tracks = require('./data/tracks.json');
const quotes = require('./data/quotes.json');

// Serve static files from public folder
app.use(express.static('public'));

// Endpoint to get a random lo-fi track
app.get('/track', (req, res) => {
  const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
  res.json({ url: randomTrack });
});

// Endpoint to get quote based on mood
app.get('/mood', (req, res) => {
  const mood = req.query.vibe?.toLowerCase();
  if (mood && quotes[mood]) {
    const randomQuote = quotes[mood][Math.floor(Math.random() * quotes[mood].length)];
    res.json({ quote: randomQuote });
  } else {
    res.json({ quote: "Vibe with the moment." });
  }
});

app.listen(PORT, () => {
  console.log(`🎧 Lo-Fi Server running at http://localhost:${PORT}`);
});
