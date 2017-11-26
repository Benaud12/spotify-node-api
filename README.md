## Spotify Node API

### Stuff to do...

### Build docker image
```
docker build -t spotify_node .
```

### Run docker image
```
docker run -d -e "CLIENT_ID=<spotify_client_id>" -e "CLIENT_SECRET=<spotify_client_secret>" -p 3000:3000 spotify_node
```