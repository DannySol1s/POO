import { useEffect } from "react";
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

export default function Game({ config, onFinish }) {
  const {
    currentChallenge, currentIndex, total, score, streak,
    timeLeft, maxTime, selectedAnswer, isAnswered, isCorrect,
    answerHistory, isFinished, selectAnswer, nextQuestion,
  } = useGame(config.challenges);

  useEffect(() => {
    if (isFinished) onFinish({ score, answerHistory, topic: config.topic });
  }, [isFinished]);

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
                <strong>{isCorrect ? "¡Correcto!" : "Incorrecto"}</strong>
                {!isCorrect && selectedAnswer === -1 && <span> — Tiempo agotado</span>}
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
