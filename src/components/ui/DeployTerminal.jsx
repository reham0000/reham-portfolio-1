import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

// The steps a project goes through on its way to production
const steps = [
  { cmd: "git push origin main", out: "Code pushed" },
  { cmd: "npm run build", out: "Next.js build ready" },
  { cmd: "docker compose up -d", out: "Container running" },
  { cmd: "sudo nginx -s reload", out: "Nginx reloaded" },
  { cmd: "dig +short your-domain.com", out: "Domain → VPS" },
];

const TYPE_MS = 38;

/** Terminal that types out a deploy, step by step, then loops. */
export default function DeployTerminal({ className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotion();
  // step: index of the line being typed; typed: characters shown; done: output shown for this step
  const [state, setState] = useState({ step: 0, typed: 0, done: false });

  useEffect(() => {
    if (!inView || reduced) return;
    const { step, typed, done } = state;
    let t;
    if (step >= steps.length) {
      t = setTimeout(() => setState({ step: 0, typed: 0, done: false }), 3200);
    } else if (typed < steps[step].cmd.length) {
      t = setTimeout(() => setState({ step, typed: typed + 1, done: false }), TYPE_MS);
    } else if (!done) {
      t = setTimeout(() => setState({ step, typed, done: true }), 450);
    } else {
      t = setTimeout(() => setState({ step: step + 1, typed: 0, done: false }), 500);
    }
    return () => clearTimeout(t);
  }, [state, inView, reduced]);

  const step = reduced ? steps.length : state.step;
  const live = step >= steps.length;
  const progress = live ? 1 : (step + (state.done ? 1 : 0)) / steps.length;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col overflow-hidden rounded-[1.75rem] bg-ink text-white ${className}`}
      aria-label="Animation of a deploy: git push, build, docker, nginx, domain, then live"
      role="img"
    >
      {/* Window bar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-white/40">reham@vps:~/app</span>
        <span
          className={`ml-auto flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] transition-colors duration-500 ${
            live ? "bg-accent text-ink" : "bg-white/10 text-white/60"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-ink" : "animate-pulse bg-accent"}`} />
          {live ? "live" : "deploying"}
        </span>
      </div>

      {/* Lines */}
      <div className="flex-1 space-y-3 p-5 font-mono text-[13px] leading-relaxed md:p-6 md:text-sm">
        {steps.map((s, i) => {
          if (i > step) return null;
          const current = i === step && !reduced;
          const text = current ? s.cmd.slice(0, state.typed) : s.cmd;
          const showOut = i < step || (current && state.done);
          return (
            <div key={s.cmd}>
              <p>
                <span className="text-accent">❯</span> <span className="text-white/90">{text}</span>
                {current && !state.done && (
                  <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-accent" />
                )}
              </p>
              {showOut && (
                <motion.p
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 pl-4 text-white/45"
                >
                  <FiCheck className="text-accent" /> {s.out}
                </motion.p>
              )}
            </div>
          );
        })}
        {live && (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="!mt-5 inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1.5 text-accent"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Live in production
          </motion.p>
        )}
      </div>

      {/* Progress */}
      <div className="h-1 bg-white/10">
        <motion.div
          className="h-full origin-left bg-accent"
          animate={{ scaleX: progress }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
