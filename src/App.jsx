import { useEffect } from "react";
import Login from "./components/Login";
import Progress from "./components/Progress";
import { useStates } from "./context/StatesContext";
import Form from "./components/Form";
import getUserId from "./utils/getUserId";

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
            .split("=")[1];

          const userId = await getUserId(token);
          setTokenAndUserId({ token, userId });

          window.location.hash = "";
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <h1>Create Spotify Playlist</h1>
      {token ? (
        <section className="inp-pro-section">
          {!isTaskRunning ? <Form /> : <Progress />}
        </section>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
