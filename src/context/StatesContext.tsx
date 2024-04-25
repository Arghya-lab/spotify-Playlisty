import { StatesContextType } from "@/@types/statesContext";
import { createContext, useContext, useState } from "react";

const StatesContext = createContext<StatesContextType>({
  token: "",
  userId: "",
  isTaskRunning: false,
  progress: 0,
  message: "Initializing task.",
  setTokenAndUserId: () => {},
  setIsTaskRunning: () => {},
  setProgress: () => {},
  setMessage: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useStates = () => useContext(StatesContext);

export const StatesProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [isTaskRunning, setIsTaskRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Initializing task.");

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

  return (
    <StatesContext.Provider
      value={{
        token,
        userId,
        isTaskRunning,
        progress,
        message,
        setTokenAndUserId,
        setIsTaskRunning,
        setProgress,
        setMessage,
      }}>
      {children}
    </StatesContext.Provider>
  );
};
