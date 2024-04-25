import { useStates } from "../context/StatesContext";
import { TypographyH4, TypographySmall } from "./ui/Typography";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

function ProgressInfo() {
  const { progress, message, setIsTaskRunning, setProgress, setMessage } =
    useStates();

  const handleBtnClick = () => {
    setProgress(0);
    setMessage("");
    setIsTaskRunning(false);
  };

  return (
    <div className="w-11/12 max-w-lg pt-36 text-center">
      <Progress value={progress} />
      <TypographyH4 className="pt-8">{message}</TypographyH4>
      <div className="pt-8">
        {progress === 100 ? (
          <Button variant="outline" size="lg" onClick={handleBtnClick}>
            Done
          </Button>
        ) : (
          <TypographySmall>Loading....</TypographySmall>
        )}
      </div>
    </div>
  );
}

export default ProgressInfo;
