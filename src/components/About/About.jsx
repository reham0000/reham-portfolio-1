import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Code,
  Cpu,
  Database,
  Server,
  Smartphone,
  Globe,
  Rocket,
  Layers,
  Cog,
  BrainCircuit,
  GraduationCap,
} from "lucide-react";

const About = () => {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [yearsExperience, setYearsExperience] = useState(0);
  const startYear = 2020;

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const experience = currentYear - startYear;

    // Animate the years counter
    let start = 0;
    const end = experience;
    const duration = 2000; // milliseconds
    const increment = end / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setYearsExperience(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const orbitVariants = {
    hidden: { scale: 0 },
    visible: (i) => ({
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    }),
  };

  const techAreas = [
    { icon: <Smartphone size={20} />, name: "Frontend", color: "bg-green-100" },
    { icon: <Server size={20} />, name: "Backend", color: "bg-green-50" },
    { icon: <Database size={20} />, name: "Database", color: "bg-green-100" },
    { icon: <Globe size={20} />, name: "MongoDB", color: "bg-green-50" },
    { icon: <Cog size={20} />, name: "React", color: "bg-green-100" },
    {
      icon: <BrainCircuit size={20} />,
      name: "Tailwind CSS",
      color: "bg-green-50",
    },
  ];

  const projectsCompleted = 24;
  const happyClients = 18;

  return (
    <section
      id="about"
      className="mt-[-150px] relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Beautiful Green/White Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white" />

        {/* Subtle leaf pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzAwMDAwMCIgb3BhY2l0eT0iMC4wNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]" />

        {/* Floating elements */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              x: [null, Math.random() * 50 - 25],
              y: [null, Math.random() * 50 - 25],
              opacity: [0, 0.15, 0],
              scale: [0, Math.random() * 0.8 + 0.2, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-green-200/30"
            style={{
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold mb-4 text-gray-800"
          >
            About <span className="text-green-600">Me</span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-20 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full"
          />
        </motion.div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            {/* Introduction */}
            <motion.div
              variants={itemVariants}
              className="mb-8 p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-green-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="text-green-600" size={24} />
                <h3 className="text-xl font-semibold text-gray-800">
                  Full Stack Developer & CSE Student
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                I specialize in building modern web applications with MERN
                stack.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Bachelor of Science in CSE, Bangladesh University 01/2022 –
                present | Bangladesh CGPA: 3.41 (Out of 4.00)
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Higher Secondary Certificate in Science, Fazilatun nessa mujib
                govt. collage 06/2018 – 03/2020 | Bangladesh GPA: 4.83 (Out of
                5.00)
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Rocket className="text-green-600" size={18} />
                  <span className="text-gray-700">
                    passionate web developer
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="text-green-600" size={18} />
                  <span className="text-gray-700">10+ projects</span>
                </div>
              </div>
            </motion.div>

            {/* Tech Focus */}
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <Cpu className="text-green-600" size={22} />
                Tech Expertise
              </h3>
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
              >
                {techAreas.map((area, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={orbitVariants}
                    whileHover={{ y: -5, scale: 1.05 }}
                    onHoverStart={() => setHoveredTech(index)}
                    onHoverEnd={() => setHoveredTech(null)}
                    className={`p-3 rounded-lg shadow-sm transition-all ${area.color} ${
                      hoveredTech === index ? "ring-2 ring-green-500" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-green-600">{area.icon}</div>
                      <span className="text-gray-700 font-medium">
                        {area.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Call to Action */}
            <motion.div variants={itemVariants}>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium shadow-lg hover:shadow-green-500/30 transition-all"
              >
                Let's Build Something Amazing
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Visual Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 flex justify-center relative"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              {/* Main Circle */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-green-200"
              />

              {/* Core Element */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center shadow-lg">
                <div className="w-3/4 h-3/4 rounded-full bg-white shadow-inner flex items-center justify-center">
                  <Code className="text-green-600" size={48} />
                </div>
              </div>

              {/* Orbiting Tech Icons */}
              {[
                { icon: "⚛", name: "React", color: "bg-black-00" },
                { icon: "λ", name: "Node", color: "bg-green-50" },
                { icon: "{}", name: "JS", color: "bg-green-100" },
                { icon: "</>", name: "HTML", color: "bg-green-50" },
                { icon: "#", name: "CSS", color: "bg-green-100" },
                { icon: "DB", name: "Mongo", color: "bg-green-50" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={orbitVariants}
                  animate={{
                    rotate: [0, 360],
                    x: Math.cos(index * (Math.PI / 3)) * 120,
                    y: Math.sin(index * (Math.PI / 3)) * 120,
                  }}
                  transition={{
                    duration: 20 + index * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                  className={`absolute ${item.color} w-14 h-14 rounded-full flex items-center justify-center shadow-md font-mono text-lg cursor-default border border-green-200`}
                  title={item.name}
                >
                  {item.icon}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
