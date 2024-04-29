import { useStates } from "@/context/StatesContext";
import { TypographyH3, TypographyLarge } from "./ui/Typography";
import { Skeleton } from "./ui/skeleton";

function PlaylistBarcode() {
  const { playlistData, songImgUrls } = useStates();

  return (
    <section className="flex justify-center">
      {playlistData ? (
        <div className="w-64">
          <TypographyH3>{playlistData?.name}</TypographyH3>
          <TypographyLarge className="pb-6">
            {playlistData?.owner.display_name}
          </TypographyLarge>
          {playlistData.images && playlistData.images[0]?.url ? (
            <img className="h-64" src={playlistData.images[0].url} />
          ) : songImgUrls.length === 0 ? (
            <img className="h-64" src="/default-playlist-cover.png" />
          ) : (
            <div className="h-64 w-64 flex flex-wrap">
              {songImgUrls.map((songImgUrl, id) =>
                songImgUrl ? (
                  <img key={id} className="h-32 w-32" src={songImgUrl} />
                ) : null
              )}
            </div>
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
  );
}

export default PlaylistBarcode;
