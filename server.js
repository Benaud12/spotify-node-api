const rp = require('request-promise-native');
const cors = require('cors');
const express = require('express');
const app = express();
const SpotifyClient = require('./lib/SpotifyClient');

const PORT = process.env.PORT || 3000;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const spotifyClient = new SpotifyClient({
  clientId : clientId,
  clientSecret : clientSecret
});

const corsOptions = {
  origin: [/http:\/\/localhost.*/, /http:\/\/micks-pi-factory\.local.*/]
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Oh HIYA!');
});

app.get('/api/authenticate/client', (req, res) => {
  spotifyClient.authenticate()
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
});

app.get('/api/search/playlist', (req, res) => {
  const searchQuery = encodeURI(req.query.q);

  spotifyClient.searchPlaylists(searchQuery)
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      res.status(error.status || 500).send(error);
    });
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT} bitches!`);
});
