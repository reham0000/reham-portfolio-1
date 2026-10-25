import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor: a precise dot plus a trailing ring.
 * Elements can set data-cursor="Label" to show a labelled bubble.
 * Only enabled on devices with a fine pointer.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState({ mode: "default", label: "" });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    setEnabled(true);
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const target = e.target.closest?.("[data-cursor], a, button, input, textarea, label");
      if (!target) return setState({ mode: "default", label: "" });
      const label = target.getAttribute("data-cursor");
      if (label) return setState({ mode: "label", label });
      if (target.matches("input, textarea")) return setState({ mode: "text", label: "" });
      setState({ mode: "hover", label: "" });
    };
    const leave = () => setState({ mode: "hidden", label: "" });
    const enter = () => setState({ mode: "default", label: "" });

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    root.addEventListener("pointerleave", leave);
    root.addEventListener("pointerenter", enter);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("pointerenter", enter);
    };
  }, [x, y]);

  if (!enabled) return null;

  const { mode, label } = state;
  const ring = {
    default: { width: 34, height: 34, opacity: 1, backgroundColor: "rgba(255,255,255,0)" },
    hover: { width: 60, height: 60, opacity: 1, backgroundColor: "rgba(255,255,255,1)" },
    text: { width: 3, height: 26, opacity: 1, backgroundColor: "rgba(255,255,255,1)" },
    label: { width: 88, height: 88, opacity: 1, backgroundColor: "rgba(43,78,255,1)" },
    hidden: { width: 0, height: 0, opacity: 0, backgroundColor: "rgba(255,255,255,0)" },
  }[mode];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
      <motion.div className="absolute left-0 top-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          animate={ring}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${
            mode === "label" ? "" : "border border-white/70 mix-blend-difference"
          }`}
        >
          {mode === "label" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs font-medium text-white"
            >
              {label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <div
          className={`h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-opacity duration-200 ${
            mode === "default" ? "opacity-100" : "opacity-0"
          }`}
        />
      </motion.div>
    </div>
  );
}
