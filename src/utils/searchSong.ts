import axios from "axios";

const searchSong = async (token: string, song: string) => {
  try {
    const encodedSong = encodeURIComponent(song);

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=name:${encodedSong}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const trackUri = response.data.tracks.items[0].uri;
    return { name: song, trackUri };
  } catch (error) {
    console.error(`Error searching song: ${song}`, error);
    return { name: song, error };
  }
};
export default searchSong;
