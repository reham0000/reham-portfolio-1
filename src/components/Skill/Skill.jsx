import { motion } from "framer-motion";
import { FiCode } from "react-icons/fi";
import { skillGroups, skills } from "../../data/portfolio";
import { EASE_OUT } from "../../lib/motion";
import { SectionHeader, trackSpotlight } from "../ui/Bits";
import { FadeUp } from "../ui/Reveal";
import TechOrbit from "../ui/TechOrbit";

const orbitInner = skills.slice(0, 5);
const orbitOuter = skills.slice(5, 13);

function SkillRow({ skill, delay }) {
  const Icon = skill.icon;
  return (
    <div className="group">
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-soft text-lg text-accent-ink transition-colors duration-300 group-hover:bg-accent group-hover:text-ink">
            <Icon />
          </span>
          <span className="font-medium">{skill.name}</span>
        </span>
        <span className="font-mono text-sm text-mute">{skill.level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-accent-soft">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-ink"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE_OUT, delay }}
        />
      </div>
    </div>
  );
}

export default function Skill() {
  return (
    <section id="skills" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader label="Skills" title="Tools I use to bring ideas to life." accent={["life"]}>
          <div className="hidden md:block">
            <TechOrbit inner={orbitInner} outer={orbitOuter} center={<FiCode />} size={270} />
          </div>
        </SectionHeader>

        <div className="grid gap-4 lg:grid-cols-3">
          {skillGroups.map((group, gi) => {
            const GroupIcon = group.icon;
            return (
              <FadeUp
                key={group.title}
                delay={gi * 0.1}
                onPointerMove={trackSpotlight}
                className="card spotlight p-6 md:p-8"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-lg text-ink">
                      <GroupIcon />
                    </span>
                    <h3 className="text-xl font-medium tracking-tight">{group.title}</h3>
                  </div>
                  <span className="font-mono text-xs text-mute">0{group.skills.length}</span>
                </div>
                <div className="space-y-6">
                  {group.skills.map((s, i) => (
                    <SkillRow key={s.name} skill={s} delay={0.2 + i * 0.08} />
                  ))}
                </div>
              </FadeUp>
            );
          })}
        </div>

      </div>
    </section>
  );
}
