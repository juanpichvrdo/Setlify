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

export interface SetlistResponse {
  type: string;
  itemsPerPage: number;
  page: number;
  total: number;
  setlist: Setlist[];
}

export interface Setlist {
  id: string;
  versionId: string;
  eventDate: string;
  lastUpdated: string;
  artist: Artist;
  venue: Venue;
  sets: Sets;
  url: string;
  info?: string;
  tour?: Tour;
}

export interface SetlistsFormatted {
  artist: Artist;
  eventDate: string;
  id: string;
  set: Song[];
  venue: Venue;
  info?: string;
}

export interface Artist {
  mbid: string;
  name: string;
  sortName: string;
  disambiguation: string;
  url: string;
}

export interface Sets {
  set: Set[];
}

export interface Set {
  song: Song[];
}

export interface Song {
  name: string;
  cover?: Artist;
  info?: string;
  tape?: boolean;
  with?: Artist;
}

export interface Tour {
  name: string;
}

export interface Venue {
  id: string;
  name: string;
  city: City;
  url: string;
}

export interface City {
  id: string;
  name: string;
  state: string;
  stateCode: string;
  coords: Coords;
  country: Country;
}

export interface Coords {
  lat: number;
  long: number;
}

export interface Country {
  code: string;
  name: string;
}
