import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLocalStorage } from "@vueuse/core";

import type { SpotifyAuthParams } from "@/utils/types";
import { getAccessTokenFromSpotify } from "@/utils/api";
import { redirectUrl } from "@/utils/helpers";

const isAuthenticated = ref(false);

export async function useSpotifyAuth() {
  const router = useRouter();
  const route = useRoute();
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const code = route?.query.code as string;

  const spotifyToken = useLocalStorage("spotifyToken", "");
  isAuthenticated.value = !!spotifyToken.value;

  if (code) {
    if (!isAuthenticated.value) {
      spotifyToken.value = await getAccessToken(clientId, code);
      isAuthenticated.value = !!spotifyToken;
    }

    if (isAuthenticated.value) {
      router.push({ name: "Home" });
    }
  }

  return { isAuthenticated };
}

export async function redirectToAuth() {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", redirectUrl);
  params.append("scope", "user-read-private user-read-email");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function getAccessToken(clientId: string, code: string) {
  const verifier = localStorage.getItem("verifier");

  const params: SpotifyAuthParams = {
    client_id: clientId,
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUrl,
    code_verifier: verifier!,
  };

  const data = await getAccessTokenFromSpotify(params);

  return data.access_token;
}

function generateCodeVerifier(length: number) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
