import Hero from "../Hero/Hero";
import About from "../About/About";
import Skill from "../Skill/Skill";
import Project from "../Project/Project";
import Contact from "../Contact/Contact";
import Marquee from "../ui/Marquee";

const stack = ["React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "Firebase", "Tailwind CSS", "Docker", "Nginx", "VPS & Hosting", "Domains & DNS"];

export default function Home() {
  return (
    <>
      <Hero />
      <div className="border-y border-line bg-surface py-5 md:py-6">
        <Marquee
          items={stack}
          baseVelocity={-1.5}
          className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-medium tracking-[-0.03em]"
        />
      </div>
      <About />
      <Skill />
      <Project />
      <Contact />
    </>
  );
}
