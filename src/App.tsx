import { useEffect } from "react";
import Login from "./components/Login";
import ProgressInfo from "./components/ProgressInfo";
import { useStates } from "./context/StatesContext";
import getUserId from "./utils/getUserId";
import { TypographyH1 } from "./components/ui/Typography";
import PlaylistForm from "./components/PlaylistForm";

function App() {
  const { token, isTaskRunning, setTokenAndUserId } = useStates();

  useEffect(() => {
    const fetchData = async () => {
      const hash = window.location.hash;

      if (hash) {
        try {
          const token = hash
            .substring(1)
            .split("&")
            .find((elem) => elem.startsWith("access_token"))
            ?.split("=")[1]; // Use optional chaining here

          if (token) {
            // Check if token is truthy
            const userId = await getUserId(token);
            setTokenAndUserId({ token, userId });

            window.location.hash = "";
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-svh">
      <TypographyH1 className="pb-12 pt-6 pl-6 md:pt-10 md:pl-10 lg:pl-[5%]">
        Spotify Playlisty
      </TypographyH1>
      {token ? (
        <section className="w-full flex flex-col items-center">
          {!isTaskRunning ? <PlaylistForm /> : <ProgressInfo />}
        </section>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
