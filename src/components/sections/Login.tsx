import { Button } from "@/components/ui/button";
import config from "../../conf";

function Login() {
  const spotifyLogin = () => {
    const scopes = [
      "user-read-private",
      "user-read-email",
      "playlist-modify-public",
      "playlist-modify-private",
      "playlist-read-collaborative",
    ];

    const url = `https://accounts.spotify.com/authorize?client_id=${
      config.clientId
    }&response_type=token&redirect_uri=${encodeURIComponent(
      config.redirectUri
    )}&scope=${scopes}`;

    location.replace(url);
  };

  return (
    <div className="h-[calc(100vh-10rem)] min-h-[424px] flex items-center justify-center">
      <Button size="lg" onClick={spotifyLogin}>
        Login To Continue
      </Button>
    </div>
  );
}

export default Login;
