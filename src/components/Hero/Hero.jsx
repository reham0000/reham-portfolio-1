import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { FiDownload, FiServer } from "react-icons/fi";
import { SiNextdotjs, SiReact, SiTypescript } from "react-icons/si";
import { profile, socials } from "../../data/portfolio";
import { EASE_IN_OUT, EASE_OUT, useLoaded } from "../../lib/motion";
import { SplitReveal } from "../ui/Reveal";
import { Button } from "../ui/Bits";
import Magnetic from "../ui/Magnetic";
import { useScrollTo } from "../ui/SmoothScroll";

function RoleRotator({ roles }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % roles.length), 2400);
    return () => clearInterval(t);
  }, [roles.length]);

  return (
    <span className="relative inline-flex h-[1.35em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
          className="inline-block whitespace-nowrap font-medium text-ink"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const chips = [
  { label: "Next.js", icon: SiNextdotjs, pos: "-left-3 top-10 md:-left-10" },
  { label: "TypeScript", icon: SiTypescript, pos: "-right-3 top-1/3 md:-right-8" },
  { label: "React", icon: SiReact, pos: "-left-3 bottom-32 md:-left-12" },
  { label: "VPS & Hosting", icon: FiServer, pos: "-right-2 bottom-24 md:-right-10" },
];

export default function Hero() {
  const loaded = useLoaded();
  const ref = useRef(null);
  const scrollTo = useScrollTo();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [0, 4]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const base = 0.1;
  const show = (d) => ({
    initial: { opacity: 0, y: 24 },
    animate: loaded ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, ease: EASE_OUT, delay: base + d },
  });

  return (
    <section id="home" ref={ref} className="relative overflow-hidden px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
      <div aria-hidden className="dots pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-accent/30 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <motion.div style={{ y: textY }} className="lg:col-span-7">
          <motion.div {...show(0.2)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for freelance & full-time
            </span>
          </motion.div>

          <h1 className="mt-7 text-[clamp(2.4rem,4.7vw,4.4rem)] font-medium leading-[1.06] tracking-[-0.04em]">
            <span className="block">
              <SplitReveal text="Hi, I'm Reham —" start={loaded} delay={base} />
            </span>
            <span className="block">
              <SplitReveal text="a full-stack developer" accent={["full-stack"]} start={loaded} delay={base + 0.15} />
            </span>
            <span className="block">
              <SplitReveal text="who ships to production." accent={["production"]} start={loaded} delay={base + 0.3} />
            </span>
          </h1>

          <motion.p {...show(0.55)} className="mt-7 text-lg text-mute">
            Currently working as a <RoleRotator roles={profile.roles} />
          </motion.p>

          <motion.div {...show(0.75)} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic strength={0.25}>
              <Button
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#contact", { offset: -24 });
                }}
              >
                Let's work together
              </Button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Button href={profile.resume} target="_blank" rel="noreferrer" variant="ghost" icon={FiDownload}>
                Download CV
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div {...show(0.85)} className="mt-10 flex flex-wrap items-center gap-3">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-mute transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:bg-ink hover:text-white"
                >
                  <Icon />
                </a>
              );
            })}
            <span className="ml-2 text-sm text-mute">Based in {profile.city}</span>
          </motion.div>
        </motion.div>

        {/* Portrait card */}
        <div className="relative mx-auto w-full max-w-[400px] lg:col-span-5">
          <motion.div style={{ y: cardY, rotate: cardRotate }}>
            <motion.div
              initial={{ clipPath: "inset(100% 0% 0% 0% round 2rem)" }}
              animate={loaded ? { clipPath: "inset(0% 0% 0% 0% round 2rem)" } : {}}
              transition={{ duration: 1.3, ease: EASE_IN_OUT, delay: base + 0.2 }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-line"
              data-cursor="Hello!"
            >
              <motion.img
                src={profile.photoHero}
                alt={profile.name}
                initial={{ scale: 1.25 }}
                animate={loaded ? { scale: 1 } : {}}
                transition={{ duration: 1.6, ease: EASE_OUT, delay: base + 0.2 }}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-24 text-white">
                <p className="font-serif text-2xl italic">{profile.name}</p>
                <p className="mt-1 text-sm text-white/75">MERN Stack Developer · CSE Graduate</p>
              </div>
            </motion.div>

            {chips.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={loaded ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.7, ease: EASE_OUT, delay: base + 0.9 + i * 0.1 }}
                  className={`absolute ${c.pos}`}
                >
                  <motion.div
                    animate={{ y: [0, i % 2 ? -10 : 10, 0] }}
                    transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-medium shadow-[0_12px_30px_-12px_rgba(0,0,0,0.25)]"
                  >
                    <Icon className="text-accent-ink" />
                    {c.label}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
