import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { navLinks, profile } from "../../data/portfolio";
import { EASE_OUT, useLoaded } from "../../lib/motion";
import { useScrollTo } from "../ui/SmoothScroll";
import { Roll } from "../ui/Bits";
import Magnetic from "../ui/Magnetic";

export default function Navbar() {
  const loaded = useLoaded();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const { scrollY } = useScroll();
  const scrollTo = useScrollTo();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  // Hide while scrolling down, reveal when scrolling up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    const down = latest > prev && latest > 300;
    setHidden(down);
    if (down) setOpen(false);
  });

  // Highlight the section currently in the middle of the screen
  useEffect(() => {
    if (!onHome) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    if (!onHome) return navigate(id === "home" ? "/" : `/#${id}`);
    scrollTo(id === "home" ? 0 : `#${id}`, { offset: -24 });
  };

  return (
    <motion.header
      initial={{ y: -120 }}
      animate={loaded ? { y: hidden ? -120 : 0 } : { y: -120 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      className="fixed inset-x-0 top-3 z-50 px-3 md:top-5"
    >
      <div className="mx-auto max-w-[1100px] rounded-[1.75rem] border border-line bg-surface/80 p-1.5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.25)] backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <a href="/" onClick={go("home")} className="group flex items-center gap-2.5 pl-1.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink font-serif text-lg italic text-white transition-transform duration-500 group-hover:rotate-[360deg]">
              R
            </span>
            <span className="text-[15px] font-semibold tracking-tight">
              {profile.short}
              <span className="text-accent">.</span>
            </span>
          </a>

          <nav className="hidden items-center md:flex">
            {navLinks.map(({ label, id }) => {
              const isActive = onHome && active === id;
              return (
                <a
                  key={id}
                  href={`/#${id}`}
                  onClick={go(id)}
                  className={`group relative rounded-full px-4 py-2 text-sm transition-colors ${
                    isActive ? "text-ink" : "text-mute hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-canvas"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    <Roll>{label}</Roll>
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Magnetic strength={0.25}>
                <a
                  href="#contact"
                  onClick={go("contact")}
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white"
                >
                  <Roll>Hire me</Roll>
                  <FiArrowUpRight className="transition-transform duration-500 group-hover:rotate-45" />
                </a>
              </Magnetic>
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full bg-ink md:hidden"
            >
              <span className="relative h-2.5 w-4">
                <span
                  className={`absolute left-0 h-[1.5px] w-4 bg-white transition-all duration-500 ${
                    open ? "top-1 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-4 bg-white transition-all duration-500 ${
                    open ? "top-1 -rotate-45" : "top-2.5"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-1 px-2 pb-3 pt-4">
                {navLinks.map(({ label, id }, i) => (
                  <motion.a
                    key={id}
                    href={`/#${id}`}
                    onClick={go(id)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                    className={`rounded-2xl px-4 py-3 text-2xl font-medium tracking-tight ${
                      onHome && active === id ? "bg-canvas" : ""
                    }`}
                  >
                    {label}
                  </motion.a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
