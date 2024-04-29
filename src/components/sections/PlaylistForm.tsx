import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStates } from "../../context/StatesContext";
import delay from "../../utils/delay";
import createPlaylist from "../../utils/createPlaylist";
import addTracksToPlaylist from "../../utils/addTracksToPlaylist";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { TypographySmall } from "../ui/Typography";
import { FormTypeEnum } from "@/@types/statesContext";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import convertJsonStrToArr from "@/utils/convertJsonStrToArr";
import convertLinesToArr from "@/utils/convertLinesToArr";
import { SpotifyPlaylistType } from "@/@types/spotify";
import getPlaylist from "@/utils/getPlaylist";
import getSpotifyPlaylistId from "@/utils/getSpotifyPlaylistId";
import searchSongs from "@/utils/searchSongs";
import playlistFormSchema from "@/schema/playlistFormSchema";
import axios from "axios";

function PlaylistForm() {
  const {
    token,
    user,
    playlistFormType,
    playlistFormInitialUrl,
    setIsTaskRunning,
    setPlaylistFormType,
    setProgress,
    setMessage,
    setPlaylistData,
    setErrorSongs,
    setSongImgUrls,
  } = useStates();

  const formSchema = playlistFormSchema.refine(
    async (data) => {
      if (data.formType === FormTypeEnum.ADDTOEXISTING) {
        const playlistId = getSpotifyPlaylistId(data?.playlistLink);
        if (playlistId && user) {
          try {
            const { data }: { data: SpotifyPlaylistType } = await axios.get(
              `https://api.spotify.com/v1/playlists/${playlistId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            return data.collaborative || data.owner.id === user.id;
          } catch {
            return false;
          }
        }
        return false;
      }
      return true;
    },
    {
      message: "You aren't authorized to modify this playlist.",
      path: ["playlistLink"],
    }
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      formType: playlistFormType,
      playlistName: "",
      playlistLink: playlistFormInitialUrl,
      isJsonFormat: false,
      songs: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let trackUris: string[] = []; // Array to store track URIs

    setPlaylistData(null);
    setIsTaskRunning(true);
    setMessage("Analyzing your data.");
    await delay(2000);

    const songNames = values.isJsonFormat
      ? convertJsonStrToArr(values.songs)
      : convertLinesToArr(values.songs);

    let playlistData: SpotifyPlaylistType | undefined;

    if (values.formType === FormTypeEnum.CREATEPLAYLIST) {
      playlistData = await createPlaylist({
        userId: user?.id,
        token,
        setMessage,
        playlistName: values.playlistName,
      });
    }
    if (
      values.formType === FormTypeEnum.ADDTOEXISTING &&
      values?.playlistLink
    ) {
      const playlistId = getSpotifyPlaylistId(values.playlistLink);
      if (playlistId) {
        playlistData = await getPlaylist({ playlistId, token, setMessage });
      }
    }

    if (playlistData) {
      setPlaylistData(playlistData);
      setMessage("Waiting for searching songs.");
      await delay(2000);

      trackUris =
        (await searchSongs({
          songNames,
          token,
          setMessage,
          setProgress,
          setErrorSongs,
          setSongImgUrls,
        })) || [];

      setMessage("Putting songs to playlist.");

      let iteration = 1;
      const trackUriLmt = 50;

      while ((iteration - 1) * trackUriLmt < trackUris.length) {
        const tracksLinks = trackUris.slice(
          (iteration - 1) * trackUriLmt,
          trackUris.length < iteration * trackUriLmt
            ? trackUris.length
            : iteration * trackUriLmt
        );

        await delay(2000);
        await addTracksToPlaylist({
          token,
          playlistId: playlistData.id,
          tracksLinks,
        });

        setProgress(
          Math.floor(
            (iteration * 5) / Math.ceil(trackUriLmt / trackUris.length) + 95
          )
        );
        iteration++;
      }

      if (values.formType === FormTypeEnum.CREATEPLAYLIST) {
        setMessage(`New Spotify Playlist ${playlistData.name} created!`);
      }
      if (
        values.formType === FormTypeEnum.ADDTOEXISTING &&
        values?.playlistLink
      ) {
        setMessage(`Songs added to ${playlistData.name} Playlist.`);
      }

      setProgress(100);
    } else {
      setMessage("Error occur to fetch playlist data.");
      setProgress(100);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[calc(100%-2rem)] max-w-3xl py-16 pt-16 sm:pt-20 space-y-8 m-auto">
        {/* Create new or add to Existing playlist section */}
        <ToggleGroup
          type="single"
          size="lg"
          variant="outline"
          value={form.getValues().formType}
          onValueChange={(value) => {
            if (value) {
              form.setValue("formType", value);
              setPlaylistFormType(value);
            }
          }}>
          <ToggleGroupItem
            value={FormTypeEnum.CREATEPLAYLIST}
            aria-label="Create new playlist.">
            <TypographySmall>Create New Playlist</TypographySmall>
          </ToggleGroupItem>
          <ToggleGroupItem
            value={FormTypeEnum.ADDTOEXISTING}
            aria-label="Add songs to existing playlist.">
            <TypographySmall>Add To Existing Playlist</TypographySmall>
          </ToggleGroupItem>
        </ToggleGroup>

        {playlistFormType === FormTypeEnum.CREATEPLAYLIST && (
          <FormField
            control={form.control}
            name="playlistName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Playlist Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="my fev songs"
                    maxLength={16}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {playlistFormType === FormTypeEnum.ADDTOEXISTING && (
          <FormField
            control={form.control}
            name="playlistLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Playlist Link</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://open.spotify.com/playlist/7t8FsyNT59VrCK4f8MQ8pD"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="isJsonFormat"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Json Format</FormLabel>
                <FormDescription>
                  If it's on songs list have to input as Json format.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="songs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Songs</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder={
                    form.getValues().isJsonFormat
                      ? `[\n    "Shape of You - Ed Sheeran",\n    "Someone Like You - Adele",\n    "All of Me - John Legend",\n    "Happy - Pharrell Williams",\n    "Shallow - Lady Gaga, Bradley Cooper",\n    "Can't Stop the Feeling! - Justin Timberlake",\n    "Blank Space - Taylor Swift",\n    "Thinking Out Loud - Ed Sheeran",\n    "Uptown Funk - Mark Ronson ft. Bruno Mars",\n    "Love Yourself - Justin Bieber"\n]`
                      : "Shape of You - Ed Sheeran\nSomeone Like You - Adele\nAll of Me - John Legend\nHappy - Pharrell Williams\nShallow - Lady Gaga, Bradley Cooper\nCan't Stop the Feeling! - Justin Timberlake\nBlank Space - Taylor Swift\nThinking Out Loud - Ed Sheeran\nUptown Funk - Mark Ronson ft. Bruno Mars\nLove Yourself - Justin Bieber\n"
                  }
                  rows={16}
                  cols={36}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {form.getValues().isJsonFormat
                  ? "Enter songs as JSON array format."
                  : "Enter one song in a line."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => form.reset()}>
            Clear
          </Button>
          <Button type="submit">Generate</Button>
        </div>
      </form>
    </Form>
  );
}

export default PlaylistForm;
