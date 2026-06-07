import { motion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

export default function Timer({ timeLeft, maxTime, isAnswered, color }) {
  const pct = (timeLeft / maxTime) * 100;
  const isUrgent = timeLeft <= 10 && !isAnswered;

  const spring = useSpring(pct, { stiffness: 80, damping: 20 });
  const width  = useTransform(spring, (v) => `${v}%`);

  useEffect(() => { spring.set(pct); }, [pct]);

  const barColor = isUrgent ? "#ff3366" : pct > 50 ? color : "#f97316";

  return (
    <div className="timer-hud">
      <span className="timer-label-hud">Tiempo</span>
      <div className="timer-bar-track">
        <motion.div
          className="timer-bar-fill"
          style={{ width, backgroundColor: barColor }}
          animate={isUrgent ? { opacity: [1, 0.55, 1] } : { opacity: 1 }}
          transition={isUrgent ? { duration: 0.5, repeat: Infinity } : {}}
        />
      </div>
      <motion.span
        className={`timer-digits ${isUrgent ? "timer-digits--urgent" : ""}`}
        animate={isUrgent ? { scale: [1, 1.12, 1] } : { scale: 1 }}
        transition={isUrgent ? { duration: 0.5, repeat: Infinity } : {}}
      >
        {timeLeft}s
      </motion.span>
    </div>
  );
}
