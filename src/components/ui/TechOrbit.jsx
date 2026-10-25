import { motion } from "framer-motion";

/**
 * Icons orbiting a centre badge on two rings that spin in opposite
 * directions. Icons counter-rotate so they always stay upright.
 */
export default function TechOrbit({ inner, outer, center, size = 220 }) {
  const ring = (items, radius, duration, reverse) => (
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent-ink/25"
        style={{ width: radius * 2, height: radius * 2 }}
      />
      {items.map((item, i) => {
        const angle = (i / items.length) * Math.PI * 2;
        const Icon = item.icon;
        return (
          <div
            key={item.name}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)` }}
          >
            <motion.span
              title={item.name}
              animate={{ rotate: reverse ? 360 : -360 }}
              transition={{ duration, repeat: Infinity, ease: "linear" }}
              className="grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface text-lg text-accent-ink shadow-[0_8px_20px_-10px_rgba(15,36,22,0.35)]"
            >
              <Icon />
            </motion.span>
          </div>
        );
      })}
    </motion.div>
  );

  return (
    <div aria-hidden className="relative shrink-0" style={{ width: size, height: size }}>
      {ring(outer, size / 2 - 22, 28, false)}
      {ring(inner, size / 2 - 72, 18, true)}
      <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-accent text-2xl text-ink shadow-[0_0_0_8px_rgb(139_231_139/0.25)]">
        {center}
      </div>
    </div>
  );
}
