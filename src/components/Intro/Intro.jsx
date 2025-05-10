import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import { FiDownload, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { CiFacebook } from "react-icons/ci";

const Intro = () => {
  return (
    <section id="home" className="mb-[100px] pt-[50px] relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 via-white to-green-50/80"></div>
        
        {/* Floating bubbles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0,
              scale: 0
            }}
            animate={{
              x: [null, Math.random() * 100 - 50],
              y: [null, Math.random() * 100 - 50],
              opacity: [0, 0.1, 0],
              scale: [0, Math.random() * 0.8 + 0.2, 0]
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className={`absolute rounded-full ${
              ['bg-green-200/40', 'bg-emerald-200/40', 'bg-lime-200/40'][i % 3]
            }`}
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 py-20">
        {/* Avatar with floating animation */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            rotate: [0, 5, -5, 0],
            y: [0, -15, 0]
          }}
          transition={{ 
            type: "spring", 
            stiffness: 100,
            rotate: {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="mx-auto mb-8 w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden"
        >
          <img 
            src="https://i.ibb.co.com/84d9fyyK/426359487-373526462298705-8369151381072786609-n.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Headline with typewriter effect */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-800"
        >
          Hi, I'm <span className="text-green-600">MD. Al Mobin Sarker Reham</span>
        </motion.h1>

        <div className="h-16 sm:h-20 mb-6">
          <TypeAnimation
            sequence={[
              'MERN Stack Developer',
              1500,
              'Frontend Specialist',
              1500,
              'React Expert',
              1500,
              'JavaScript Developer',
              1500,
              'UI/UX Enthusiast',
              1500,
            ]}
            wrapper="div"
            cursor={true}
            repeat={Infinity}
            className="text-xl sm:text-2xl md:text-3xl text-gray-600"
          />
        </div>

        {/* Animated description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mt-[-30px] mx-auto text-lg sm:text-xl text-gray-600 mb-8"
        >
          I create beautiful, functional, and user-friendly web applications with modern technologies.
          Passionate about crafting digital experiences that make an impact.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.a
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 5px 15px rgba(5, 150, 105, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium flex items-center gap-2 shadow-lg"
          >
            Contact Me
          </motion.a>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/resume.pdf"
            download
            className="px-8 py-3 border-2 border-green-500 text-green-600 rounded-lg font-medium flex items-center gap-2 hover:bg-green-50 transition-colors"
          >
            <FiDownload /> Resume
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex justify-center gap-6"
        >
          <motion.a
            whileHover={{ y: -5, scale: 1.1, color: "#059669" }}
            href="https://github.com/reham0000"
            target="_blank"
            className="text-gray-600 hover:text-green-600"
          >
            <FiGithub size={24} />
          </motion.a>
          <motion.a
            whileHover={{ y: -5, scale: 1.1, color: "#059669" }}
            href="https://www.linkedin.com/in/md-al-mobin-sarker-reham-8b04a8310/"
            target="_blank"
            className="text-gray-600 hover:text-green-600"
          >
            <FiLinkedin size={24} />
          </motion.a>
          <motion.a
            whileHover={{ y: -5, scale: 1.1, color: "#059669" }}
            href="https://www.facebook.com/al.mobin.reham.2025"
            target="_blank"
            className="text-gray-600 hover:text-green-600"
          >
            <CiFacebook size={24} />
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-8 h-8 border-r-2 border-b-2 border-green-400 rotate-45"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Intro;