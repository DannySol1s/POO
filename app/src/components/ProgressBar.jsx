import { motion } from "motion/react";

export default function ProgressBar({ current, total, color }) {
  const pct = (current / total) * 100;

  return (
    <div className="progress">
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <span className="progress-label">{current} / {total}</span>
    </div>
  );
}
