import axios from "axios";

const addTracksToPlaylist = async (
  token: string,
  playlistId: string,
  tracksLinks: string[]
) => {
  try {
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      { uris: tracksLinks },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export default addTracksToPlaylist;
