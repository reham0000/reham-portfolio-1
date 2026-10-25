import { Fragment, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { EASE_OUT } from "../../lib/motion";

/**
 * Words slide up from behind a mask, one after another.
 * Words listed in `accent` render in the italic serif accent style.
 */
export function SplitReveal({ text, className = "", delay = 0, stagger = 0.05, start = true, accent = [] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const show = start && inView;
  const words = text.split(" ");

  return (
    <span ref={ref} className={className} aria-label={text} role="text">
      {words.map((word, i) => {
        const isAccent = accent.includes(word.replace(/[.,!?—]/g, ""));
        return (
          <Fragment key={i}>
            <span aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
              <motion.span
                className={`inline-block will-change-transform ${
                  isAccent ? "font-serif font-normal italic tracking-normal text-accent-ink" : ""
                }`}
                initial={{ y: "115%" }}
                animate={show ? { y: "0%" } : { y: "115%" }}
                transition={{ duration: 0.95, ease: EASE_OUT, delay: delay + i * stagger }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        );
      })}
    </span>
  );
}

/** Simple fade + rise when scrolled into view. */
export function FadeUp({ children, className = "", delay = 0, y = 28, as = "div", start = true, ...rest }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const Tag = motion[as];
  return (
    <Tag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={start && inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Paragraph whose words darken as you scroll through it. */
export function ScrollWords({ text, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{" "}
    </>
  );
}

/** Horizontal rule that draws itself in. */
export function Line({ className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -5% 0px" });
  return (
    <motion.div
      ref={ref}
      className={`h-px origin-left bg-line ${className}`}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 1.3, ease: EASE_OUT, delay }}
    />
  );
}
