import config from "../conf";

function Login() {
  const spotifyLogin = () => {
    const scopes = ["playlist-modify-public"];

    const url = `https://accounts.spotify.com/authorize?client_id=${
      config.clientId
    }&response_type=token&redirect_uri=${encodeURIComponent(
      config.redirectUri
    )}&scope=${scopes}`;

    location.replace(url);
  };

  return (
    <div className="loginBtnRapper">
      <button className="loginBtn" onClick={spotifyLogin}>
        Login To Start
      </button>
    </div>
  );
}

export default Login;
