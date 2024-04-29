import { Tooltip, TooltipProvider } from "@radix-ui/react-tooltip";
import { TypographySmall } from "./ui/Typography";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Copy, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { TooltipContent, TooltipTrigger } from "./ui/tooltip";

function PlaylistUrlCard({ playlistUrl }: { playlistUrl: string }) {
  return (
    <Card>
      <CardHeader>
        <TypographySmall className="text-ellipsis">
          {playlistUrl}
        </TypographySmall>
      </CardHeader>
      <CardContent className="flex gap-2 justify-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="outline" size="icon">
                <a href={playlistUrl} target="_blank">
                  <ExternalLink />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open in spotify</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigator.clipboard.writeText(playlistUrl)}>
                <Copy />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}

export default PlaylistUrlCard;
