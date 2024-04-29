import { useStates } from "../../context/StatesContext";
import PlaylistBarcode from "../PlaylistBarcode";
import PlaylistUrlCard from "../PlaylistUrlCard";
import {
  TypographyH4,
  TypographyLarge,
  TypographyList,
  TypographySmall,
} from "../ui/Typography";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

function ProgressInfo() {
  const { progress, message, errorSongs, playlistData, resetProcess } =
    useStates();

  return (
    <section className="w-full flex flex-col items-center">
      <main className="w-[90%] max-w-7xl pt-12 lg:pt-20 pb-12 flex flex-col lg:flex-row lg:justify-center lg:items-center">
        <PlaylistBarcode />
        {progress !== 100 && (
          <TypographySmall className="pb-4 pt-6 text-center">
            Processing....
          </TypographySmall>
        )}
        <section className="flex-1 lg:max-w-3xl lg:pl-[5%] pt-8 lg:pt-32">
          <Progress value={progress} />
          <TypographyH4 className="pt-8 text-center">{message}</TypographyH4>
          <div className="pt-8">
            {playlistData?.external_urls.spotify && (
              <PlaylistUrlCard
                playlistUrl={playlistData?.external_urls.spotify}
              />
            )}
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
    </section>
  );
}

export default ProgressInfo;
