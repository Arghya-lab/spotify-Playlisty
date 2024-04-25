import { useStates } from "../context/StatesContext";
import PlaylistBarcode from "./PlaylistBarcode";
import {
  TypographyH4,
  TypographyLarge,
  TypographyList,
  TypographySmall,
} from "./ui/Typography";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

function ProgressInfo() {
  const { progress, message, errorSongs, resetProcess } = useStates();

  return (
    <>
      <main className="w-[90%] max-w-7xl pt-12 lg:pt-20 pb-12 flex flex-col lg:flex-row lg:justify-center lg:items-center">
        <PlaylistBarcode />
        <section className="flex-1 lg:max-w-3xl lg:pl-[5%] pt-12 lg:pt-56">
          <Progress value={progress} />
          <TypographyH4 className="pt-8  text-center">{message}</TypographyH4>
          <div className="pt-8  text-center">
            {progress !== 100 && <TypographySmall>Loading....</TypographySmall>}
          </div>
        </section>
      </main>
      {progress === 100 && (
        <section className="w-[90%] max-w-lg ">
          {errorSongs.length !== 0 && (
            <TypographyLarge className="text-red-700">
              Error putting this Songs:
            </TypographyLarge>
          )}
          <div className="flex items-center flex-col pb-20">
            <TypographyList className="text-red-400" items={errorSongs} />
            <Button variant="outline" size="lg" onClick={() => resetProcess()}>
              Done
            </Button>
          </div>
        </section>
      )}
    </>
  );
}

export default ProgressInfo;
