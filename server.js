const express = require('express');
const app = express();
const PORT = 3000;

const tracks = require('./data/tracks.json');
const quotes = require('./data/quotes.json');

// Serve static files from public directory
app.use(express.static('public'));

// Endpoint to return a random track
app.get('/track', (req, res) => {
  const mood = req.query.vibe?.toLowerCase();

  if (mood && tracks[mood]) {
    const moodTracks = tracks[mood];
    const randomTrack = moodTracks[Math.floor(Math.random() * moodTracks.length)];
    return res.json({ url: randomTrack });
  } else {
    // fallback to any track if mood is not found
    const allTracks = Object.values(tracks).flat();
    const randomTrack = allTracks[Math.floor(Math.random() * allTracks.length)];
    return res.json({ url: randomTrack });
  }
});


// Endpoint to return a mood-based quote
app.get('/mood', (req, res) => {
  const mood = req.query.vibe?.toLowerCase();
  
  if (mood && quotes[mood]) {
    const moodQuotes = quotes[mood];
    const randomQuote = moodQuotes[Math.floor(Math.random() * moodQuotes.length)];
    res.json({ quote: randomQuote });
  } else {
    res.json({ quote: "Vibe with the moment." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🎧 Lo-Fi Vibes Server is running at http://localhost:${PORT}`);
});
