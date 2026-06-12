import { useState, useEffect, useCallback, useRef } from "react";

export function useGame(challenges, config = {}) {
  const { lives: initialLives = null, maxTime = 30, multiplier = 1, paused = false } = config;

  const [currentIndex, setCurrentIndex]     = useState(0);
  const [score, setScore]                   = useState(0);
  const [streak, setStreak]                 = useState(0);
  const [timeLeft, setTimeLeft]             = useState(maxTime);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered]         = useState(false);
  const [answerHistory, setAnswerHistory]   = useState([]);
  const [isFinished, setIsFinished]         = useState(false);
  const [lives, setLives]                   = useState(initialLives);
  const [gameOver, setGameOver]             = useState(false);
  const [gameOverReason, setGameOverReason] = useState(null);
  const [isChecking, setIsChecking]         = useState(false);
  const [checkResult, setCheckResult]       = useState(null);
  const timerRef = useRef(null);

  const currentChallenge = challenges[currentIndex] ?? null;
  const total = challenges.length;

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          stopTimer();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, [stopTimer]);

  useEffect(() => {
    if (!isAnswered && !gameOver && currentChallenge && !paused) {
      setTimeLeft(maxTime);
      startTimer();
    } else {
      stopTimer();
    }
    return stopTimer;
  }, [currentIndex, isAnswered, gameOver, currentChallenge, startTimer, stopTimer, maxTime, paused]);

  // Auto-submit cuando se acaba el tiempo
  useEffect(() => {
    if (timeLeft === 0 && !isAnswered && currentChallenge && !gameOver) {
      processAnswer(-1);
    }
  }, [timeLeft, isAnswered, currentChallenge, gameOver]);

  async function processAnswer(optionIndex) {
    if (isAnswered || !currentChallenge || gameOver) return;
    stopTimer();
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    setIsChecking(true);
    setCheckResult(null);

    // optionIndex === -1 → se acabó el tiempo sin responder
    const selectedKey = optionIndex >= 0 ? currentChallenge.options[optionIndex].key : -1;

    let correct = false;
    let correctIndex = null;
    let explanation = null;

    try {
      const res = await fetch(`/api/challenges/${currentChallenge.id}/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: selectedKey }),
      });
      const data = await res.json();
      correct = Boolean(data.correct);
      explanation = data.explanation ?? null;
      const idx = currentChallenge.options.findIndex((o) => o.key === data.correctKey);
      correctIndex = idx >= 0 ? idx : null;
    } catch {
      // Sin conexión con la API: no se otorgan puntos, el juego sigue
      correct = false;
    }

    setIsChecking(false);
    setCheckResult({ correct, correctIndex, explanation });

    let points = 0;
    let newStreak = streak;

    if (correct) {
      const timeBonus = Math.floor((timeLeft / maxTime) * 50);
      newStreak = streak + 1;
      const streakBonus = Math.min(newStreak * 10, 50);
      points = Math.round((100 + timeBonus + streakBonus) * multiplier);
      setStreak(newStreak);
    } else {
      newStreak = 0;
      setStreak(0);

      // Descontar vida si el modo tiene vidas
      if (initialLives !== null) {
        setLives((prev) => {
          const next = prev - 1;
          if (next <= 0) {
            // Game Over diferido para que la animación de respuesta se muestre
            setTimeout(() => {
              setGameOver(true);
              setGameOverReason("lives");
            }, 1200);
          }
          return next;
        });
      }
    }

    setScore((s) => s + points);
    setAnswerHistory((h) => [
      ...h,
      {
        challenge: currentChallenge,
        selectedAnswer: optionIndex,
        correct,
        correctIndex,
        explanation,
        points,
        timeLeft,
      },
    ]);
  }

  function nextQuestion() {
    if (gameOver) return;
    const nextIndex = currentIndex + 1;
    if (nextIndex >= total) {
      setIsFinished(true);
    } else {
      setCurrentIndex(nextIndex);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsChecking(false);
      setCheckResult(null);
      setTimeLeft(maxTime);
    }
  }

  const isCorrect    = checkResult?.correct ?? false;
  const correctIndex = checkResult?.correctIndex ?? null;
  const explanation  = checkResult?.explanation ?? null;

  return {
    currentChallenge,
    currentIndex,
    total,
    score,
    streak,
    timeLeft,
    maxTime,
    selectedAnswer,
    isAnswered,
    isChecking,
    isCorrect,
    correctIndex,
    explanation,
    answerHistory,
    isFinished,
    lives,
    gameOver,
    gameOverReason,
    selectAnswer: processAnswer,
    nextQuestion,
  };
}
