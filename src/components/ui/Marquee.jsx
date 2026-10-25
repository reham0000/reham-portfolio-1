import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/** Infinite marquee that speeds up and flips direction with scroll velocity. */
export default function Marquee({ items, baseVelocity = -2.5, className = "" }) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) direction.current = -1;
    else if (factor.get() > 0) direction.current = 1;
    moveBy += direction.current * moveBy * factor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const row = (copy) => (
    <div className="flex shrink-0 items-center" aria-hidden={copy > 0}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 md:px-10">{item}</span>
          <span className="font-serif text-accent">*</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div className="flex w-max" style={{ x }}>
        {row(0)}
        {row(1)}
      </motion.div>
    </div>
  );
}
