import { createContext, useContext, useEffect, useState } from "react";
import {
  SpotifyPlaylistType,
  UserType,
  UserPlaylistsType,
} from "@/@types/spotify";
import {
  AuthDataType,
  FormTypeEnum,
  PageEnum,
  StatesContextType,
} from "@/@types/statesContext";
import fetchUserData from "@/utils/getUserData";

const StatesContext = createContext<StatesContextType>({
  currentPage: PageEnum.LOGINPAGE,
  user: null,
  token: "",
  userPlaylistsData: null,
  isTaskRunning: false,
  playlistFormType: FormTypeEnum.CREATEPLAYLIST,
  playlistFormInitialUrl: "",
  progress: 0,
  message: "Initializing task.",
  playlistData: null,
  errorSongs: [],
  songImgUrls: [],
  setCurrentPage: () => {},
  setUserPlaylistsData: () => {},
  setIsTaskRunning: () => {},
  setPlaylistFormType: () => {},
  setPlaylistFormInitialUrl: () => {},
  setProgress: () => {},
  setMessage: () => {},
  setPlaylistData: () => {},
  setErrorSongs: () => {},
  resetProcess: () => {},
  setSongImgUrls: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useStates = () => useContext(StatesContext);

export const StatesProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPage, setCurrentPage] = useState(PageEnum.LOGINPAGE);
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState("");
  const [userPlaylistsData, setUserPlaylistsData] =
    useState<UserPlaylistsType | null>(null);
  const [isTaskRunning, setIsTaskRunning] = useState(false);
  const [playlistFormType, setPlaylistFormType] = useState<string>(
    FormTypeEnum.CREATEPLAYLIST
  );
  const [playlistFormInitialUrl, setPlaylistFormInitialUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Initializing task.");
  const [playlistData, setPlaylistData] = useState<SpotifyPlaylistType | null>(
    null
  );
  const [errorSongs, setErrorSongs] = useState<string[]>([]);
  const [songImgUrls, setSongImgUrls] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const saveUserData = (user: UserType, token: string) => {
    localStorage.setItem(
      "spotifyUserData",
      JSON.stringify({
        user,
        token,
        expiresIn: new Date().getTime() + 1000 * 60 * 60,
      })
    );

    setUser(user);
    setToken(token);
    setCurrentPage(PageEnum.USERPAGE);
  };

  useEffect(() => {
    (async () => {
      const storedAuthDataString = localStorage.getItem("spotifyUserData");
      const authData: AuthDataType = storedAuthDataString
        ? JSON.parse(storedAuthDataString)
        : { token: "", user: null, expiresIn: 0 };

      if (
        new Date().getTime() < authData.expiresIn &&
        authData.token &&
        authData.user
      ) {
        setToken(authData.token);
        setUser(authData.user);
        setCurrentPage(PageEnum.USERPAGE);
      } else {
        const userData = await fetchUserData();
        if (userData?.token && userData.user) {
          saveUserData(userData.user, userData.token);
        }
      }
    })();
  }, []);

  const resetProcess = () => {
    setIsTaskRunning(false);
    setProgress(0);
    setMessage("Initializing task.");
    setPlaylistData(null);
    setSongImgUrls([]);
    setPlaylistFormInitialUrl("");
    setPlaylistFormType(FormTypeEnum.CREATEPLAYLIST);
    setErrorSongs([]);
  };

  return (
    <StatesContext.Provider
      value={{
        currentPage,
        user,
        token,
        userPlaylistsData,
        isTaskRunning,
        playlistFormType,
        playlistFormInitialUrl,
        progress,
        message,
        playlistData,
        errorSongs,
        songImgUrls,
        setCurrentPage,
        setUserPlaylistsData,
        setIsTaskRunning,
        setPlaylistFormType,
        setPlaylistFormInitialUrl,
        setProgress,
        setMessage,
        setPlaylistData,
        setErrorSongs,
        setSongImgUrls,
        resetProcess,
      }}>
      {children}
    </StatesContext.Provider>
  );
};
