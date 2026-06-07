import { useState, useEffect, useCallback, useRef } from "react";

const TIME_PER_QUESTION = 30;

export function useGame(challenges) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
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
    if (!isAnswered && currentChallenge) {
      setTimeLeft(TIME_PER_QUESTION);
      startTimer();
    }
    return stopTimer;
  }, [currentIndex, isAnswered, currentChallenge, startTimer, stopTimer]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeLeft === 0 && !isAnswered && currentChallenge) {
      processAnswer(-1);
    }
  }, [timeLeft, isAnswered, currentChallenge]);

  function processAnswer(optionIndex) {
    if (isAnswered || !currentChallenge) return;
    stopTimer();
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);

    const correct = optionIndex === currentChallenge.correctIndex;
    let points = 0;
    let newStreak = streak;

    if (correct) {
      const timeBonus = Math.floor((timeLeft / TIME_PER_QUESTION) * 50);
      newStreak = streak + 1;
      const streakBonus = Math.min(newStreak * 10, 50);
      points = 100 + timeBonus + streakBonus;
      setStreak(newStreak);
    } else {
      newStreak = 0;
      setStreak(0);
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
    const nextIndex = currentIndex + 1;
    if (nextIndex >= total) {
      setIsFinished(true);
    } else {
      setCurrentIndex(nextIndex);
      setSelectedAnswer(null);
      setIsAnswered(false);
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
    maxTime: TIME_PER_QUESTION,
    selectedAnswer,
    isAnswered,
    isCorrect,
    answerHistory,
    isFinished,
    selectAnswer: processAnswer,
    nextQuestion,
  };
}
