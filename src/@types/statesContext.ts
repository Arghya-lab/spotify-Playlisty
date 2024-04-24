import { Dispatch, SetStateAction } from "react";

export interface StatesContextType {
  token: string;
  userId: string;
  songsNames: string;
  playlistName: string;
  isTaskRunning: boolean;
  progress: number;
  message: string;
  setTokenAndUserId: ({
    token,
    userId,
  }: {
    token: string;
    userId: string;
  }) => void;
  setIsTaskRunning: Dispatch<SetStateAction<boolean>>;
  setPlaylistName: Dispatch<SetStateAction<string>>;
  setSongsNames: Dispatch<SetStateAction<string>>;
  setProgress: Dispatch<SetStateAction<number>>;
  setMessage: Dispatch<SetStateAction<string>>;
}
