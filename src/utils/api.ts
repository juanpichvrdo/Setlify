import axios from "axios";
import type {
  SpotifyAuthParams,
  SpotifyAuthResponse,
  SetlistFMParams,
} from "@/utils/types";

// Third party CORS proxy to avoid CORS erros without spining my own backend
const proxyUrl = "https://cors-anywhere.herokuapp.com/";

const spotifyAuthApi = axios.create({
  baseURL: "https://accounts.spotify.com/",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

const setlistFmApi = axios.create({
  baseURL: proxyUrl + "https://api.setlist.fm/rest/1.0/",
  headers: {
    Accept: "application/json",
    "x-api-key": import.meta.env.VITE_SETLIST_FM_API_KEY,
  },
});

export async function getAccessTokenFromSpotify(
  params: SpotifyAuthParams
): Promise<SpotifyAuthResponse> {
  let data = [];

  try {
    const response = await spotifyAuthApi.post("/api/token", {
      ...params,
    });

    data = response.data;
  } catch (error) {
    console.log(error);
  }

  return data;
}

export async function getSetlistsAPI(params: SetlistFMParams) {
  let data = [];

  try {
    const response = await setlistFmApi.get(`/search/setlists`, { params });

    data = response.data;
  } catch (error) {
    console.log(error);
  }

  return data;
}
