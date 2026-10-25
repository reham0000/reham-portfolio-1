import { motion } from "framer-motion";
import { familiar, skillGroups } from "../../data/portfolio";
import { EASE_OUT } from "../../lib/motion";
import { SectionHeader, trackSpotlight } from "../ui/Bits";
import { FadeUp } from "../ui/Reveal";

function SkillRow({ skill, delay }) {
  const Icon = skill.icon;
  return (
    <div className="group">
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-canvas text-lg text-ink transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
            <Icon />
          </span>
          <span className="font-medium">{skill.name}</span>
        </span>
        <span className="font-mono text-sm text-mute">{skill.level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-canvas">
        <motion.div
          className="h-full rounded-full bg-accent"
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
          <p className="max-w-sm text-mute">
            From the interface to the server it runs on — frontend, backend, and deployment.
          </p>
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
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-lg text-white">
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

        <FadeUp className="mt-10 flex flex-col gap-4 md:flex-row md:items-center">
          <h3 className="shrink-0 text-sm text-mute">Also familiar with</h3>
          <div className="flex flex-wrap gap-2">
            {familiar.map((f, i) => (
              <motion.span
                key={f}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.04 }}
                className="rounded-full border border-line bg-surface px-4 py-2 text-sm transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
              >
                {f}
              </motion.span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
