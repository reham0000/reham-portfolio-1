import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Lenis from "lenis";

const LenisContext = createContext(null);

export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let frame;
    const loop = (time) => {
      instance.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    setLenis(instance);

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export const useLenis = () => useContext(LenisContext);

// Smoothly scroll to a selector, element or pixel offset
export function useScrollTo() {
  const lenis = useLenis();
  return useCallback(
    (target, opts = {}) => {
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.4, ...opts });
        return;
      }
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: opts.immediate ? "auto" : "smooth" });
      } else {
        const el = typeof target === "string" ? document.querySelector(target) : target;
        el?.scrollIntoView({ behavior: opts.immediate ? "auto" : "smooth" });
      }
    },
    [lenis]
  );
}

// Stop scrolling while something (preloader, menu) is covering the page
export function useScrollLock(locked) {
  const lenis = useLenis();
  useEffect(() => {
    if (!locked) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      root.style.overflow = prev;
      lenis?.start();
    };
  }, [locked, lenis]);
}
