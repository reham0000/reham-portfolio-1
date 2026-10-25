import {
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiTailwindcss,
  SiFigma,
  SiGit,
  SiNextdotjs,
  SiMongodb,
  SiExpress,
  SiFirebase,
  SiDocker,
  SiNginx,
} from "react-icons/si";
import photoAbout from "../assets/profile-about.jpg";
import { FiGithub, FiLinkedin, FiFacebook, FiServer, FiGlobe, FiUploadCloud, FiLayout, FiDatabase } from "react-icons/fi";

export const profile = {
  name: "MD. Al Mobin Sarker Reham",
  first: "Al Mobin",
  last: "Sarker Reham",
  short: "Reham",
  roles: [
    "MERN Stack Developer",
    "Next.js Developer",
    "Frontend Specialist",
    "React Expert",
    "JavaScript Developer",
    "UI/UX Enthusiast",
  ],
  intro:
    "I build fast, modern web applications with React, Next.js and TypeScript — and take them all the way to production on my own VPS and custom domains.",
  about:
    "I'm a MERN stack developer and Computer Science student who builds web applications end to end — from clean, responsive interfaces in React and Next.js to the APIs and databases behind them, deployed on servers I set up myself.",
  email: "amsarkerreham@gmail.com",
  phone: "01904617354",
  phoneHref: "tel:+8801904617354",
  location: "Mohammad Pur, Dhaka-1207",
  city: "Dhaka, Bangladesh",
  resume:
    "https://drive.google.com/file/d/1SjGO3mcbkfavmw1kRWJ7nK3B0HxlF2ri/view?usp=sharing",
  photoHero:
    "https://i.ibb.co.com/84d9fyyK/426359487-373526462298705-8369151381072786609-n.jpg",
  photoAbout,
};

export const socials = [
  { name: "GitHub", url: "https://github.com/reham0000", icon: FiGithub },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/md-al-mobin-sarker-reham-8b04a8310/",
    icon: FiLinkedin,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/al.mobin.reham.2025",
    icon: FiFacebook,
  },
];

export const education = [
  {
    period: "01/2022 — Present",
    degree: "B.Sc. in Computer Science & Engineering",
    school: "Bangladesh University",
    grade: "CGPA 3.51 / 4.00",
  },
  {
    period: "06/2018 — 03/2020",
    degree: "Higher Secondary Certificate, Science",
    school: "Fazilatun Nessa Mujib Govt. College",
    grade: "GPA 4.83 / 5.00",
  },
];

export const focusAreas = [
  "Frontend",
  "Backend",
  "Database",
  "Next.js",
  "VPS & Hosting",
  "Domains",
];

export const skillGroups = [
  {
    title: "Frontend",
    icon: FiLayout,
    skills: [
      { name: "React", icon: SiReact, level: 90 },
      { name: "Next.js", icon: SiNextdotjs, level: 80 },
      { name: "TypeScript", icon: SiTypescript, level: 70 },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: 95 },
      { name: "Figma", icon: SiFigma, level: 75 },
    ],
  },
  {
    title: "Backend & Database",
    icon: FiDatabase,
    skills: [
      { name: "Node.js", icon: SiNodedotjs, level: 45 },
      { name: "Express", icon: SiExpress, level: 50 },
      { name: "MongoDB", icon: SiMongodb, level: 50 },
      { name: "Firebase", icon: SiFirebase, level: 80 },
    ],
  },
  {
    title: "DevOps & Hosting",
    icon: FiServer,
    skills: [
      { name: "VPS Setup", icon: FiServer, level: 60 },
      { name: "Domain & DNS", icon: FiGlobe, level: 60 },
      { name: "Hosting & Deployment", icon: FiUploadCloud, level: 60 },
      { name: "Docker", icon: SiDocker, level: 50 },
      { name: "Nginx", icon: SiNginx, level: 50 },
      { name: "Git", icon: SiGit, level: 85 },
    ],
  },
];

export const skills = skillGroups.flatMap((g) => g.skills);

export const familiar = [
  "HTML5 / CSS3",
  "JavaScript",
  "ES6+",
  "React Testing",
  "JWT Auth",
  "VS Code",
  "GitHub",
  "ImgBB",
  "Pixso",
];

export const projects = [
  {
    id: 1,
    title: "BU News Desk",
    description: "A newspaper website where people can read the latest world news by category.",
    tags: ["React", "Node.js", "Firebase"],
    link: "https://bu-news-desk.web.app/category/01",
    github: "https://github.com/reham0000/dragon-news",
    image:
      "https://i.ibb.co.com/pj3WPC54/Whats-App-Image-2025-05-11-at-13-31-15-8776e00e.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Job Portal",
    description: "A job board where people can find jobs and admins can publish new openings.",
    tags: ["React", "Firebase", "MongoDB"],
    link: "https://job-portal-6aada.web.app/",
    github: "https://github.com/reham0000/job-portal-client1",
    image:
      "https://i.ibb.co.com/23p2FkVJ/Whats-App-Image-2025-05-11-at-13-39-50-0ff5c6fe.jpg",
    featured: true,
  },
  {
    id: 3,
    title: "Restaurant Management",
    description: "A complete restaurant management website where people can browse and order food.",
    tags: ["React", "Firebase", "MongoDB"],
    link: "https://tasty-treat-11525.web.app/",
    github: "https://github.com/reham0000/restaurant-management",
    image:
      "https://i.ibb.co.com/jXfYXdQ/Whats-App-Image-2025-05-11-at-13-44-36-6978b001.jpg",
    featured: true,
  },
  {
    id: 4,
    title: "CrowdCube",
    description: "A crowdfunding platform where people support each other with funds and business ideas.",
    tags: ["React", "Firebase", "MongoDB"],
    link: "https://crowd-funding-936c0.web.app/",
    github: "https://github.com/reham0000/crowd-funding-client",
    image:
      "https://i.ibb.co.com/hFQcxJkD/Whats-App-Image-2025-05-11-at-13-48-45-ef99e2c4.jpg",
  },
  {
    id: 5,
    title: "Winter Donation",
    description: "A donation website where people can give winter clothes to those in need.",
    tags: ["React", "Firebase", "MongoDB"],
    link: "https://winter-clothing-project.web.app/",
    github: "https://github.com/reham0000/winter-donation",
    image:
      "https://i.ibb.co.com/sJJyTsHZ/Whats-App-Image-2025-05-11-at-13-52-54-2f4e5e5b.jpg",
  },
  {
    id: 6,
    title: "Gadget Heaven",
    description: "An accessories e-commerce site where people can buy gadgets online.",
    tags: ["React", "Firebase", "MongoDB"],
    link: "https://vocal-pixie-b008dc.netlify.app/",
    github: "https://github.com/reham0000/gadget-heaven",
    image:
      "https://i.ibb.co.com/FqjKgSVK/Whats-App-Image-2025-05-11-at-13-58-26-ecaa48d2.jpg",
  },
  {
    id: 7,
    title: "Reham's Portfolio",
    description: "This portfolio — everything about me, my skills and my work in one place.",
    tags: ["React", "Tailwind", "Framer Motion"],
    link: "https://reham-portfolio-1.vercel.app/",
    github: "https://github.com/reham0000/reham-portfolio-1",
    image:
      "https://i.ibb.co.com/tTDNF4rM/Whats-App-Image-2025-05-11-at-14-13-18-9dff19ec.jpg",
  },
];

export const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Work", id: "projects" },
  { label: "Contact", id: "contact" },
];
