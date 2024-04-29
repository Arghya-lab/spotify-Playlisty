import axios from "axios";
import { UserPlaylistsType } from "@/@types/spotify";
import { Dispatch, SetStateAction } from "react";

export default async function getUserPlaylists({
  token,
  userId,
  setUserPlaylistsData,
}: {
  token?: string;
  userId?: string;
  setUserPlaylistsData: Dispatch<SetStateAction<UserPlaylistsType | null>>;
}) {
  if (!userId || !token) return;

  try {
    const { data }: { data: UserPlaylistsType } = await axios.get(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUserPlaylistsData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
