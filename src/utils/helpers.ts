const { VITE_LOCAL_HOST_URL, VITE_PRODUCTION_URL } = import.meta.env;

export const redirectUrl =
  import.meta.env.MODE === "development"
    ? VITE_LOCAL_HOST_URL
    : VITE_PRODUCTION_URL;

//  Convert a "dd/mm/yyyy" string into a Date object
export function convertToDate(dateString: string) {
  const dateParts = dateString.split("-");
  const dateObject = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
  return dateObject;
}

export function generateSpotifyCodeVerifier(length: number) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export async function generateSpotifyCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
