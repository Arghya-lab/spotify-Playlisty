import { Dispatch, SetStateAction } from "react";
import { SpotifyPlaylistType, UserType, UserPlaylistsType } from "./spotify";

export interface AuthDataType {
  token: string;
  user: UserType | null;
  expiresIn: number;
}

export enum PageEnum {
  LOGINPAGE = "loginPage",
  USERPAGE = "userPage",
  CREATEPLAYLISTPAGE = "createPlaylistPage",
}
export enum FormTypeEnum {
  CREATEPLAYLIST = "createPlaylist",
  ADDTOEXISTING = "addToExistingPlaylist",
}

export interface StatesContextType {
  currentPage: PageEnum;
  user: UserType | null;
  token: string;
  userPlaylistsData: UserPlaylistsType | null;
  isTaskRunning: boolean;
  playlistFormType: string;
  playlistFormInitialUrl: string;
  progress: number;
  message: string;
  playlistData: SpotifyPlaylistType | null;
  errorSongs: string[];
  songImgUrls: (string | null)[];
  setCurrentPage: Dispatch<SetStateAction<PageEnum>>;
  setUserPlaylistsData: Dispatch<SetStateAction<UserPlaylistsType | null>>;
  setIsTaskRunning: Dispatch<SetStateAction<boolean>>;
  setPlaylistFormType: Dispatch<SetStateAction<string>>;
  setPlaylistFormInitialUrl: Dispatch<SetStateAction<string>>;
  setProgress: Dispatch<SetStateAction<number>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setPlaylistData: Dispatch<SetStateAction<SpotifyPlaylistType | null>>;
  setErrorSongs: Dispatch<SetStateAction<string[]>>;
  setSongImgUrls: Dispatch<SetStateAction<(string | null)[]>>;
  resetProcess: () => void;
}
