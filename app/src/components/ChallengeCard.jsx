export default function ChallengeCard({
  challenge,
  selectedAnswer,
  isAnswered,
  isCorrect,
  onSelect,
}) {
  function getOptionClass(index) {
    if (!isAnswered) return "option";
    if (index === challenge.correctIndex) return "option option--correct";
    if (index === selectedAnswer && !isCorrect) return "option option--wrong";
    return "option option--dim";
  }

  return (
    <div className="challenge-card">
      <p className="challenge-question">{challenge.question}</p>

      {challenge.code && (
        <pre className="code-block">
          <code>{challenge.code}</code>
        </pre>
      )}

      <div className="options-grid">
        {challenge.options.map((option, i) => (
          <button
            key={i}
            className={getOptionClass(i)}
            onClick={() => !isAnswered && onSelect(i)}
            disabled={isAnswered}
          >
            <span className="option-letter">{String.fromCharCode(65 + i)}</span>
            <span className="option-text">{option}</span>
            {isAnswered && i === challenge.correctIndex && (
              <span className="option-marker">✓</span>
            )}
            {isAnswered && i === selectedAnswer && !isCorrect && (
              <span className="option-marker">✗</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
