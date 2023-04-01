export interface SpotifyAuthParams {
  client_id: string;
  grant_type: "authorization_code";
  code: string;
  redirect_uri: "http://localhost:3000/";
  code_verifier: string | null;
}

export interface SpotifyAuthResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}

export interface SetlistFMParams {
  artistName: string;
  p?: number;
}
