import axios from "axios";
import { SpotifyPlaylistType } from "@/@types/spotify";

const validateUserPlaylistWithParams =
  ({ token, userId }: { token: string; userId: string }) =>
  async (playlistId: string) => {
    try {
      const { data }: { data: SpotifyPlaylistType } = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return data.collaborative || data.owner.id === userId;
    } catch (error) {
      return false;
    }
  };

export default validateUserPlaylistWithParams;
