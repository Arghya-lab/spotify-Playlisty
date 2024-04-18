import { useStates } from "../context/StatesContext";
import delay from "../utils/delay";
import createPlaylist from "../utils/createPlaylist";
import searchSong from "../utils/searchSong";
import addTracksToPlaylist from "../utils/addTracksToPlaylist";

function Form() {
  const {
    token,
    userId,
    songsNames,
    playlistName,
    setIsTaskRunning,
    setPlaylistName,
    setSongsNames,
    setProgress,
    setMessage,
  } = useStates();

  const trackUris = []; // Array to store track URIs

  const generatePlaylist = async () => {
    const songNames = JSON.parse(songsNames);
    
    setIsTaskRunning(true);
    setMessage("Analyzing your data.");
    await delay(2000);

    const playlistData = await createPlaylist(
      userId,
      token,
      setMessage,
      playlistName
    );
    setMessage("Waiting for searching songs.");
    await delay(1750);

    // Search songs and collect URIs
    const searchPromises = async (startIdx, endIdx) => {
      const promises = songNames
        .slice(startIdx, endIdx)
        .map(async (song, index) => {
          const searchData = await searchSong(token, song);

          if (searchData?.trackUri) {
            trackUris.push(searchData.trackUri);
          }

          return { id: index, ...searchData };
        });

      for (const promise of promises) {
        const result = await promise;
        setMessage(
          result?.trackUri
            ? `Processed song : ${result.name}`
            : `Error occur while processed song : ${result.name}`
        );
        setProgress(Math.floor((Number(result.id) * 95) / trackUris.length));
        await delay(1750);
      }
    };

    await searchPromises();

    let iteration = 1;
    const trackUriLmt = 50;

    while ((iteration - 1) * trackUriLmt < trackUris.length) {
      const tracksLinks = trackUris.slice(
        (iteration - 1) * trackUriLmt,
        trackUris.length < iteration * trackUriLmt
          ? trackUris.length
          : iteration * trackUriLmt
      );

      await addTracksToPlaylist(token, playlistData.id, tracksLinks);
      await delay(1750);
      iteration++;
    }

    setMessage(`New Spotify Playlist ${playlistName} created!`);
    setProgress(100);
  };

  return (
    <div className="inputRapper">
      <input
        type="text"
        maxLength={16}
        onChange={(e) => setPlaylistName(e.target.value)}
        placeholder="Enter playlist name"
      />
      <textarea
        type="text"
        rows="16"
        cols="36"
        onChange={(e) => setSongsNames(e.target.value)}
        placeholder="Enter song names as an array"
      />
      <div className="btnRapper">
        <button className="clrBtn" onClick={() => setSongsNames("")}>
          Clear
        </button>
        <button onClick={generatePlaylist}>Generate</button>
      </div>
    </div>
  );
}

export default Form;
