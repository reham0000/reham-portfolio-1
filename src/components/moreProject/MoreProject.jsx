import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { projects } from "../../data/portfolio";
import { EASE_OUT } from "../../lib/motion";
import { Eyebrow, Roll } from "../ui/Bits";
import { FadeUp, SplitReveal } from "../ui/Reveal";
import ProjectCard from "../Project/ProjectCard";

export default function MoreProject() {
  const [filter, setFilter] = useState("All");
  const tags = useMemo(() => ["All", ...new Set(projects.flatMap((p) => p.tags))], []);
  const shown = filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <section className="relative px-5 pb-24 pt-32 md:px-10 md:pb-32 md:pt-44">
      <div aria-hidden className="dots pointer-events-none absolute inset-x-0 top-0 h-[600px]" />
      <div className="relative mx-auto max-w-[1280px]">
        <FadeUp>
          <Link to="/" className="group mb-8 inline-flex items-center gap-2 text-sm text-mute hover:text-ink">
            <FiArrowLeft className="transition-transform duration-500 group-hover:-translate-x-1" />
            <Roll>Back to home</Roll>
          </Link>
        </FadeUp>

        <Eyebrow>{projects.length} projects</Eyebrow>
        <h1 className="mt-5 text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.98] tracking-[-0.045em]">
          <SplitReveal text="All my work." accent={["work"]} />
        </h1>

        {/* Filter */}
        <FadeUp delay={0.2} className="mb-10 mt-10 flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === t ? "text-white" : "border border-line bg-surface text-mute hover:text-ink"
              }`}
            >
              {filter === t && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{t}</span>
            </button>
          ))}
        </FadeUp>

        <motion.div layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: i * 0.05 }}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
