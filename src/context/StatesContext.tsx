import { SpotifyPlaylistType } from "@/@types/spotify";
import { StatesContextType } from "@/@types/statesContext";
import { createContext, useContext, useState } from "react";

const StatesContext = createContext<StatesContextType>({
  token: "",
  userId: "",
  isTaskRunning: false,
  progress: 0,
  message: "Initializing task.",
  playlistData: null,
  errorSongs: [],
  setTokenAndUserId: () => {},
  setIsTaskRunning: () => {},
  setProgress: () => {},
  setMessage: () => {},
  setPlaylistData: () => {},
  setErrorSongs: () => {},
  resetProcess: () => {},
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

  const setTokenAndUserId = ({
    token,
    userId,
  }: {
    token: string;
    userId: string;
  }) => {
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
        setTokenAndUserId,
        setIsTaskRunning,
        setProgress,
        setMessage,
        setPlaylistData,
        setErrorSongs,
        resetProcess,
      }}>
      {children}
    </StatesContext.Provider>
  );
};
