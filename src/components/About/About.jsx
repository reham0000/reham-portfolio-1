import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { FiMapPin } from "react-icons/fi";
import { education, focusAreas, profile } from "../../data/portfolio";
import { EASE_IN_OUT } from "../../lib/motion";
import { FadeUp, ScrollWords } from "../ui/Reveal";
import { CountUp, LocalTime, SectionHeader, trackSpotlight } from "../ui/Bits";

function Card({ className = "", delay = 0, children }) {
  return (
    <FadeUp delay={delay} onPointerMove={trackSpotlight} className={`card spotlight p-6 md:p-8 ${className}`}>
      {children}
    </FadeUp>
  );
}

export default function About() {
  const photoRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  // Observe the wrapper: a fully clipped element never counts as "in view"
  const photoInView = useInView(photoRef, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <section id="about" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader label="About me" title="A developer who cares about the details." accent={["details"]} />

        <div className="grid gap-4 md:grid-cols-6">
          {/* Story */}
          <Card className="flex flex-col justify-between gap-10 md:col-span-4">
            <ScrollWords
              text={profile.about}
              className="text-[clamp(1.4rem,2.6vw,2.3rem)] font-medium leading-[1.25] tracking-[-0.02em]"
            />
            <div className="flex flex-wrap gap-2">
              {focusAreas.map((f) => (
                <span key={f} className="rounded-full bg-canvas px-3.5 py-1.5 text-sm text-mute">
                  {f}
                </span>
              ))}
            </div>
          </Card>

          {/* Photo */}
          <div ref={photoRef} className="md:col-span-2 md:row-span-2">
            <motion.div
              initial={{ clipPath: "inset(0% 0% 100% 0% round 1.75rem)" }}
              animate={photoInView ? { clipPath: "inset(0% 0% 0% 0% round 1.75rem)" } : {}}
              transition={{ duration: 1.3, ease: EASE_IN_OUT }}
              className="relative h-full min-h-[420px] overflow-hidden rounded-[1.75rem] bg-line"
            >
              <motion.img
                src={profile.photoAbout}
                alt={profile.name}
                loading="lazy"
                style={{ y: imgY }}
                className="absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover"
              />
            </motion.div>
          </div>

          {/* Stats */}
          <Card className="md:col-span-2" delay={0.05}>
            <p className="text-sm text-mute">Projects built</p>
            <p className="mt-6 text-6xl font-medium tracking-[-0.05em]">
              <CountUp to={10} suffix="+" />
            </p>
            <p className="mt-2 text-sm text-mute">From news portals to e-commerce.</p>
          </Card>
          <Card className="md:col-span-2" delay={0.1}>
            <p className="text-sm text-mute">CGPA in CSE</p>
            <p className="mt-6 text-6xl font-medium tracking-[-0.05em]">
              <CountUp to={3.51} decimals={2} />
            </p>
            <p className="mt-2 text-sm text-mute">Bangladesh University, out of 4.00.</p>
          </Card>

          {/* Education */}
          <Card className="md:col-span-4" delay={0.05}>
            <p className="mb-6 text-sm text-mute">Education</p>
            <div className="space-y-6">
              {education.map((e) => (
                <div key={e.degree} className="relative border-l-2 border-line pl-5">
                  <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-surface" />
                  <p className="text-xs font-medium uppercase tracking-wider text-accent">{e.period}</p>
                  <p className="mt-1 text-lg font-medium tracking-tight md:text-xl">{e.degree}</p>
                  <p className="text-mute">
                    {e.school} · {e.grade}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Location */}
          <Card className="flex flex-col justify-between border-ink bg-ink text-white md:col-span-2" delay={0.1}>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <FiMapPin /> Location
            </div>
            <div className="mt-10">
              <p className="font-serif text-4xl italic">Dhaka, BD</p>
              <p className="mt-2 text-sm text-white/60">
                <LocalTime /> · GMT+6
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
