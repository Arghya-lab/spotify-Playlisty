import { TypographyH1 } from "./ui/Typography";
import { ListPlus, UserRound } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useStates } from "@/context/StatesContext";
import { PageEnum } from "@/@types/statesContext";

function Navbar() {
  const { currentPage, isTaskRunning, setCurrentPage } = useStates();
  return (
    <nav className="pb-8 pt-4 p-6 md:pt-10 md:p-10 sm:flex sm:justify-between">
      <div className="flex gap-2 md:gap-4 pb-4 sm:pb-0">
        <img src="/logo.svg" className="h-10 lg:h-12" />
        <TypographyH1 className="font-lexendDeca font-bold">
          Spotify Playlisty
        </TypographyH1>
      </div>
      {currentPage !== PageEnum.LOGINPAGE && (
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={isTaskRunning || currentPage === PageEnum.USERPAGE}
                  variant="outline"
                  size="icon"
                  className="flex-1"
                  onClick={() => setCurrentPage(PageEnum.USERPAGE)}>
                  <UserRound />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>User</p>
              </TooltipContent>
            </Tooltip>

            {/* <Tooltip>
            <TooltipTrigger asChild>
              <Button
              disabled={isTaskRunning || currentPage===PageEnum.PLAYLISTPROGRESSPAGE}
                variant="outline"
                size="icon"
                className="flex-1"
                onClick={() => setCurrentPage(PageEnum.PLAYLISTPROGRESSPAGE)}>
                <ListMusic />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip> */}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={
                    isTaskRunning || currentPage === PageEnum.CREATEPLAYLISTPAGE
                  }
                  variant="outline"
                  size="icon"
                  className="flex-1"
                  onClick={() => setCurrentPage(PageEnum.CREATEPLAYLISTPAGE)}>
                  <ListPlus />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create Playlist</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
