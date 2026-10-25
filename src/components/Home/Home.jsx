import Hero from "../Hero/Hero";
import About from "../About/About";
import Skill from "../Skill/Skill";
import Project from "../Project/Project";
import Contact from "../Contact/Contact";
import Marquee from "../ui/Marquee";
import { extraTech, skills } from "../../data/portfolio";

// Split the skill list into two rows that run in opposite directions
const allTech = [...skills, ...extraTech];
const half = Math.ceil(allTech.length / 2);
const rowA = allTech.slice(0, half);
const rowB = allTech.slice(half);

export default function Home() {
  return (
    <>
      <Hero />
      <section aria-label="Tech stack" className="border-y border-line bg-surface/60 py-6 md:py-8">
        <p className="mb-5 text-center text-xs font-medium uppercase tracking-[0.2em] text-mute">
          Technologies I work with
        </p>
        <div className="space-y-3">
          <Marquee items={rowA} baseVelocity={-1.6} />
          <Marquee items={rowB} baseVelocity={1.6} />
        </div>
      </section>
      <About />
      <Skill />
      <Project />
      <Contact />
    </>
  );
}
