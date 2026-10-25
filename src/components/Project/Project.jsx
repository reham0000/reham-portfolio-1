import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { projects } from "../../data/portfolio";
import { Roll, SectionHeader } from "../ui/Bits";
import { FadeUp } from "../ui/Reveal";
import ProjectCard from "./ProjectCard";

const featured = projects.filter((p) => p.featured);

export default function Project() {
  return (
    <section id="projects" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader label="Selected work" title="Projects I've built and shipped." accent={["shipped"]}>
          <Link
            to="/viewMore"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-line bg-surface px-5 py-3 text-sm font-medium hover:border-ink/30 md:self-auto"
          >
            <Roll>View all projects</Roll>
            <FiArrowUpRight className="transition-transform duration-500 group-hover:rotate-45" />
          </Link>
        </SectionHeader>

        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((p, i) => (
            <FadeUp key={p.id} delay={i === 0 ? 0 : (i - 1) * 0.1} className={i === 0 ? "md:col-span-2" : ""}>
              <ProjectCard project={p} wide={i === 0} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
