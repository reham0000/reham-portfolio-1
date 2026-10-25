import { useRef } from "react";
import { motion, useSpring } from "framer-motion";

/** Pulls its child toward the mouse pointer while hovered. */
export default function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  const spring = { stiffness: 180, damping: 14, mass: 0.4 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  const onMove = (e) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
