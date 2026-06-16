import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AuthProvider } from "./context/AuthContext.jsx";
import Home from "./pages/Home.jsx";
import Game from "./pages/Game.jsx";
import Results from "./pages/Results.jsx";
import Auth from "./pages/Auth.jsx";
import Ranking from "./pages/Ranking.jsx";

function LoadingScreen() {
  return (
    <motion.div
      className="sys-boot"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35 }}
    >
      <div className="sys-boot-inner">
        <motion.div
          className="sys-boot-logo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        >
          <span className="sys-boot-title">POO Challenge</span>
          <span className="sys-boot-badge">TVRG</span>
        </motion.div>

        <motion.div
          className="sys-boot-status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <span className="sys-boot-dot" />
          <span className="sys-boot-dot" />
          <span className="sys-boot-dot" />
        </motion.div>

        <motion.p
          className="sys-boot-msg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Iniciando sistema...
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [booting, setBooting]     = useState(true);
  const [page, setPage]           = useState("home");
  const [gameConfig, setGameConfig] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [restarting, setRestarting] = useState(false);

  useEffect(() => {
    const minDelay = new Promise((r) => setTimeout(r, 2000));
    const ping = fetch("/api/challenges/topics").catch(() => {});
    Promise.all([minDelay, ping]).then(() => setBooting(false));
  }, []);

  function handleStart(config) {
    setGameConfig(config);
    setPage("game");
  }

  function handleFinish(result) {
    setGameResult(result);
    setPage("results");
  }

  async function handleRestart(keepConfig) {
    if (keepConfig && gameConfig) {
      setRestarting(true);
      try {
        const res = await fetch(
          `/api/challenges/random?topic=${gameConfig.topic}&difficulty=${gameConfig.difficulty}&count=10`
        );
        const json = await res.json();
        if (!json.data?.length) throw new Error();
        setGameConfig({ ...gameConfig, challenges: json.data });
        setPage("game");
      } catch {
        setPage("home");
      } finally {
        setRestarting(false);
      }
    } else {
      setPage("home");
    }
  }

  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        {booting ? (
          <LoadingScreen key="boot" />
        ) : (
          <motion.div
            key="app"
            className="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {page === "home"    && <Home onStart={handleStart} onAuth={() => setPage("auth")} onRanking={() => setPage("ranking")} />}
            {page === "auth"    && <Auth onBack={() => setPage("home")} />}
            {page === "ranking" && <Ranking onBack={() => setPage("home")} />}
            {page === "game"    && gameConfig && (
              <Game key={Date.now()} config={gameConfig} onFinish={handleFinish} />
            )}
            {page === "results" && gameResult && (
              <Results result={gameResult} config={gameConfig} onRestart={handleRestart} onRanking={() => setPage("ranking")} restarting={restarting} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </AuthProvider>
  );
}
