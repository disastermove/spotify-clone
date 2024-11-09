import Player from "./Player";
import Sidebar from "./Sidebar";
import songsData from "./songs.json";
import "./style.css";

function App() {
  return (
    <div className="App">
      <div className="left-side">
        <Sidebar />
      </div>
      <div className="right-side"></div>
      <Player songs={songsData} />
    </div>
  );
}

export default App;
