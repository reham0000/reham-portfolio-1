import { motion } from "framer-motion";
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
  SiFirebase
} from "react-icons/si";

const Skill = () => {
  const skills = [
    { name: "React", icon: <SiReact />, level: 90, color: "#61DAFB" },
    { name: "Node.js", icon: <SiNodedotjs />, level: 45, color: "#339933" },
    { name: "TypeScript", icon: <SiTypescript />, level: 10, color: "#3178C6" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, level: 95, color: "#06B6D4" },
    { name: "Figma", icon: <SiFigma />, level: 75, color: "#F24E1E" },
    { name: "Git", icon: <SiGit />, level: 85, color: "#F05032" },
    { name: "Next.js", icon: <SiNextdotjs />, level: 20, color: "#000000" },
    { name: "MongoDB", icon: <SiMongodb />, level: 50, color: "#47A248" },
    { name: "Express", icon: <SiExpress />, level: 50, color: "#000000" },
    { name: "Firebase", icon: <SiFirebase />, level: 80, color: "#FFCA28" }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Enhanced Green & White Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Layered gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-50"></div>
        
        {/* Organic green shapes */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-green-200/40 blur-3xl"></div>
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-green-300/30 blur-3xl"></div>
          <div className="absolute right-1/4 top-1/3 w-64 h-64 rounded-full bg-green-100/50 blur-2xl"></div>
        </div>

        {/* Floating tech icons */}
        {['🌱', '💻', '🚀', '🔌', '🖥️', '📱', '🌐', '📊', '🔧', '🎨'].map((icon, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0,
              rotate: Math.random() * 360
            }}
            animate={{
              x: [null, Math.random() * 100 - 50],
              y: [null, Math.random() * 100 - 50],
              opacity: [0, 0.4, 0],
              rotate: [0, Math.random() * 360]
            }}
            transition={{
              duration: Math.random() * 30 + 30,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="absolute text-2xl text-green-300/50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {icon}
          </motion.div>
        ))}

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            My <span className="text-green-600">Skills</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full"
          />
          <p className="text-gray-600 text-lg font-semibold max-w-2xl mx-auto mt-4">
            The skills I've developed by working on projects and gaining practical experience
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(5, 150, 105, 0.15)"
              }}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center border border-gray-100 shadow-sm hover:border-green-100 transition-all"
            >
              <div className="text-4xl mb-4" style={{ color: skill.color }}>
                {skill.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                {skill.name}
              </h3>

              {/* Progress bar */}
              <div className="w-full bg-gray-100 rounded-full h-2.5 mb-1 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ 
                    duration: 1, 
                    delay: index * 0.1,
                    type: "spring",
                    damping: 10
                  }}
                  viewport={{ once: true }}
                  className="h-2.5 rounded-full"
                  style={{ 
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}90)`
                  }}
                />
              </div>
              <span className="text-sm font-medium text-green-600">
                {skill.level}%
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Also experienced with section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-xl font-semibold text-center text-gray-800 mb-6">
            Also Familiar with
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {[
              "HTML5/CSS3",
              "Java Script",
              "React Testing",
              "VS Code",
              "GitHub",
              "ES6",
              "Image BB",
              "Pixso",
              "JWT Token",
              "Type Script"
            ].map((skill, index) => (
              <motion.span
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: index * 0.05,
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -3,
                  backgroundColor: "#059669",
                  color: "white"
                }}
                className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 border border-gray-200 shadow-sm cursor-default transition-colors"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skill;