import { useStates } from "../context/StatesContext";

function Progress() {
  const {
    progress,
    message,
    setIsTaskRunning,
    setProgress,
    setPlaylistName,
    setSongsNames,
    setMessage,
  } = useStates();

  const handleBtnClick = () => {
    setProgress(0);
    setPlaylistName("");
    setSongsNames("");
    setMessage("");
    setIsTaskRunning(false);
  };

  return (
    <div className="progressRapper">
      <h4>{message}</h4>
      <h6>completed {progress}%</h6>
      {progress === 100 ? (
        <div className="doneBtnRapper">
          <button onClick={handleBtnClick}>Done</button>
        </div>
      ) : (
        <div>
          <h5>Loading....</h5>
        </div>
      )}
    </div>
  );
}

export default Progress;
