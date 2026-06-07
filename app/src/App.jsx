import { useState } from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import Home from "./pages/Home.jsx";
import Game from "./pages/Game.jsx";
import Results from "./pages/Results.jsx";
import Auth from "./pages/Auth.jsx";
import Ranking from "./pages/Ranking.jsx";

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
    <AuthProvider>
      <div className="app">
        {page === "home"    && <Home onStart={handleStart} onAuth={() => setPage("auth")} onRanking={() => setPage("ranking")} />}
        {page === "auth"    && <Auth onBack={() => setPage("home")} />}
        {page === "ranking" && <Ranking onBack={() => setPage("home")} />}
        {page === "game"    && gameConfig && (
          <Game key={Date.now()} config={gameConfig} onFinish={handleFinish} />
        )}
        {page === "results" && gameResult && (
          <Results result={gameResult} config={gameConfig} onRestart={handleRestart} onRanking={() => setPage("ranking")} />
        )}
      </div>
    </AuthProvider>
  );
}
