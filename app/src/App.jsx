import { useState } from "react";
import Home from "./pages/Home.jsx";
import Game from "./pages/Game.jsx";
import Results from "./pages/Results.jsx";

export default function App() {
  const [page, setPage] = useState("home");
  const [gameConfig, setGameConfig] = useState(null);
  const [gameResult, setGameResult] = useState(null);

  function handleStart(config) {
    setGameConfig(config);
    setPage("game");
  }

  function handleFinish(result) {
    setGameResult(result);
    setPage("results");
  }

  function handleRestart(keepConfig) {
    if (keepConfig && gameConfig) {
      setPage("game");
    } else {
      setPage("home");
    }
  }

  return (
    <div className="app">
      {page === "home" && <Home onStart={handleStart} />}
      {page === "game" && gameConfig && (
        <Game key={Date.now()} config={gameConfig} onFinish={handleFinish} />
      )}
      {page === "results" && gameResult && (
        <Results result={gameResult} config={gameConfig} onRestart={handleRestart} />
      )}
    </div>
  );
}
