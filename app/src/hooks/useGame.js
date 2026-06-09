import { useState, useEffect, useCallback, useRef } from "react";

export function useGame(challenges, config = {}) {
  const { lives: initialLives = null, maxTime = 30, multiplier = 1 } = config;

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
    if (!isAnswered && !gameOver && currentChallenge) {
      setTimeLeft(maxTime);
      startTimer();
    }
    return stopTimer;
  }, [currentIndex, isAnswered, gameOver, currentChallenge, startTimer, stopTimer, maxTime]);

  // Auto-submit cuando se acaba el tiempo
  useEffect(() => {
    if (timeLeft === 0 && !isAnswered && currentChallenge && !gameOver) {
      processAnswer(-1);
    }
  }, [timeLeft, isAnswered, currentChallenge, gameOver]);

  function processAnswer(optionIndex) {
    if (isAnswered || !currentChallenge || gameOver) return;
    stopTimer();
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);

    const correct = optionIndex === currentChallenge.correctIndex;
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
      setTimeLeft(maxTime);
    }
  }

  const isCorrect =
    selectedAnswer !== null && currentChallenge
      ? selectedAnswer === currentChallenge.correctIndex
      : false;

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
    isCorrect,
    answerHistory,
    isFinished,
    lives,
    gameOver,
    gameOverReason,
    selectAnswer: processAnswer,
    nextQuestion,
  };
}
