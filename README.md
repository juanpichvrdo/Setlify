# Setlify

Convert concert setlists to Spotify playlists. Powered by [Spotify API](https://developer.spotify.com/) and [Setlist.fm API](https://api.setlist.fm/docs/1.0/index.html).

## Prerequisites

 - [Node v18.1.0](https://nodejs.org/en) 
 - Setlistfm API key. Can be obtained [here](https://api.setlist.fm/docs/1.0/index.html) .
 - Spotify Client ID. For this a Spotify App needs to be created and the local and production URLs need to be entered to the *Redirect URIs* field. Documentation [here](https://developer.spotify.com/documentation/web-api/concepts/apps).
 
 Note: To be able log in users with Spotify it may be required to manually add the users first through the *Users Management* panel on the Spotify Dashboard. This is because the Spotify API is in the development quota mode. In this mode up to 25 authenticated Spotify users can use an app and each Spotify user who installs the app will need to be added to the app allowlist before they can use it. More info [here](https://developer.spotify.com/documentation/web-api/concepts/quota-modes).


## Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install
```

### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev
```

### Compiles and minifies for production

```
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build
```

### Env variables

Create a file named `.env.local` and copy the contents of `.env.example` there. 

The following enviroment variables are required:

```
VITE_SPOTIFY_CLIENT_ID
VITE_SETLIST_FM_API_KEY
VITE_LOCAL_HOST_URL
VITE_PRODUCTION_URL
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).


## License

MIT

## Author

Juan Daniel

website: [juanpichvrdo.com](https://juanpichvrdo.com/)
