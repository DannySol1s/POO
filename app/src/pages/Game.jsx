import { useEffect } from "react";
import { useGame } from "../hooks/useGame.js";
import ChallengeCard from "../components/ChallengeCard.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import Timer from "../components/Timer.jsx";

const TOPIC_COLORS = {
  clases: "#6366f1",
  objetos: "#f59e0b",
  herencia: "#10b981",
  polimorfismo: "#8b5cf6",
  encapsulamiento: "#f43f5e",
  todos: "#0ea5e9",
};

export default function Game({ config, onFinish }) {
  const {
    currentChallenge,
    currentIndex,
    total,
    score,
    streak,
    timeLeft,
    maxTime,
    selectedAnswer,
    isAnswered,
    isCorrect,
    answerHistory,
    isFinished,
    selectAnswer,
    nextQuestion,
  } = useGame(config.challenges);

  useEffect(() => {
    if (isFinished) {
      onFinish({ score, answerHistory, topic: config.topic });
    }
  }, [isFinished]);

  if (!currentChallenge) return null;

  const topicColor = TOPIC_COLORS[currentChallenge.topic] ?? "#6366f1";
  const isLastQuestion = currentIndex === total - 1;

  return (
    <div className="game">
      <div className="game-header">
        <div className="game-meta">
          <span
            className="topic-badge"
            style={{ "--topic-color": topicColor }}
          >
            {currentChallenge.topic}
          </span>
          <span
            className={`difficulty-badge difficulty-badge--${currentChallenge.difficulty}`}
          >
            {currentChallenge.difficulty}
          </span>
        </div>

        <div className="game-score">
          <span className="score-value">{score}</span>
          <span className="score-label">pts</span>
          {streak >= 2 && (
            <span className="streak-badge">🔥 x{streak}</span>
          )}
        </div>
      </div>

      <ProgressBar current={currentIndex + 1} total={total} color={topicColor} />

      <Timer timeLeft={timeLeft} maxTime={maxTime} isAnswered={isAnswered} color={topicColor} />

      <ChallengeCard
        challenge={currentChallenge}
        selectedAnswer={selectedAnswer}
        isAnswered={isAnswered}
        isCorrect={isCorrect}
        onSelect={selectAnswer}
      />

      {isAnswered && (
        <div className="answer-feedback">
          <div className={`feedback-banner ${isCorrect ? "feedback-banner--correct" : "feedback-banner--wrong"}`}>
            <span className="feedback-icon">{isCorrect ? "✓" : "✗"}</span>
            <div className="feedback-content">
              <strong>{isCorrect ? "¡Correcto!" : "Incorrecto"}</strong>
              {!isCorrect && selectedAnswer === -1 && <span> — Tiempo agotado</span>}
              <p className="feedback-explanation">{currentChallenge.explanation}</p>
            </div>
          </div>

          <button className="btn btn--primary" onClick={nextQuestion}>
            {isLastQuestion ? "Ver resultados" : "Siguiente pregunta →"}
          </button>
        </div>
      )}
    </div>
  );
}
