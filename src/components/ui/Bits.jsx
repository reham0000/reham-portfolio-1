import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useScroll, useSpring } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { SplitReveal } from "./Reveal";

/** Thin accent bar at the top showing page scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-accent"
    />
  );
}

/** Small pill label, e.g. "● About". */
export function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-mute">
      <span className="h-1.5 w-1.5 rounded-full bg-accent-ink" />
      {children}
    </span>
  );
}

/** Section heading with eyebrow, animated title and optional right-side content. */
export function SectionHeader({ label, title, accent = [], children, center = false }) {
  return (
    <div className={`mb-12 md:mb-16 ${center ? "text-center" : ""}`}>
      <Eyebrow>{label}</Eyebrow>
      <div
        className={`mt-5 flex flex-col gap-6 ${
          center ? "items-center" : "md:flex-row md:items-end md:justify-between"
        }`}
      >
        <h2 className="max-w-3xl text-[clamp(2.25rem,5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.035em]">
          <SplitReveal text={title} accent={accent} />
        </h2>
        {children}
      </div>
    </div>
  );
}

/** Number that counts up when it scrolls into view. */
export function CountUp({ to, decimals = 0, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setValue,
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Live clock for Dhaka. */
export function LocalTime({ seconds = true }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const time = now.toLocaleTimeString("en-US", {
    timeZone: "Asia/Dhaka",
    hour: "2-digit",
    minute: "2-digit",
    ...(seconds ? { second: "2-digit" } : {}),
  });
  return <span className="tabular-nums">{time}</span>;
}

/** Text that rolls to a duplicate copy on hover (parent needs `group`). */
export function Roll({ children }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

/** Pill button / link used across the site. */
export function Button({ href, children, variant = "dark", icon = FiArrowUpRight, className = "", ...rest }) {
  const Icon = icon;
  const styles = {
    dark: "bg-ink text-white",
    accent: "bg-accent text-ink",
    ghost: "border border-line bg-surface text-ink hover:border-ink/30",
    light: "bg-white text-ink",
  }[variant];
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full py-2 pl-6 pr-2 text-sm font-medium transition-colors ${styles} ${className}`}
      {...rest}
    >
      <Roll>{children}</Roll>
      {Icon && (
        <span
          className={`relative grid h-9 w-9 place-items-center overflow-hidden rounded-full ${
            variant === "ghost" || variant === "light" ? "bg-ink text-white" : "bg-white text-ink"
          }`}
        >
          <Icon className="absolute transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-6 group-hover:translate-x-6" />
          <Icon className="absolute -translate-x-6 translate-y-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
    </Tag>
  );
}

/** Sets --mx/--my CSS variables so `.spotlight` can follow the mouse. */
export const trackSpotlight = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};
