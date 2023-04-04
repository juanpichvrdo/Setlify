export interface SpotifyAuthParams {
  client_id: string;
  grant_type: "authorization_code" | "refresh_token";
  refresh_token?: string;
  code?: string;
  redirect_uri?: string;
  code_verifier?: string | null;
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

export interface GeneratePlaylistData {
  userId: string;
  songs: string[];
  playlistTitle: string;
  isPublic: boolean;
  artistName: string;
}

export interface SpotifyPlaylist {
  collaborative: boolean;
  description: null;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: any[];
  name: string;
  owner: Owner;
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

export interface Followers {
  href: null;
  total: number;
}

export interface Owner {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface Tracks {
  href: string;
  items: any[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface SpotifyUser {
  country: string;
  display_name: string;
  email: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

export interface SpotifyTrack {
  album: Album;
  artists: Artist[];
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface Album {
  album_group: string;
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_playable: boolean;
  name: string;
  release_date: Date;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface Image {
  height: null;
  url: string;
  width: null;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface ExternalIDS {
  isrc: string;
}
