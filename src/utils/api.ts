import axios, { AxiosError } from "axios";
import type {
  SpotifyAuthParams,
  SpotifyAuthResponse,
  SetlistFMParams,
  SetlistResponse,
  Setlist,
  SpotifyUser,
  GeneratePlaylistData,
  SpotifyTrack,
  SpotifyPlaylist,
} from "@/utils/types";
import { useSnackbar } from "@/utils/composables/useSnackbar";
import { useSetlists } from "@/utils/composables/useSetlists";

const { displaySnackbar } = useSnackbar();
const { shouldShowNoResultsMessage } = useSetlists();

// Third party CORS proxy to avoid CORS erros without spining my own
const proxyUrl = "https://corsproxy.io/?";

const spotifyAuthApi = axios.create({
  baseURL: "https://accounts.spotify.com/",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

const spotifyApi = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

spotifyApi.interceptors.request.use((config) => {
  const spotifyToken = localStorage.getItem("spotifyToken");
  config.headers.Authorization = "Bearer " + spotifyToken;
  return config;
});

const setlistFmApi = axios.create({
  baseURL: proxyUrl + "https://api.setlist.fm/rest/1.0/",
  headers: {
    Accept: "application/json",
    "x-api-key": import.meta.env.VITE_SETLIST_FM_API_KEY,
  },
});

export async function getAccessTokenFromSpotifyAPI(
  params: SpotifyAuthParams
): Promise<SpotifyAuthResponse> {
  let data = [];

  try {
    const response = await spotifyAuthApi.post("/api/token", {
      ...params,
    });

    data = response.data;
  } catch (error) {
    displaySnackbar((error as AxiosError).message, "red");
    console.log(error);
  }

  return data;
}

export async function getSetlistsAPI(
  params: SetlistFMParams
): Promise<SetlistResponse> {
  let data = [];

  try {
    const response = await setlistFmApi.get("/search/setlists?", { params });

    data = response.data;
  } catch (error) {
    const isAxiosErrorAnd404 =
      axios.isAxiosError(error) && error.response?.status === 404;

    if (isAxiosErrorAnd404) {
      shouldShowNoResultsMessage.value = true;
    } else {
      displaySnackbar((error as AxiosError).message, "red");
      console.log(error);
    }
  }

  return data;
}

export async function getSetlistByIdAPI(setlistId: string): Promise<Setlist> {
  let data = [];

  try {
    const response = await setlistFmApi.get(`/setlist/${setlistId}`);

    data = response.data;
  } catch (error) {
    displaySnackbar((error as AxiosError).message, "red");
    console.log(error);
  }

  return data;
}

export async function getSpotifyUserAPI(): Promise<SpotifyUser> {
  let data = [];

  try {
    const response = await spotifyApi.get(`/me`);

    data = response.data;
  } catch (error) {
    displaySnackbar((error as AxiosError).message, "red");
    console.log(error);
  }

  return data;
}

export async function generateSpotifyPlaylistAPI(
  playlistData: GeneratePlaylistData
): Promise<SpotifyPlaylist> {
  let data = [];

  const { userId, playlistTitle: name, isPublic } = playlistData;

  try {
    const response = await spotifyApi.post(`/users/${userId}/playlists`, {
      name,
      public: isPublic,
      description: "Generated on Setlify.",
    });

    data = response.data;
  } catch (error) {
    displaySnackbar((error as AxiosError).message, "red");
    console.log(error);
  }

  return data;
}

export async function addTracksToSpotifyPlaylistAPI(
  playlistId: string,
  tracksUris: string
) {
  let data = [];

  try {
    const response = await spotifyApi.post(
      `/playlists/${playlistId}/tracks?uris=${tracksUris}`
    );

    data = response.data;
  } catch (error) {
    displaySnackbar((error as AxiosError).message, "red");
    console.log(error);
  }

  return data;
}

export async function searchSpotifyTrack(
  trackToSearch: string,
  artist: string
): Promise<SpotifyTrack> {
  let data = [];

  try {
    const response = await spotifyApi.get(`/search`, {
      params: {
        q: `track:${trackToSearch} artist:${artist}`,
        type: "track",
        limit: 1,
      },
    });

    data = response.data;
  } catch (error) {
    displaySnackbar((error as AxiosError).message, "red");
    console.log(error);
  }

  return data;
}
