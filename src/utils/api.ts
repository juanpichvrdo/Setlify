import axios from "axios";
import type { SpotifyAuthParams, SpotifyAuthResponse } from "@/utils/types";

export async function getAccessTokenFromSpotify(
  params: SpotifyAuthParams
): Promise<SpotifyAuthResponse> {
  let data = [];

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        ...params,
      },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    data = response.data;
  } catch (error) {
    console.log(error);
  }

  return data;
}
