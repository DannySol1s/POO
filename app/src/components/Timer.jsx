import { motion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

export default function Timer({ timeLeft, maxTime, isAnswered, color }) {
  const pct = (timeLeft / maxTime) * 100;
  const isUrgent = timeLeft <= 10 && !isAnswered;

  const spring = useSpring(pct, { stiffness: 80, damping: 20 });
  const width  = useTransform(spring, (v) => `${v}%`);

  useEffect(() => { spring.set(pct); }, [pct]);

  return (
    <div className="timer">
      <div className="timer-bar-track">
        <motion.div
          className="timer-bar-fill"
          style={{
            width,
            backgroundColor: isUrgent ? "#ef4444" : color,
          }}
          animate={isUrgent ? { opacity: [1, 0.6, 1] } : { opacity: 1 }}
          transition={isUrgent ? { duration: 0.5, repeat: Infinity } : {}}
        />
      </div>
      <motion.span
        className={`timer-label ${isUrgent ? "timer-label--urgent" : ""}`}
        animate={isUrgent ? { scale: [1, 1.15, 1] } : { scale: 1 }}
        transition={isUrgent ? { duration: 0.5, repeat: Infinity } : {}}
      >
        {timeLeft}s
      </motion.span>
    </div>
  );
}
