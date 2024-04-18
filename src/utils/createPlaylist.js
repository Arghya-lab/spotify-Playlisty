import axios from "axios";

const createPlaylist = async (
  userId,
  token,
  setMessage,
  playlistName = "my songs"
) => {
  try {
    const { data } = await axios.post(
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
    setMessage("Error generating playlist:", error);
  }
};

export default createPlaylist;
