import { FiArrowUp } from "react-icons/fi";
import { navLinks, profile, socials } from "../../data/portfolio";
import { Roll } from "../ui/Bits";
import { FadeUp } from "../ui/Reveal";
import { useScrollTo } from "../ui/SmoothScroll";

export default function Footer() {
  const scrollTo = useScrollTo();

  return (
    <footer className="px-3 pb-3 md:px-5 md:pb-5">
      <div className="overflow-hidden rounded-[2rem] bg-ink px-6 pt-14 text-white md:px-12 md:pt-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="max-w-md text-3xl font-medium leading-tight tracking-[-0.03em] md:text-4xl">
                Let's turn your idea into a{" "}
                <span className="font-serif font-normal italic text-accent-soft">live product.</span>
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="group mt-6 inline-flex border-b border-white/30 pb-1 text-lg hover:border-white"
              >
                <Roll>{profile.email}</Roll>
              </a>
            </div>
            <div className="md:col-span-2">
              <p className="mb-4 text-sm text-white/50">Menu</p>
              <div className="flex flex-col gap-2">
                {navLinks.map((l) => (
                  <a key={l.id} href={`/#${l.id}`} className="group w-fit">
                    <Roll>{l.label}</Roll>
                  </a>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <p className="mb-4 text-sm text-white/50">Socials</p>
              <div className="flex flex-col gap-2">
                {socials.map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="group w-fit">
                    <Roll>{s.name}</Roll>
                  </a>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 md:text-right">
              <button
                onClick={() => scrollTo(0, { duration: 2 })}
                className="group inline-flex items-center gap-3"
                aria-label="Back to top"
              >
                <Roll>Back to top</Roll>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:-translate-y-1">
                  <FiArrowUp />
                </span>
              </button>
            </div>
          </div>

          <FadeUp
            y={60}
            className="mt-16 select-none text-center font-serif text-[22vw] italic leading-[0.8] tracking-[-0.04em] text-white/10 md:mt-20"
            aria-hidden
          >
            Reham
          </FadeUp>

          <div className="flex flex-col justify-between gap-2 border-t border-white/10 py-6 text-sm text-white/50 sm:flex-row">
            <span>© {new Date().getFullYear()} Reham. All rights reserved.</span>
            <span>Designed & built by {profile.short}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
