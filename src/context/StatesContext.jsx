import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const StatesContext = createContext({
  token: "",
  userId: "",
  songsNames: "",
  playlistName: "",
  isTaskRunning: false,
  progress: 0,
  message: "Initializing task.",
  setTokenAndUserId: () => {},
  setIsTaskRunning: () => {},
  setPlaylistName: () => {},
  setSongsNames: () => {},
  setProgress: () => {},
  setMessage: () => {},
});

const useStates = () => useContext(StatesContext);

const StatesProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [songsNames, setSongsNames] = useState("");
  const [playlistName, setPlaylistName] = useState("");
  const [isTaskRunning, setIsTaskRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Initializing task.");

  const setTokenAndUserId = ({ token, userId }) => {
    setToken(token);
    setUserId(userId);
  };

  return (
    <StatesContext.Provider
      value={{
        token,
        userId,
        songsNames,
        playlistName,
        isTaskRunning,
        progress,
        message,
        setTokenAndUserId,
        setIsTaskRunning,
        setPlaylistName,
        setSongsNames,
        setProgress,
        setMessage,
      }}>
      {children}
    </StatesContext.Provider>
  );
};

StatesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export { useStates, StatesProvider };
