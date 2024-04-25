import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStates } from "../context/StatesContext";
import delay from "../utils/delay";
import createPlaylist from "../utils/createPlaylist";
import addTracksToPlaylist from "../utils/addTracksToPlaylist";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { TypographySmall } from "./ui/Typography";
import { FormTypeEnum } from "@/@types/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import playlistFormSchema from "@/schema/playlistFormSchema";
import convertJsonStrToArr from "@/utils/convertJsonStrToArr";
import convertLinesToArr from "@/utils/convertLinesToArr";
import { SpotifyPlaylistType } from "@/@types/spotify";
import getPlaylist from "@/utils/getPlaylist";
import getSpotifyPlaylistId from "@/utils/getSpotifyPlaylistId";
import searchSongs from "@/utils/searchSongs";

function PlaylistForm() {
  const { token, userId, setIsTaskRunning, setProgress, setMessage } =
    useStates();
  const [formType, setFormType] = useState<string>(FormTypeEnum.CREATEPLAYLIST);
  const formSchema = playlistFormSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      formType: FormTypeEnum.CREATEPLAYLIST,
      playlistName: "",
      playlistLink: "",
      isJsonFormat: false,
      songs: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let trackUris: string[] = []; // Array to store track URIs

    setIsTaskRunning(true);
    setMessage("Analyzing your data.");
    await delay(2000);

    const songNames = values.isJsonFormat
      ? convertJsonStrToArr(values.songs)
      : convertLinesToArr(values.songs);

    let playlistData: SpotifyPlaylistType | undefined;

    if (values.formType === FormTypeEnum.CREATEPLAYLIST) {
      console.log("Playlist creating", values);
      playlistData = await createPlaylist(
        userId,
        token,
        setMessage,
        values.playlistName
      );
    }
    if (
      values.formType === FormTypeEnum.ADDTOEXISTING &&
      values?.playlistLink
    ) {
      console.log("Playlist editing", values);
      const playlistId = getSpotifyPlaylistId(values.playlistLink);
      if (playlistId) {
        playlistData = await getPlaylist(playlistId, token, setMessage);
      }
    }
    console.log("songNames", songNames);
    console.log("playlistData", playlistData);

    if (playlistData) {
      setMessage("Waiting for searching songs.");
      await delay(2000);

      trackUris = await searchSongs(songNames, token, setMessage, setProgress);
      console.log("trackUris", trackUris);

      let iteration = 1;
      const trackUriLmt = 50;

      while ((iteration - 1) * trackUriLmt < trackUris.length) {
        const tracksLinks = trackUris.slice(
          (iteration - 1) * trackUriLmt,
          trackUris.length < iteration * trackUriLmt
            ? trackUris.length
            : iteration * trackUriLmt
        );

        await addTracksToPlaylist(token, playlistData.id, tracksLinks);
        await delay(2000);
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
        className="w-[calc(100%-2rem)] max-w-3xl py-16 pt-32 sm:pt-40 space-y-8">
        {/* Create new or add to Existing playlist section */}
        <ToggleGroup
          type="single"
          size="lg"
          variant="outline"
          value={form.getValues().formType}
          onValueChange={(value) => {
            if (value) {
              form.setValue("formType", value);
              setFormType(value);
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

        {formType === FormTypeEnum.CREATEPLAYLIST && (
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
        {formType === FormTypeEnum.ADDTOEXISTING && (
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
