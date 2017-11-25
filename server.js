const SpotifyWebApi = require('spotify-web-api-node');
const rp = require('request-promise-native');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const SpotifyClient = require('./lib/SpotifyClient');
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const spotifyClient = new SpotifyClient({
  clientId : clientId,
  clientSecret : clientSecret
});

app.get('/', (req, res) => {
  res.send('Oh HIYA!');
});

app.get('/api/authenticate/client', (req, res) => {
  spotifyClient.authenticate()
    .then(response => {
      console.log('auth resp: ', response);
      res.send('AUTH SUCCESS!');
    })
    .catch(error => {
      console.error('auth error: ', error);
      res.status(500).send('AUTH ERROR!');
    })
});

app.get('/api/search/playlist', (req, res) => {
  const searchQuery = encodeURI(req.query.q);
  console.log('query: ', req.query.q);
  console.log('query coded: ', searchQuery);

  spotifyClient.searchPlaylists(searchQuery)
    .then(response => {
      console.log('api response: ', response);
      res.send(JSON.stringify(response, undefined, 2));
    })
    .catch(error => {
      console.error('api error: ', error);
      res.status(403).send('API ERROR!');
    });
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT} bitches!`);
});
