import { ref } from "vue";
import { useRoute } from "vue-router";
import type { SpotifyAuthParams, SpotifyUser } from "@/utils/types";
import { getAccessTokenFromSpotifyAPI, getSpotifyUserAPI } from "@/utils/api";
import {
  redirectUrl,
  generateSpotifyCodeVerifier,
  generateSpotifyCodeChallenge,
} from "@/utils/helpers";
import { useSnackbar } from "@/utils/composables/useSnackbar";

const isAuthenticated = ref(false);
const shouldOpenAlertOnSpotifyAuthError = ref(false);

export function useSpotifyAuth() {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const route = useRoute();
  const code = route?.query.code as string;

  const { displaySnackbar } = useSnackbar();

  const loginToSpotify = async () => {
    try {
      const spotifyToken = localStorage.getItem("spotifyToken");
      isAuthenticated.value = !!spotifyToken;

      if (code) {
        if (!isAuthenticated.value) {
          const spotifyToken = await getAccessToken(code);
          localStorage.setItem("spotifyToken", spotifyToken);
          isAuthenticated.value = !!spotifyToken;
        }
      }

      const spotifyTokenExpireDate = localStorage.getItem(
        "spotifyTokenExpireDate"
      );
      const isTokenExpired =
        new Date().getTime() > parseInt(spotifyTokenExpireDate as string);

      if (isTokenExpired) {
        await refreshAccessToken();
      }

      const spotifyUserJson = localStorage.getItem("spotifyUser");
      const spotifyUser: SpotifyUser = JSON.parse(spotifyUserJson as string);
      if (isAuthenticated.value && !spotifyUser?.id) {
        const spotifyUserData = await getSpotifyUserAPI();

        localStorage.setItem("spotifyUser", JSON.stringify(spotifyUserData));
      }
    } catch (error) {
      displaySnackbar(
        "An error occurred while authenticating to Spotify.",
        "red"
      );
    }
  };

  const redirectToAuth = async () => {
    const verifier = generateSpotifyCodeVerifier(128);
    const challenge = await generateSpotifyCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", redirectUrl);
    params.append(
      "scope",
      "playlist-modify-public playlist-modify-private user-read-private user-read-email"
    );
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  };

  const getAccessToken = async (code: string) => {
    const verifier = localStorage.getItem("verifier");

    const params: SpotifyAuthParams = {
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUrl,
      code_verifier: verifier!,
    };

    const tokenData = await getAccessTokenFromSpotifyAPI(params);

    const spotifyTokenExpireDate = new Date(
      tokenData.expires_in * 1000 + new Date().getTime()
    )
      .getTime()
      .toString();

    localStorage.setItem("spotifyTokenExpireDate", spotifyTokenExpireDate);
    localStorage.setItem("refreshToken", tokenData.refresh_token);

    return tokenData.access_token;
  };

  const refreshAccessToken = async () => {
    const refresh_token = localStorage.getItem("refreshToken") as string;

    const params: SpotifyAuthParams = {
      client_id: clientId,
      grant_type: "refresh_token",
      refresh_token,
    };

    const tokenData = await getAccessTokenFromSpotifyAPI(params);

    const spotifyTokenExpireDate = new Date(
      tokenData.expires_in * 1000 + new Date().getTime()
    )
      .getTime()
      .toString();

    localStorage.setItem("spotifyTokenExpireDate", spotifyTokenExpireDate);
    localStorage.setItem("spotifyToken", tokenData.access_token);
    localStorage.setItem("refreshToken", tokenData.refresh_token);

    return tokenData;
  };

  const logout = () => {
    localStorage.removeItem("spotifyTokenExpireDate");
    localStorage.removeItem("spotifyToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("spotifyUser");
  };

  return {
    loginToSpotify,
    redirectToAuth,
    getAccessToken,
    logout,
    shouldOpenAlertOnSpotifyAuthError,
    isAuthenticated,
  };
}
