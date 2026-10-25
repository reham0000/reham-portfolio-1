import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { FiMapPin } from "react-icons/fi";
import { education, profile } from "../../data/portfolio";
import { EASE_IN_OUT } from "../../lib/motion";
import { FadeUp } from "../ui/Reveal";
import DeployTerminal from "../ui/DeployTerminal";
import { CountUp, LocalTime, SectionHeader, trackSpotlight } from "../ui/Bits";

function Card({ className = "", delay = 0, children }) {
  return (
    <FadeUp delay={delay} onPointerMove={trackSpotlight} className={`card spotlight p-6 md:p-8 ${className}`}>
      {children}
    </FadeUp>
  );
}

/** Animated radar-style map backdrop with a pulsing pin on Dhaka. */
function LocationRadar() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Dot grid, faded toward the edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgb(255 255 255 / 0.16) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
          maskImage: "radial-gradient(circle at 72% 40%, #000 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle at 72% 40%, #000 0%, transparent 75%)",
        }}
      />

      <div className="absolute left-[72%] top-[40%]">
        {/* Range rings */}
        {[90, 170, 250].map((size) => (
          <span
            key={size}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
            style={{ width: size, height: size }}
          />
        ))}

        {/* Rotating sweep */}
        <motion.span
          className="absolute h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "conic-gradient(from 0deg, rgb(139 231 139 / 0.45), transparent 22%)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />

        {/* Pulse rings */}
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent"
            animate={{ scale: [1, 7], opacity: [0.9, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: i * 1.3, ease: "easeOut" }}
          />
        ))}

        {/* Pin */}
        <span className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_4px_rgb(139_231_139/0.3),0_0_20px_rgb(139_231_139/0.8)]" />
      </div>

      {/* Darken the bottom so the text stays readable */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
    </div>
  );
}

/** Circular gauge that fills to `value / max` when scrolled into view. */
function Gauge({ value, max }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90" aria-hidden>
      <circle cx="40" cy="40" r={r} fill="none" strokeWidth="7" className="stroke-accent-soft" />
      <motion.circle
        cx="40"
        cy="40"
        r={r}
        fill="none"
        strokeWidth="7"
        strokeLinecap="round"
        className="stroke-accent"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        whileInView={{ strokeDashoffset: c * (1 - value / max) }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />
    </svg>
  );
}

/** Ten dots that light up one by one. */
function DotMeter({ count = 10 }) {
  return (
    <div className="flex gap-1.5" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="h-2.5 flex-1 rounded-full bg-accent"
          initial={{ opacity: 0.15, scaleY: 0.4 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
        />
      ))}
    </div>
  );
}

export default function About() {
  const photoRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  // Observe the wrapper: a fully clipped element never counts as "in view"
  const photoInView = useInView(photoRef, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <section id="about" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader label="About me" title="A developer who cares about the details." accent={["details"]} />

        <div className="grid gap-4 md:grid-cols-6">
          {/* Deploy animation */}
          <FadeUp className="md:col-span-4">
            <DeployTerminal className="h-full min-h-[380px]" />
          </FadeUp>

          {/* Photo */}
          <div ref={photoRef} className="md:col-span-2 md:row-span-2">
            <motion.div
              initial={{ clipPath: "inset(0% 0% 100% 0% round 1.75rem)" }}
              animate={photoInView ? { clipPath: "inset(0% 0% 0% 0% round 1.75rem)" } : {}}
              transition={{ duration: 1.3, ease: EASE_IN_OUT }}
              className="relative h-full min-h-[420px] overflow-hidden rounded-[1.75rem] bg-line"
            >
              <motion.img
                src={profile.photoAbout}
                alt={profile.name}
                loading="lazy"
                style={{ y: imgY }}
                className="absolute inset-x-0 -top-[4%] h-[108%] w-full object-cover object-top"
              />
            </motion.div>
          </div>

          {/* Stats */}
          <Card className="flex flex-col justify-between gap-8 md:col-span-2" delay={0.05}>
            <div className="flex items-start justify-between">
              <p className="text-6xl font-medium tracking-[-0.05em]">
                <CountUp to={10} suffix="+" />
              </p>
              <p className="text-sm text-mute">Projects</p>
            </div>
            <DotMeter />
          </Card>
          <Card className="flex items-center justify-between gap-4 md:col-span-2" delay={0.1}>
            <div>
              <p className="text-6xl font-medium tracking-[-0.05em]">
                <CountUp to={3.51} decimals={2} />
              </p>
              <p className="mt-1 text-sm text-mute">CGPA · CSE</p>
            </div>
            <Gauge value={3.51} max={4} />
          </Card>

          {/* Education */}
          <Card className="md:col-span-4" delay={0.05}>
            <p className="mb-6 text-sm text-mute">Education</p>
            <div className="space-y-6">
              {education.map((e) => (
                <div key={e.degree} className="relative border-l-2 border-line pl-5">
                  <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-accent-ink bg-surface" />
                  <p className="text-xs font-medium uppercase tracking-wider text-accent-ink">{e.period}</p>
                  <p className="mt-1 text-lg font-medium tracking-tight md:text-xl">{e.degree}</p>
                  <p className="text-mute">
                    {e.school} · {e.grade}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Location */}
          <Card
            className="relative flex min-h-[260px] flex-col justify-between overflow-hidden border-ink bg-ink text-white md:col-span-2"
            delay={0.1}
          >
            <LocationRadar />
            <div className="relative flex items-center justify-between text-sm text-white/60">
              <span className="flex items-center gap-2">
                <FiMapPin /> Location
              </span>
              <span className="font-mono text-[11px] tracking-wider text-white/40">23.81°N · 90.41°E</span>
            </div>
            <div className="relative mt-10">
              <p className="font-serif text-4xl italic">Dhaka, BD</p>
              <p className="mt-2 text-sm text-white/60">
                <LocalTime /> · GMT+6
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
