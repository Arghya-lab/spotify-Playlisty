import { SpotifyPlaylistType } from "@/@types/spotify";
import { AuthDataType, StatesContextType } from "@/@types/statesContext";
import { createContext, useContext, useEffect, useState } from "react";

const StatesContext = createContext<StatesContextType>({
  token: "",
  userId: "",
  isTaskRunning: false,
  progress: 0,
  message: "Initializing task.",
  playlistData: null,
  errorSongs: [],
  songImgUrls: [],
  setTokenAndUserId: () => {},
  setIsTaskRunning: () => {},
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
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [isTaskRunning, setIsTaskRunning] = useState(false);
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

  useEffect(() => {
    const storedAuthDataString = localStorage.getItem("spotifyAuthData");
    const authData: AuthDataType = storedAuthDataString
      ? JSON.parse(storedAuthDataString)
      : { token: "", userId: "", expiresIn: 0 };

    if (
      new Date().getTime() < authData.expiresIn &&
      authData.token &&
      authData.userId
    ) {
      setToken(authData.token);
      setUserId(authData.userId);
    }
  }, []);

  const setTokenAndUserId = ({
    token,
    userId,
  }: {
    token: string;
    userId: string;
  }) => {
    localStorage.setItem(
      "spotifyAuthData",
      JSON.stringify({
        token,
        userId,
        expiresIn: new Date().getTime() + 1000 * 60 * 60,
      })
    );

    setToken(token);
    setUserId(userId);
  };
  const resetProcess = () => {
    setIsTaskRunning(false);
    setProgress(0);
    setMessage("Initializing task.");
    setPlaylistData(null);
    setErrorSongs([]);
  };

  return (
    <StatesContext.Provider
      value={{
        token,
        userId,
        isTaskRunning,
        progress,
        message,
        playlistData,
        errorSongs,
        songImgUrls,
        setTokenAndUserId,
        setIsTaskRunning,
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
