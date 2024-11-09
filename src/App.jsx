import Player from "./Player";
import songsData from "./songs.json";

function App() {
  return (
    <div className="App">
      <h1>Music Player</h1>
      <div className="left-side"></div>
      <div className="right-side"></div>
      <Player songs={songsData} />
    </div>
  );
}

export default App;
