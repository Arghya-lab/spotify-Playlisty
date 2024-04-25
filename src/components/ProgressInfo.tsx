import { useStates } from "../context/StatesContext";
import {
  TypographyH3,
  TypographyH4,
  TypographyLarge,
  TypographyList,
  TypographySmall,
} from "./ui/Typography";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Skeleton } from "./ui/skeleton";

function ProgressInfo() {
  const { progress, message, playlistData, errorSongs, resetProcess } =
    useStates();

  return (
    <>
      <main className="w-[90%] max-w-7xl pt-12 lg:pt-20 pb-12 flex flex-col lg:flex-row lg:justify-center lg:items-center">
        <section className="flex justify-center">
          {playlistData ? (
            <div className="w-64">
              <TypographyH3>{playlistData?.name}</TypographyH3>
              <TypographyLarge className="pb-6">
                {playlistData?.owner.display_name}
              </TypographyLarge>
              {playlistData?.images[0]?.url ? (
                <img className="h-64" src={playlistData?.images[0].url} />
              ) : (
                <img className="h-64" src="/default-playlist-cover.png" />
              )}
              <img
                className="h-16 w-64"
                src={`https://scannables.scdn.co/uri/plain/svg/000000/white/640/spotify:user:${playlistData?.uri}`}
              />
            </div>
          ) : (
            <div>
              <div className="w-64 space-y-1 pb-6">
                <Skeleton className="h-7 w-44" />
                <Skeleton className="h-5 w-32" />
              </div>
              <div className="w-64 space-y-1">
                <Skeleton className="h-64 w-64" />
                <Skeleton className="h-12 w-64" />
              </div>
            </div>
          )}
        </section>
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
