import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiGithub, FiLock, FiPause, FiPlay } from "react-icons/fi";
import { projects } from "../../data/portfolio";
import { EASE_OUT, pad } from "../../lib/motion";
import { Roll, SectionHeader } from "../ui/Bits";
import { FadeUp } from "../ui/Reveal";

const featured = projects.filter((p) => p.featured);
const SLIDE_MS = 5000;

const hostOf = (url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

/** Browser-window frame that tilts toward the mouse. */
function BrowserMockup({ project, index }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });

  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 8);
    rx.set(-py * 8);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1400 }}
      className="relative"
    >
      <div className="overflow-hidden rounded-[1.5rem] border border-line bg-surface shadow-[0_40px_80px_-40px_rgba(15,36,22,0.45)]">
        {/* Window bar */}
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="mx-auto flex min-w-0 max-w-[70%] items-center gap-2 rounded-full bg-canvas px-4 py-1.5 font-mono text-xs text-mute">
            <FiLock className="shrink-0 text-accent-ink" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={project.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="truncate"
              >
                {hostOf(project.link)}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="w-[54px]" />
        </div>

        {/* Screenshot */}
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          data-cursor="Visit"
          aria-label={`Open ${project.title}`}
          className="relative block aspect-[16/10] overflow-hidden bg-canvas"
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={project.id}
              src={project.image}
              alt={project.title}
              initial={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </AnimatePresence>
        </a>
      </div>

      {/* Floating index badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="absolute -bottom-4 -left-2 grid h-12 w-12 place-items-center rounded-2xl bg-accent font-mono text-base md:-bottom-5 md:h-16 md:w-16 md:text-lg font-medium text-ink shadow-[0_15px_30px_-12px_rgba(15,36,22,0.5)] md:-left-6"
        >
          {pad(index + 1)}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default function Project() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [paused, setPaused] = useState(false);
  const running = inView && !hovering && !paused;
  const project = featured[active];

  // Auto-advance through the projects
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % featured.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [active, running]);

  return (
    <section id="projects" className="relative overflow-hidden px-5 py-24 md:px-10 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-1/3 h-[520px] w-[520px] rounded-full bg-accent/25 blur-3xl"
      />
      <div className="relative mx-auto max-w-[1280px]">
        <SectionHeader label="Selected work" title="Projects I've built and shipped." accent={["shipped"]}>
          <Link
            to="/viewMore"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-line bg-surface px-5 py-3 text-sm font-medium hover:border-accent-ink/40 md:self-auto"
          >
            <Roll>View all projects</Roll>
            <FiArrowUpRight className="transition-transform duration-500 group-hover:rotate-45" />
          </Link>
        </SectionHeader>

        <div
          ref={ref}
          onPointerEnter={() => setHovering(true)}
          onPointerLeave={() => setHovering(false)}
          className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14"
        >
          {/* Preview */}
          <FadeUp className="lg:order-2 lg:col-span-7">
            <BrowserMockup project={project} index={active} />
            <div className="mt-10 flex flex-wrap items-center gap-3 pl-14 md:pl-16">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white"
              >
                <Roll>Live site</Roll>
                <FiArrowUpRight className="transition-transform duration-500 group-hover:rotate-45" />
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-medium hover:border-accent-ink/40"
              >
                <FiGithub />
                <Roll>Source</Roll>
              </a>
              <button
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                className="ml-auto grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-mute hover:text-ink"
              >
                {paused ? <FiPlay /> : <FiPause />}
              </button>
            </div>
          </FadeUp>

          {/* List */}
          <div className="lg:order-1 lg:col-span-5">
            {featured.map((p, i) => {
              const isActive = i === active;
              return (
                <FadeUp key={p.id} delay={i * 0.06} y={20}>
                  <button
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={`group relative mb-2 w-full overflow-hidden rounded-2xl border p-5 text-left transition-all duration-500 ${
                      isActive
                        ? "border-line bg-surface shadow-[0_20px_40px_-28px_rgba(15,36,22,0.4)]"
                        : "border-transparent hover:bg-surface/60"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono text-xs transition-colors ${
                          isActive ? "text-accent-ink" : "text-mute"
                        }`}
                      >
                        {pad(i + 1)}
                      </span>
                      <span
                        className={`flex-1 text-xl font-medium tracking-[-0.02em] transition-all duration-500 md:text-2xl ${
                          isActive ? "text-ink" : "text-ink/45 group-hover:translate-x-1 group-hover:text-ink/80"
                        }`}
                      >
                        {p.title}
                      </span>
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-500 ${
                          isActive ? "rotate-45 bg-accent text-ink" : "bg-transparent text-ink/30"
                        }`}
                      >
                        <FiArrowUpRight />
                      </span>
                    </div>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: EASE_OUT }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-wrap gap-2 pl-9 pt-4">
                            {p.tags.map((t) => (
                              <span
                                key={t}
                                className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-ink"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Time left on this slide */}
                    {isActive && (
                      <span className="absolute inset-x-0 bottom-0 h-[3px] bg-accent-soft">
                        <motion.span
                          key={`${active}-${running}`}
                          className="block h-full origin-left bg-accent"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: running ? 1 : 0 }}
                          transition={{ duration: running ? SLIDE_MS / 1000 : 0.3, ease: "linear" }}
                        />
                      </span>
                    )}
                  </button>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
