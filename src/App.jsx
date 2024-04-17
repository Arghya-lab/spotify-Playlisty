import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Initializing task.");

  const getUserId = async (access_token) => {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const res = await response.json();
    if (res.error) {
      setToken("");
      return;
    }
    setUserId(res.id);
  };

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const tokenData = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      setToken(tokenData);
      getUserId(tokenData);

      window.location.hash = "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const trackUris = []; // Array to store track URIs

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const generatePlaylist = async () => {
    setLoading(true);

    try {
      const songNames = JSON.parse(input);
      const playlistName = "pop-hits";

      await delay(2000); // Wait for 2 seconds before the next iteration

      // Create the playlist
      const {
        data: { id: playlistId },
      } = await axios.post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        { name: playlistName, public: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      await delay(2000); // Wait for 2 seconds before the next iteration

      // Search songs and collect URIs in parallel
      const searchPromises = async (startIdx, endIdx) => {
        const promises = songNames
          .slice(startIdx, endIdx)
          .map(async (song, index) => {
            const encodedSong = encodeURIComponent(song);
            try {
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
              trackUris.push(trackUri);
              return { id: index, name: song, trackUri };
            } catch (error) {
              console.error(`Error searching song: ${song}`, error);
              return { id: index, name: song, error };
            }
          });

        for (const promise of promises) {
          const result = await promise;
          setMessage(
            result?.trackUri
              ? `Processed song : ${result.name}`
              : `Error occur while processed song : ${result.name}`
          );
          setProgress(Math.floor((Number(result.id) * 95) / trackUris.length));
          await delay(2000); // Wait for 2 seconds before the next iteration
        }
      };

      await searchPromises();

      // Add tracks to the playlist
      const addTracksToPlaylist = async (tracksLinks) =>
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

      let iteration = 1;
      while (iteration * 80 < trackUris.length) {
        await addTracksToPlaylist(
          trackUris.slice((iteration - 1) * 80, iteration * 80)
        );
        await delay(2000); // Wait for 2 seconds before the next iteration
        iteration++;
      }

      setMessage(`New Spotify Playlist ${playlistName} created!`);
      setProgress(100);
    } catch (error) {
      setMessage("Error generating playlist:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Create Spotify Playlist</h1>
      {token ? (
        <>
          {!loading ? (
            <div className="inputRapper">
              <textarea
                type="text"
                rows="16"
                cols="36"
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter song names as an array"
              />
              <div className="btnRapper">
                <button className="clrBtn" onClick={() => setInput("")}>
                  Clear
                </button>
                <button onClick={generatePlaylist}>Generate</button>
              </div>
            </div>
          ) : (
            <div className="progressRapper">
              <div>
                <h5>Loading....</h5>
                <h6>completed {progress}%</h6>
              </div>
              <h4>{message}</h4>
            </div>
          )}
          {/* {loaded ? <SpotifyPlaylist playlistArray={songs} /> : null} */}
        </>
      ) : (
        <button className="loginBtn" onClick={spotifyLogin}>
          Login To Start
        </button>
      )}
    </div>
  );
}

export default App;
