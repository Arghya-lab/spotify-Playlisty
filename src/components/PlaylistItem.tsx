import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { TypographyH3, TypographyP, TypographySmall } from "./ui/Typography";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";
import { UserPlaylistsItemType } from "@/@types/spotify";
import { useStates } from "@/context/StatesContext";
import { FormTypeEnum, PageEnum } from "@/@types/statesContext";
import PlaylistUrlCard from "./PlaylistUrlCard";

function PlaylistItem({ playlist }: { playlist: UserPlaylistsItemType }) {
  const { setCurrentPage, setPlaylistFormInitialUrl, setPlaylistFormType } =
    useStates();

  const handleAddMoreSongs = () => {
    setPlaylistFormType(FormTypeEnum.ADDTOEXISTING);
    setPlaylistFormInitialUrl(playlist.external_urls.spotify);
    setCurrentPage(PageEnum.CREATEPLAYLISTPAGE);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="flex items-center cursor-pointer">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={
                      playlist.images
                        ? playlist.images[0].url
                        : "/default-playlist-cover.png"
                    }
                    alt={playlist.name}
                  />
                  <AvatarFallback>
                    {playlist.name.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <TypographySmall className="text-muted">
                  ({playlist.id})
                </TypographySmall>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="pl-4">
            <TypographyP className="font-medium">{playlist.name} </TypographyP>
            <TypographySmall className="font-medium text-muted-foreground">
              {playlist.owner.display_name}
            </TypographySmall>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-3xl">
          <DrawerHeader>
            <TypographyH3>{playlist.name}</TypographyH3>
            <DrawerDescription>{playlist.description}</DrawerDescription>
            <TypographySmall>{playlist.owner.display_name}</TypographySmall>
          </DrawerHeader>
        </div>
        <div className="mx-auto pt-8 pb-4">
          <img
            className="h-48 rounded-lg"
            src={
              playlist.images
                ? playlist.images[0].url
                : "/default-playlist-cover.png"
            }
          />
          <img
            className="w-48"
            src={`https://scannables.scdn.co/uri/plain/svg/000000/white/480/spotify:user:${playlist.uri}`}
          />
        </div>
        <div className="mx-auto w-full max-w-3xl p-4">
          <PlaylistUrlCard playlistUrl={playlist.external_urls.spotify} />
        </div>

        <DrawerFooter className="flex-row m-auto">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button onClick={handleAddMoreSongs}>Add more songs</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default PlaylistItem;
