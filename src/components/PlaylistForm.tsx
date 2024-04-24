import { useStates } from "../context/StatesContext";
import delay from "../utils/delay";
import createPlaylist from "../utils/createPlaylist";
import searchSong from "../utils/searchSong";
import addTracksToPlaylist from "../utils/addTracksToPlaylist";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

function PlaylistForm() {
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

  const trackUris: string[] = []; // Array to store track URIs

  const generatePlaylist = async () => {
    const songNames = JSON.parse(songsNames) as string[];

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
    await delay(2000);

    // Search songs and collect URIs
    const searchPromises = async () => {
      const promises = songNames.map(async (song, index) => {
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
        await delay(2000);
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
      await delay(2000);
      iteration++;
    }

    setMessage(`New Spotify Playlist ${playlistName} created!`);
    setProgress(100);
  };

  return (
    <div className="w-[calc(100%-2rem)] max-w-3xl py-16 pt-32 sm:pt-48 grid gap-6">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="playlistName">Playlist Name</Label>
        <Input
          type="text"
          id="playlistName"
          placeholder="my songs"
          maxLength={16}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="songs">Songs To Add</Label>
        <Textarea
          placeholder="Type your songs here."
          id="songs"
          rows={16}
          cols={36}
          onChange={(e) => setSongsNames(e.target.value)}
        />
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setSongsNames("")}>
          Clear
        </Button>
        <Button onClick={generatePlaylist}>Generate</Button>
      </div>
    </div>
  );
}

export default PlaylistForm;
