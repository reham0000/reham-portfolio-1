import { useEffect, useState } from "react";
import { animate, motion } from "framer-motion";
import { EASE_IN_OUT, EASE_OUT } from "../../lib/motion";

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.6,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(onDone, 200),
    });
    return () => controls.stop();
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-canvas"
      initial={{ y: "0%" }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: EASE_IN_OUT }}
    >
      <div className="w-64 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="text-4xl font-medium tracking-[-0.03em]"
        >
          Reham<span className="font-serif italic text-accent">.</span>
        </motion.p>
        <div className="mt-6 h-[3px] w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full origin-left rounded-full bg-accent"
            style={{ transform: `scaleX(${count / 100})` }}
          />
        </div>
        <p className="mt-3 font-mono text-xs tabular-nums text-mute">{count}%</p>
      </div>
    </motion.div>
  );
}
