export default function getSpotifyPlaylistId(playlistUrl?: string) {
  if (!playlistUrl) return null;
  // Regular expression to match and extract Spotify playlist IDs
  const spotifyPlaylistRegex =
    /^https:\/\/open\.spotify\.com\/playlist\/([a-zA-Z0-9]{22})(\?si=[a-zA-Z0-9]+)?$/;

  // Use regex match to extract the playlist ID
  const match = playlistUrl.match(spotifyPlaylistRegex);

  // Check if there's a match and return the playlist ID (captured group 1)
  return match && match[1] ? match[1] : null;
}
