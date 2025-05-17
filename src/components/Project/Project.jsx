import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiFolder } from "react-icons/fi";
import { Link } from "react-router-dom";

const Project = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const projects = [
    {
      id: 1,
      title: "BU News Desk",
      description: "A news paper website. Where people can read the world news",
      tags: ["React", "Node.js", "Firebase"],
      link: "https://bu-news-desk.web.app/category/01",
      github: "https://github.com/reham0000/dragon-news",
      image: "https://i.ibb.co.com/pj3WPC54/Whats-App-Image-2025-05-11-at-13-31-15-8776e00e.jpg",
    },
    {
      id: 2,
      title: "Job Portal",
      description: "A website where people can find jobs and admin can upload new jobs",
      tags: ["React", "Firebase","MongoDB"],
      link: "https://job-portal-6aada.web.app/",
      github: "https://github.com/reham0000/job-portal-client1",
      image: "https://i.ibb.co.com/23p2FkVJ/Whats-App-Image-2025-05-11-at-13-39-50-0ff5c6fe.jpg",
    },
    {
      id: 3,
      title: "Restaurant Management",
      description: "A Proper restaurant-management Website. Where people can order food.",
      tags: ["React", "Firebase","MongoDB"],
      link: "https://tasty-treat-11525.web.app/",
      github: "https://github.com/reham0000/restaurant-management",
      image: "https://i.ibb.co.com/jXfYXdQ/Whats-App-Image-2025-05-11-at-13-44-36-6978b001.jpg",
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      <section
        id="projects"
        className=" relative py-20 overflow-hidden bg-gradient-to-b from-white to-emerald-50"
      >
        {/* Animated background elements */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 w-64 h-64 rounded-full bg-emerald-100 opacity-20 blur-xl"
        />

        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-emerald-50 opacity-20 blur-xl"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              My <span className="text-emerald-600">Projects</span>
            </h2>
            <p className="text-lg font-semibold text-gray-600 max-w-2xl mx-auto">
              Here are some of my recent works and case studies
            </p>
          </motion.div>

          {/* Projects grid */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={item}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(5, 150, 105, 0.1)",
                }}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-all duration-300"
              >
                {/* Project image */}
                <motion.div
                  animate={{
                    scale: hoveredCard === project.id ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-48 overflow-hidden relative"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                </motion.div>

                {/* Project content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <FiFolder className="text-3xl text-emerald-500" />
                    <div className="flex gap-3">
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-emerald-600 transition-colors"
                        aria-label="GitHub"
                      >
                        <FiGithub className="text-xl" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-emerald-600 transition-colors"
                        aria-label="Live Demo"
                      >
                        <FiExternalLink className="text-xl" />
                      </motion.a>
                    </div>
                  </div>

                  <motion.h3
                    animate={{
                      color: hoveredCard === project.id ? "#059669" : "#111827",
                    }}
                    className="text-xl font-bold mb-2 transition-colors duration-300"
                  >
                    {project.title}
                  </motion.h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <motion.span
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
           <div className="mt-16 flex justify-center items-center">
          <a href="/viewMore">
            <button className="btn btn-success font-bold">
              View All Projects
            </button>
          </a>
        </div>
        </div>
       
      </section>
    </>
  );
};

export default Project;
