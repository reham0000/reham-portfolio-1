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

/**
 * Infinite marquee of icon pills.
 * - speeds up with scroll velocity
 * - glides to a stop while hovered, and eases back when the mouse leaves
 */
export default function Marquee({ items, baseVelocity = -2, className = "" }) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 3], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  // 1 = full speed, 0 = stopped; springs between them for a smooth pause
  const speed = useSpring(1, { stiffness: 120, damping: 24 });

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) direction.current = -1;
    else if (factor.get() > 0) direction.current = 1;
    moveBy += direction.current * moveBy * factor.get();
    baseX.set(baseX.get() + moveBy * speed.get());
  });

  // Repeat short lists so one copy is always wider than the screen
  const list = items.length < 12 ? [...items, ...items] : items;

  const row = (copy) => (
    <div className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={copy > 0}>
      {list.map((item, i) => {
        const Icon = item.icon;
        return (
          <span
            key={i}
            className="group/pill flex items-center gap-2.5 rounded-full border border-line bg-surface py-2 pl-2 pr-4 text-sm font-medium text-ink/80 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-white md:text-[15px]"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-canvas text-accent transition-colors duration-300 group-hover/pill:bg-white/15 group-hover/pill:text-white">
              <Icon />
            </span>
            {item.name}
          </span>
        );
      })}
    </div>
  );

  return (
    <div
      onPointerEnter={() => speed.set(0)}
      onPointerLeave={() => speed.set(1)}
      className={`overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] ${className}`}
    >
      <motion.div className="flex w-max py-1" style={{ x }}>
        {row(0)}
        {row(1)}
      </motion.div>
    </div>
  );
}
