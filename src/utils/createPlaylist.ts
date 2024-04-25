import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { SpotifyPlaylistType } from "@/@types/spotify";

const createPlaylist = async (
  userId: string,
  token: string,
  setMessage: Dispatch<SetStateAction<string>>,
  playlistName?: string
) => {
  try {
    if (!playlistName) playlistName = "my songs";
    const { data }: { data: SpotifyPlaylistType } = await axios.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      { name: playlistName, public: true },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    setMessage(`Error generating playlist: ${error}`);
  }
};

export default createPlaylist;
