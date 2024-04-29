import { z } from "zod";
import validateJsonSongsFormat from "@/validations/validateJsonSongsFormat";
import validateLinesSongsFormat from "@/validations/validateLinesSongsFormat";
import { FormTypeEnum } from "@/@types/statesContext";

const playlistFormSchema = z
  .object({
    formType: z.string(),
    playlistName: z.string().optional(),
    playlistLink: z.string().optional(),
    isJsonFormat: z.boolean(),
    songs: z.string().min(1, {
      message: "Songs required.",
    }),
  })
  .refine(
    (data) => {
      if (data.formType === FormTypeEnum.ADDTOEXISTING) {
        if (data?.playlistLink) {
          const spotifyPlaylistRegex =
            /^https:\/\/open\.spotify\.com\/playlist\/[a-zA-Z0-9]{22}(\?si=[a-zA-Z0-9]+)?$/;

          // Check if the URL matches the regular expression
          return spotifyPlaylistRegex.test(data.playlistLink);
        }
        return false;
      }
      return true;
    },
    {
      message: "Not a valid Spotify playlist Url.",
      path: ["playlistLink"],
    }
  )
  .refine(
    (data) => {
      if (data.isJsonFormat) return validateJsonSongsFormat(data.songs);
      return true;
    },
    {
      message:
        "Provided songs list in not in Json Array format or songs name not in string format & should not exceed 80 characters.",
      path: ["songs"],
    }
  )
  .refine(
    (data) => {
      if (!data.isJsonFormat) return validateLinesSongsFormat(data.songs);
      return true;
    },
    {
      message:
        "Songs name not in string format & should not exceed 80 characters.",
      path: ["songs"],
    }
  );

export default playlistFormSchema;
