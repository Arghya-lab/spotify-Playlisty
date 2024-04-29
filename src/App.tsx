import { useStates } from "./context/StatesContext";
import Navbar from "./components/Navbar";
import UserPage from "./components/sections/UserSection";
import Login from "./components/sections/Login";
import ProgressInfo from "./components/sections/ProgressInfo";
import PlaylistForm from "./components/sections/PlaylistForm";
import { PageEnum } from "./@types/statesContext";

function App() {
  const { user, currentPage, isTaskRunning } = useStates();

  return (
    <div className="min-h-svh max-w-[1440px] m-auto">
      <Navbar />
      {(() => {
        if (!user) {
          return <Login />;
        }
        switch (currentPage) {
          case PageEnum.LOGINPAGE:
            return <Login />;
            break;
          case PageEnum.USERPAGE:
            return <UserPage />;
            break;
          case PageEnum.CREATEPLAYLISTPAGE:
            return isTaskRunning ? <ProgressInfo /> : <PlaylistForm />;
            break;

          default:
            return null;
            break;
        }
      })()}
    </div>
  );
}

export default App;
