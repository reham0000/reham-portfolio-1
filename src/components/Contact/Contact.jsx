import { useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { FiArrowUpRight, FiCopy, FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import { profile, socials } from "../../data/portfolio";
import { FadeUp, SplitReveal } from "../ui/Reveal";
import { Eyebrow, Roll } from "../ui/Bits";
import Magnetic from "../ui/Magnetic";

const fields = [
  { id: "name", name: "from_name", label: "Your name", type: "text", placeholder: "John Doe" },
  { id: "email", name: "email_from", label: "Your email", type: "email", placeholder: "john@company.com" },
  { id: "subject", name: "subject", label: "Subject", type: "text", placeholder: "Project inquiry" },
];

export default function Contact() {
  const [sending, setSending] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    try {
      await emailjs.sendForm("service_rodcp3i", "template_6d05tir", form, "i6O0spVlutP0oqTfC");
      form.reset();
      toast.success("Message sent — I'll get back to you soon.");
    } catch {
      toast.error("Couldn't send the message. Please email me directly.");
    } finally {
      setSending(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast.success("Email copied to clipboard");
    } catch {
      toast.error("Couldn't copy email");
    }
  };

  const rows = [
    { icon: FiMail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: FiPhone, label: "Phone", value: profile.phone, href: profile.phoneHref },
    { icon: FiMapPin, label: "Location", value: profile.location },
  ];

  return (
    <section id="contact" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 text-center md:mb-16">
          <Eyebrow>Contact</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-4xl text-[clamp(2.5rem,6.5vw,5.5rem)] font-medium leading-[1] tracking-[-0.045em]">
            <SplitReveal text="Have a project in mind? Let's talk." accent={["talk"]} />
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          {/* Details */}
          <FadeUp className="relative flex flex-col justify-between gap-10 overflow-hidden rounded-[1.75rem] bg-accent p-7 text-white md:p-10 lg:col-span-5">
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full border-[40px] border-white/10"
            />
            <div>
              <p className="font-serif text-3xl italic md:text-4xl">Let's build something great together.</p>
              <p className="mt-3 text-white/75">I usually reply within 24 hours.</p>
            </div>

            <div className="relative space-y-5">
              {rows.map((r) => {
                const Icon = r.icon;
                const body = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/15">
                      <Icon />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-white/60">{r.label}</span>
                      <span className="block text-lg">{r.href ? <Roll>{r.value}</Roll> : r.value}</span>
                    </span>
                  </>
                );
                return r.href ? (
                  <a key={r.label} href={r.href} className="group flex items-center gap-4">
                    {body}
                  </a>
                ) : (
                  <div key={r.label} className="flex items-center gap-4">
                    {body}
                  </div>
                );
              })}
            </div>

            <div className="relative flex flex-wrap items-center gap-2">
              <button
                onClick={copyEmail}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-ink"
              >
                <FiCopy />
                <Roll>Copy email</Roll>
              </button>
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <Magnetic key={s.name} strength={0.4}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.name}
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/30 transition-colors duration-300 hover:bg-white hover:text-accent"
                    >
                      <Icon />
                    </a>
                  </Magnetic>
                );
              })}
            </div>
          </FadeUp>

          {/* Form */}
          <FadeUp delay={0.1} className="card p-7 md:p-10 lg:col-span-7">
            <form onSubmit={sendEmail} className="flex h-full flex-col">
              <div className="grid gap-8 md:grid-cols-2">
                {fields.map((f) => (
                  <label
                    key={f.id}
                    htmlFor={f.id}
                    className={`field block border-b border-line ${f.id === "subject" ? "md:col-span-2" : ""}`}
                  >
                    <span className="text-sm text-mute">{f.label}</span>
                    <input
                      id={f.id}
                      name={f.name}
                      type={f.type}
                      required={f.id !== "subject"}
                      placeholder={f.placeholder}
                      className="w-full bg-transparent py-3 text-lg outline-none placeholder:text-ink/25"
                    />
                  </label>
                ))}
                <label htmlFor="message" className="field block border-b border-line md:col-span-2">
                  <span className="text-sm text-mute">Your message</span>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell me about your project..."
                    className="w-full resize-none bg-transparent py-3 text-lg outline-none placeholder:text-ink/25"
                  />
                </label>
              </div>

              <div className="mt-10 flex items-center justify-end">
                <Magnetic strength={0.25}>
                  <button
                    type="submit"
                    disabled={sending}
                    className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-7 pr-2 text-sm font-medium text-white transition-opacity disabled:opacity-60"
                  >
                    <Roll>{sending ? "Sending…" : "Send message"}</Roll>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-accent transition-transform duration-500 group-hover:rotate-45">
                      {sending ? <FiSend /> : <FiArrowUpRight />}
                    </span>
                  </button>
                </Magnetic>
              </div>
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
