import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { SpotifyPlaylistType } from "@/@types/spotify";

export default async function getPlaylist({
  playlistId,
  token,
  setMessage,
}: {
  playlistId: string;
  token?: string;
  setMessage: Dispatch<SetStateAction<string>>;
}) {
  if (!token) return;

  try {
    const { data }: { data: SpotifyPlaylistType } = await axios.get(
      `https://api.spotify.com/v1/users/spotify/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error) {
    setMessage(`Error getting playlist data: ${error}`);
  }
}
