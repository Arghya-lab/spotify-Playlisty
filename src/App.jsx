import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [token, setToken] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const setUserId = async (access_token) => {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const res = await response.json();
    if (res.error) {
      setToken("");
      window.localStorage.removeItem("token");
      return;
    }
    window.localStorage.setItem("user_id", res.id);
  };

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);

    let userId = window.localStorage.getItem("user_id");
    if (!userId) {
      setUserId(token);
    }
  }, []);

  const spotifyLogin = () => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = "http://localhost:5173/";
    const scopes = ["playlist-modify-public"];
    const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopes)}`;
    window.location = url;
  };

  const generatePlaylist = async () => {
    setLoading(true);
  
    try {
      const songNames = JSON.parse(input).slice(0,99);
      const accessToken = window.localStorage.getItem("token");
      const userId = window.localStorage.getItem("user_id");
      const playlistName = "pop-hits";
  
      // Create the playlist
      const { data: { id: playlistId } } = await axios.post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        { name: playlistName, public: true },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      // Array to store track URIs
      const trackUris = [];
  
      // Search songs and collect URIs in parallel
      const searchPromises = songNames.map(async (song) => {
        const encodedSong = encodeURIComponent(song);
        try {
          const response = await axios.get(
            `https://api.spotify.com/v1/search?q=name:${encodedSong}&type=track`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const trackUri = response.data.tracks.items[0].uri;
          trackUris.push(trackUri);
        } catch (error) {
          console.error(`Error searching song: ${song}`, error);
        }
      });
  
      // Wait for all search requests to finish (including potential errors)
      await Promise.all(searchPromises);
  
      // Add tracks to the playlist
      await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        { uris: trackUris },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log(`New Spotify Playlist ${playlistName} created!`);
    } catch (error) {
      console.error("Error generating playlist:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Create Spotify Playlist</h1>
        {token ? (
          <>
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              placeholder="enter song names as an array"
            />
            <button onClick={generatePlaylist}>Generate</button>
            {loading ? <h6>Loading....</h6> : null}
            {/* {loaded ? <SpotifyPlaylist playlistArray={songs} /> : null} */}
          </>
        ) : (
          <button onClick={spotifyLogin}>Login To Start</button>
        )}
      </header>
    </div>
  );
}

export default App;
