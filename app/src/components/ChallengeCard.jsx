import { motion } from "motion/react";

const optionVariants = {
  initial: { opacity: 0, x: -12 },
  animate: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.07, duration: 0.25, ease: "easeOut" },
  }),
};

export default function ChallengeCard({
  challenge, selectedAnswer, isAnswered, isCorrect, onSelect, difficulty, hint,
}) {
  function getOptionClass(index) {
    if (!isAnswered) return "option";
    if (index === challenge.correctIndex) return "option option--correct";
    if (index === selectedAnswer && !isCorrect) return "option option--wrong";
    return "option";
  }

  const showHint = isAnswered && !isCorrect && hint && difficulty === "facil";

  return (
    <div className="challenge-card">
      <div className="question-section">
        <motion.p
          className="challenge-question"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {challenge.question}
        </motion.p>

        {challenge.code && (
          <motion.pre
            className="code-block"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <code>{challenge.code}</code>
          </motion.pre>
        )}
      </div>

      <div className="options-grid">
        {challenge.options.map((option, i) => (
          <motion.button
            key={i}
            className={getOptionClass(i)}
            custom={i}
            variants={optionVariants}
            initial="initial"
            animate={
              isAnswered && i === challenge.correctIndex
                ? { opacity: 1, x: 0, scale: [1, 1.03, 1], transition: { duration: 0.35, delay: 0.1 } }
                : isAnswered && i === selectedAnswer && !isCorrect
                ? { opacity: 1, x: [-8, 8, -6, 6, -3, 3, 0], transition: { duration: 0.4 } }
                : isAnswered
                ? { opacity: 1, x: 0, scale: 1 }
                : "animate"
            }
            onClick={() => !isAnswered && onSelect(i)}
            disabled={isAnswered}
            whileTap={!isAnswered ? { scale: 0.98, y: 2 } : {}}
          >
            <span className="option-letter">{String.fromCharCode(65 + i)}</span>
            <span className="option-text">{option}</span>
            {isAnswered && i === challenge.correctIndex && <span className="option-marker">✓</span>}
            {isAnswered && i === selectedAnswer && !isCorrect && <span className="option-marker">✗</span>}
          </motion.button>
        ))}
      </div>

      {showHint && (
        <motion.p
          className="challenge-hint"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          💡 {hint}
        </motion.p>
      )}
    </div>
  );
}
