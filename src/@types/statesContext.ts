import { Dispatch, SetStateAction } from "react";
import { SpotifyPlaylistType } from "./spotify";

export interface AuthDataType {
  token: string;
  userId: string;
  expiresIn: number;
}

export interface StatesContextType {
  token: string;
  userId: string;
  isTaskRunning: boolean;
  progress: number;
  message: string;
  playlistData: SpotifyPlaylistType | null;
  errorSongs: string[];
  songImgUrls: (string | null)[];
  setTokenAndUserId: ({
    token,
    userId,
  }: {
    token: string;
    userId: string;
  }) => void;
  setIsTaskRunning: Dispatch<SetStateAction<boolean>>;
  setProgress: Dispatch<SetStateAction<number>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setPlaylistData: Dispatch<SetStateAction<SpotifyPlaylistType | null>>;
  setErrorSongs: Dispatch<SetStateAction<string[]>>;
  setSongImgUrls: Dispatch<SetStateAction<(string | null)[]>>;
  resetProcess: () => void;
}
