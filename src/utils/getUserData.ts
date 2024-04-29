import { UserType } from "@/@types/spotify";
import axios from "axios";

export default async function fetchUserData() {
  const hash = window.location.hash;

  if (hash) {
    try {
      const token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1]; // Use optional chaining here

      if (token) {
        const { data }: { data: UserType } = await axios.get(
          "https://api.spotify.com/v1/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        window.location.hash = "";
        return { token, user: data };
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}
