import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import delay from "./delay";
import { SpotifySearchTracksResType } from "@/@types/spotify";

export default async function searchSongs(
  songNames: string[],
  token: string,
  songUrls: (string | null)[],
  setMessage: Dispatch<SetStateAction<string>>,
  setProgress: Dispatch<SetStateAction<number>>,
  setErrorSongs: Dispatch<SetStateAction<string[]>>,
  setSongUrls: Dispatch<React.SetStateAction<(string | null)[]>>
) {
  const trackUris: string[] = [];
  let currentProcessingSongIdx = 0;

  const promises = songNames.map(async (song) => {
    const searchData = await searchSong(token, song);

    if (searchData?.trackUri) {
      trackUris.push(searchData.trackUri);
    }

    return searchData;
  });

  for (const promise of promises) {
    currentProcessingSongIdx++;

    const result = await promise;
    if (result?.error) {
      setErrorSongs((prev) => [...prev, result.name]);
    }
    if (result.ImgUrl && currentProcessingSongIdx <= 4) {
      setSongUrls((prev) => [...prev, result.ImgUrl]);
    }
    setMessage(
      result?.trackUri
        ? `Processed song : ${result.name}`
        : `Error occur while processed song : ${result.name}`
    );
    setProgress(Math.floor((currentProcessingSongIdx * 95) / trackUris.length));
    await delay(2000);
  }
  return trackUris;
}

export const searchSong = async (token: string, song: string) => {
  try {
    const encodedSong = encodeURIComponent(song);

    const { data }: { data: SpotifySearchTracksResType } = await axios.get(
      `https://api.spotify.com/v1/search?q=name:${encodedSong}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const trackUri = data.tracks.items[0].uri;
    const ImgUrl = data.tracks.items[0].album.images[1]?.url;
    return { name: song, trackUri, ImgUrl };
  } catch (error) {
    console.error(`Error searching song: ${song}`, error);
    return { name: song, error };
  }
};
