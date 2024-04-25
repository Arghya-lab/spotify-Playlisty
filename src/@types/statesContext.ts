import { Dispatch, SetStateAction } from "react";

export interface StatesContextType {
  token: string;
  userId: string;
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
  setProgress: Dispatch<SetStateAction<number>>;
  setMessage: Dispatch<SetStateAction<string>>;
}
