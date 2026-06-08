import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useGame } from "../hooks/useGame.js";
import ChallengeCard from "../components/ChallengeCard.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import Timer from "../components/Timer.jsx";

const TOPIC_COLORS = {
  clases:          "#3b82f6",
  objetos:         "#f59e0b",
  herencia:        "#10b981",
  polimorfismo:    "#8b5cf6",
  encapsulamiento: "#f43f5e",
  todos:           "#6366f1",
};

const MSG_CORRECT = [
  "¡Simón! Ya te la sabes vrg.",
  "¡Exacto! Compilaste perfecto.",
  "¡Ahí está! Sin pestañear.",
  "¡Neta que sí! Le entiendes al pedo.",
  "¡Dale! Eso es POO de barrio tecnológico.",
];
const MSG_WRONG = [
  "Se tronó el servidor. Estudia más.",
  "¿En serio? Compila de milagro.",
  "Nop. Te falta barrio, compañero.",
  "Error 404: conocimiento no encontrado.",
  "Lástima. Eso era de primero de clase.",
];
const MSG_TIMEOUT = [
  "Tiempo agotado. El compilador no espera a nadie.",
  "Se fue el tiempo y tú con él.",
  "30 segundos y nada. Ponte trucha.",
];
const MSG_GAMEOVER = [
  "GAME OVER. Se acabaron tus vidas, bro.",
  "Se tronó el juego. Te quedaste sin vidas.",
  "Fallo crítico. El server no sobrevivió.",
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function Game({ config, onFinish }) {
  const {
    currentChallenge, currentIndex, total, score, streak,
    timeLeft, maxTime, selectedAnswer, isAnswered, isCorrect,
    answerHistory, isFinished, lives, gameOver,
    selectAnswer, nextQuestion,
  } = useGame(config.challenges, { lives: config.lives, maxTime: config.maxTime });

  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [gameOverMsg] = useState(() => pick(MSG_GAMEOVER));

  useEffect(() => {
    if (isFinished) {
      onFinish({ score, answerHistory, topic: config.topic, difficulty: config.difficulty });
    }
  }, [isFinished]);

  useEffect(() => {
    if (!isAnswered) return;
    if (selectedAnswer === -1) {
      setFeedbackMsg(pick(MSG_TIMEOUT));
    } else if (isCorrect) {
      setFeedbackMsg(pick(MSG_CORRECT));
    } else {
      setFeedbackMsg(pick(MSG_WRONG));
    }
  }, [isAnswered]);

  if (gameOver) {
    return (
      <motion.div
        className="game game--over"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="gameover-card"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
        >
          <motion.div
            className="gameover-icon"
            animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            💥
          </motion.div>
          <h1 className="gameover-title">GAME OVER</h1>
          <p className="gameover-msg">{gameOverMsg}</p>
          <div className="gameover-score">
            <span className="gameover-score-pts">{score.toLocaleString()}</span>
            <span className="gameover-score-label"> pts acumulados</span>
          </div>
          <div className="gameover-actions">
            <motion.button
              className="btn btn--cta"
              onClick={() =>
                onFinish({
                  score,
                  answerHistory,
                  topic: config.topic,
                  difficulty: config.difficulty,
                  gameOver: true,
                })
              }
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Ver resultado parcial
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  if (!currentChallenge) return null;

  const topicColor = TOPIC_COLORS[currentChallenge.topic] ?? "#4f46e5";
  const isLast = currentIndex === total - 1;

  return (
    <motion.div
      className="game"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="game-header">
        <div className="game-meta">
          <span className="topic-badge" style={{ "--topic-color": topicColor }}>
            {currentChallenge.topic}
          </span>
          <span className={`difficulty-badge difficulty-badge--${currentChallenge.difficulty}`}>
            {currentChallenge.difficulty}
          </span>
        </div>

        <div className="game-score">
          <motion.span
            className="score-value"
            key={score}
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 0.35 }}
          >
            {score}
          </motion.span>
          <span className="score-label">pts</span>
          <AnimatePresence>
            {streak >= 2 && (
              <motion.span
                className="streak-badge"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                x{streak} 🔥
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {lives !== null && (
          <div className="game-lives">
            {Array.from({ length: config.lives }).map((_, i) => (
              <motion.span
                key={i}
                className={`life-heart ${i >= lives ? "life-heart--lost" : ""}`}
                animate={i >= lives ? { scale: [1, 1.3, 0.8], opacity: [1, 1, 0.25] } : {}}
                transition={{ duration: 0.35 }}
              >
                ❤️
              </motion.span>
            ))}
          </div>
        )}
      </div>

      <ProgressBar current={currentIndex + 1} total={total} color={topicColor} />
      <Timer timeLeft={timeLeft} maxTime={maxTime} isAnswered={isAnswered} color={topicColor} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <ChallengeCard
            challenge={currentChallenge}
            selectedAnswer={selectedAnswer}
            isAnswered={isAnswered}
            isCorrect={isCorrect}
            onSelect={selectAnswer}
            difficulty={config.difficulty}
            hint={currentChallenge.hint ?? null}
          />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            className="answer-feedback"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className={`feedback-banner ${isCorrect ? "feedback-banner--correct" : "feedback-banner--wrong"}`}>
              <span className="feedback-icon">{isCorrect ? "✓" : "✗"}</span>
              <div className="feedback-content">
                <strong className="feedback-msg">{feedbackMsg}</strong>
                <p className="feedback-explanation">{currentChallenge.explanation}</p>
              </div>
            </div>

            <motion.button
              className="btn btn--primary"
              onClick={nextQuestion}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97, y: 4 }}
            >
              {isLast ? "Ver resultados" : "Siguiente pregunta →"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
