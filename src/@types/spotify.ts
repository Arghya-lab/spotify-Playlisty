export interface ImgType {
  url?: string;
  height: number;
  width: number;
}

export interface ExternalUrlType {
  spotify: string;
}

export interface RestrictionType {
  reason: string;
}

export interface FollowerType {
  href: string | null;
  total: number;
}

export interface AlbumType {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrlType;
  href: string;
  id: string;
  images: ImgType[] | null;
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: RestrictionType;
  type: string;
  uri: string;
  artists: {
    external_urls: ExternalUrlType;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }[];
}

export interface ArtistType {
  external_urls: ExternalUrlType;
  followers: FollowerType;
  genres: string[];
  href: string;
  id: string;
  images: ImgType[] | null;
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface SpotifyTrackType {
  album: AlbumType;
  artists: ArtistType[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  external_urls: ExternalUrlType;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: object;
  restrictions: RestrictionType;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface UserType {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: ExternalUrlType;
  followers: FollowerType;
  href: string;
  id: string;
  images: ImgType[] | null;
  product: string;
  type: string;
  uri: string;
}

export interface OwnerType {
  external_urls: ExternalUrlType;
  followers: FollowerType;
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string | null;
}

export interface UserPlaylistsItemType {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrlType;
  href: string;
  id: string;
  images: ImgType[] | null;
  name: string;
  owner: OwnerType;
  public: boolean;
  snapshot_id: string;
  type: string;
  uri: string;
  tracks: {
    href: string;
    total: number;
  };
}

export interface UserPlaylistsType {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: UserPlaylistsItemType[];
}

export interface SpotifyPlaylistType {
  collaborative: boolean;
  description: string | null;
  external_urls: ExternalUrlType;
  followers: FollowerType;
  href: string;
  id: string;
  images: ImgType[] | null;
  name: string;
  owner: OwnerType;
  primary_color?: string | null;
  public: boolean;
  snapshot_id: string;
  type: string;
  uri: string;
  tracks: {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: {
      added_at: string;
      added_by: {
        external_urls: ExternalUrlType;
        followers: FollowerType;
        href: string;
        id: string;
        type: string;
        uri: string;
      };
      is_local: boolean;
      track: SpotifyTrackType;
    }[];
  };
}

export interface SpotifySearchTracksResType {
  tracks: {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: SpotifyTrackType[];
  };
}
