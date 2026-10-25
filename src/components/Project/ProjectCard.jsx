import { FiArrowUpRight, FiGithub } from "react-icons/fi";

/** Project card with zooming screenshot, title and tags. */
export default function ProjectCard({ project, wide = false }) {
  return (
    <article className="group card flex h-full flex-col p-3">
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        data-cursor="Visit"
        aria-label={`Open ${project.title}`}
        className={`relative block overflow-hidden rounded-[1.25rem] bg-canvas ${
          wide ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[16/10]"
        }`}
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        {/* Description slides up on hover instead of sitting in the card */}
        <div className="absolute inset-x-3 bottom-3 hidden translate-y-4 rounded-2xl bg-ink/85 p-4 text-sm leading-relaxed text-white opacity-0 backdrop-blur transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100 md:block">
          {project.description}
        </div>
      </a>
      <div className="flex flex-1 flex-col gap-4 p-3 pt-5 md:p-4 md:pt-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-medium tracking-[-0.03em] md:text-[1.75rem]">{project.title}</h3>

          </div>
          <div className="flex shrink-0 gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} source code`}
              className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:border-ink hover:bg-ink hover:text-white"
            >
              <FiGithub />
            </a>
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} live site`}
              className="grid h-11 w-11 place-items-center rounded-full bg-accent text-ink transition-transform duration-500 hover:rotate-45"
            >
              <FiArrowUpRight />
            </a>
          </div>
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-ink">
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
