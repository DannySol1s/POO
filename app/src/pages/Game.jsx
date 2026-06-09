import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useGame } from "../hooks/useGame.js";
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

function optClass(i, selected, answered, correct, correctIndex) {
  if (!answered) return "kopt";
  if (i === correctIndex) return "kopt kopt--correct";
  if (i === selected && !correct) return "kopt kopt--wrong";
  return "kopt";
}

export default function Game({ config, onFinish }) {
  const {
    currentChallenge, currentIndex, total, score, streak,
    timeLeft, maxTime, selectedAnswer, isAnswered, isCorrect,
    answerHistory, isFinished, lives, gameOver,
    selectAnswer, nextQuestion,
  } = useGame(config.challenges, { lives: config.lives, maxTime: config.maxTime, multiplier: config.multiplier });

  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [gameOverMsg] = useState(() => pick(MSG_GAMEOVER));
  const [hintRevealed, setHintRevealed] = useState(false);

  useEffect(() => {
    if (isFinished) {
      onFinish({ score, answerHistory, topic: config.topic, difficulty: config.difficulty });
    }
  }, [isFinished]);

  useEffect(() => {
    if (!isAnswered) return;
    if (selectedAnswer === -1) setFeedbackMsg(pick(MSG_TIMEOUT));
    else if (isCorrect) setFeedbackMsg(pick(MSG_CORRECT));
    else setFeedbackMsg(pick(MSG_WRONG));
  }, [isAnswered]);

  useEffect(() => { setHintRevealed(false); }, [currentIndex]);


  if (!currentChallenge) return null;

  const topicColor = TOPIC_COLORS[currentChallenge.topic] ?? "#4f46e5";
  const isLast = currentIndex === total - 1;
  const canShowHint = !isAnswered && currentChallenge.hint && config.difficulty === "facil";

  return (
    <motion.div
      className="kgame"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Game Over overlay — cubre el kgame completo */}
      <AnimatePresence>
        {gameOver && (
          <motion.div
            className="gameover-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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
                  onClick={() => onFinish({ score, answerHistory, topic: config.topic, difficulty: config.difficulty, gameOver: true })}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Ver Daño Parcial (Resultados)
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fila 1: Header */}
      <div className="kgame-hdr">
        <div className="kgame-meta">
          <span className="topic-badge" style={{ "--topic-color": topicColor }}>
            {currentChallenge.topic}
          </span>
          <span className={`difficulty-badge difficulty-badge--${currentChallenge.difficulty}`}>
            {currentChallenge.difficulty}
          </span>
        </div>

        <div className="kgame-score">
          <motion.span
            className="kgame-pts"
            key={score}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.32 }}
          >
            {score.toLocaleString()}
          </motion.span>
          <span className="kgame-pts-label">pts</span>
          {config.multiplier !== 1 && (
            <span className="kgame-multiplier">×{config.multiplier}</span>
          )}
          <AnimatePresence>
            {streak >= 2 && (
              <motion.span
                className="kgame-streak"
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
          <div className="kgame-lives">
            {Array.from({ length: config.lives }).map((_, i) => (
              <motion.span
                key={i}
                className={`klife ${i >= lives ? "klife--lost" : ""}`}
                animate={i >= lives ? { scale: [1, 1.3, 0.8], opacity: [1, 1, 0.25] } : {}}
                transition={{ duration: 0.35 }}
              >
                ❤️
              </motion.span>
            ))}
          </div>
        )}
      </div>

      {/* Fila 2: Progreso */}
      <ProgressBar current={currentIndex + 1} total={total} color={topicColor} />

      {/* Fila 3: Temporizador */}
      <Timer timeLeft={timeLeft} maxTime={maxTime} isAnswered={isAnswered} color={topicColor} />

      {/* Fila 4: Zona de pregunta — scroll interno, tamaño fijo por 1fr */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="kgame-board"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -28 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <div className="kgame-board-inner">
            <p className="kgame-q">{currentChallenge.question}</p>
            {currentChallenge.code && (
              <pre className="kgame-code"><code>{currentChallenge.code}</code></pre>
            )}
            {canShowHint && (
              <AnimatePresence mode="wait">
                {!hintRevealed ? (
                  <motion.button
                    key="hint-btn"
                    className="kgame-hint-btn"
                    onClick={() => setHintRevealed(true)}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    💡 Ver pista
                  </motion.button>
                ) : (
                  <motion.p
                    key="hint-text"
                    className="kgame-hint"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    💡 {currentChallenge.hint}
                  </motion.p>
                )}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Fila 5: Opciones — altura fija, nunca cambia */}
      <div className="kgame-opts">
        {currentChallenge.options.map((opt, i) => (
          <motion.button
            key={`${currentIndex}-${i}`}
            className={optClass(i, selectedAnswer, isAnswered, isCorrect, currentChallenge.correctIndex)}
            initial={{ opacity: 0, x: -10 }}
            animate={
              isAnswered && i === currentChallenge.correctIndex
                ? { opacity: 1, x: 0, scale: [1, 1.03, 1], transition: { duration: 0.3, delay: 0.08 } }
                : isAnswered && i === selectedAnswer && !isCorrect
                ? { opacity: 1, x: [-7, 7, -5, 5, -2, 2, 0], transition: { duration: 0.38 } }
                : { opacity: 1, x: 0, transition: { delay: i * 0.06, duration: 0.22, ease: "easeOut" } }
            }
            onClick={() => !isAnswered && selectAnswer(i)}
            disabled={isAnswered}
            whileTap={!isAnswered ? { scale: 0.97, y: 2 } : {}}
          >
            <span className="kopt-key">{String.fromCharCode(65 + i)}</span>
            <span className="kopt-text">{opt}</span>
            {isAnswered && i === currentChallenge.correctIndex && (
              <span className="kopt-mark">✓</span>
            )}
            {isAnswered && i === selectedAnswer && !isCorrect && (
              <span className="kopt-mark">✗</span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Fila 6: Feedback + botón siguiente — espacio siempre reservado */}
      <div className="kgame-foot">
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              className={`kgame-fb ${isCorrect ? "kgame-fb--correct" : "kgame-fb--wrong"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <span className="kgame-fb-icon">{isCorrect ? "✓" : "✗"}</span>
              <div className="kgame-fb-body">
                <strong className="kgame-fb-msg">{feedbackMsg}</strong>
                <p className="kgame-fb-expl">{currentChallenge.explanation}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isAnswered && (
            <motion.button
              className="btn btn--primary kgame-next-btn"
              onClick={nextQuestion}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.18 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97, y: 3 }}
            >
              {isLast ? "Ver Botín Final" : "Siguiente Quest →"}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
