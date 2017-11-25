const rp = require('request-promise-native');

class SpotifyClient {

  constructor(credentials) {
    this.accessToken;
    this.basicAuth;
    this.name = 'SpotifyClient';

    if (!credentials.clientId || !credentials.clientSecret) {
      throw new Error(`${this.name} requires clientId and clientSecret`);
    }
    this.basicAuth =
      new Buffer(credentials.clientId + ':' + credentials.clientSecret)
      .toString('base64');
  }

  authenticate() {
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': `Basic ${this.basicAuth}`
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };

    return rp.post(authOptions)
      .then(data => {
        console.log(data);
        this.accessToken = data.access_token;
      })
      .catch(error => {
        console.error('auth error: ', error);
        throw new Error(`${this.name} error authenticating: ${error}`);
      });
  }

  searchPlaylists(query) {
    const options = {
      url: `https://api.spotify.com/v1/search?q=${query}&type=playlist`,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      },
      json: true
    };

    return rp.get(options)
      .then(data => {
        console.log('api response: ', data);
        return data;
      })
      .catch(error => {
        console.error('api error: ', error);
        throw new Error(`${this.name} error searching playlists: ${error}`);
      });
  }
}

module.exports = SpotifyClient;