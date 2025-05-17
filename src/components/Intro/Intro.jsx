import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import { FiDownload, FiGithub, FiLinkedin, FiTwitter, FiCode, FiCpu, FiDatabase } from 'react-icons/fi';
import { CiFacebook } from "react-icons/ci";
import { SiReact, SiJavascript, SiNodedotjs, SiMongodb } from "react-icons/si";

const Intro = () => {
  return (
    <section id="home" className="mb-[100px] pt-[50px] relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Enhanced Animated background elements */}
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

        {/* Floating tech icons */}
        {[
          { icon: <SiReact className="text-2xl text-green-400/40" />, size: 24 },
          { icon: <SiJavascript className="text-2xl text-yellow-400/40" />, size: 24 },
          { icon: <SiNodedotjs className="text-2xl text-green-600/40" />, size: 24 },
          { icon: <SiMongodb className="text-2xl text-green-700/40" />, size: 24 },
          { icon: <FiCode className="text-2xl text-gray-500/40" />, size: 24 },
          { icon: <FiCpu className="text-2xl text-blue-400/40" />, size: 24 },
          { icon: <FiDatabase className="text-2xl text-emerald-500/40" />, size: 24 },
        ].map((tech, i) => (
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
              opacity: [0, 0.3, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: Math.random() * 40 + 40,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${tech.size}px`,
              height: `${tech.size}px`,
            }}
          >
            {tech.icon}
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 py-20">
        {/* Avatar with enhanced floating animation */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            rotate: [0, 5, -5, 0],
            y: [0, -15, 0],
            boxShadow: ["0 5px 15px rgba(0,0,0,0.1)", "0 10px 25px rgba(5, 150, 105, 0.3)", "0 5px 15px rgba(0,0,0,0.1)"]
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
            },
            boxShadow: {
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
          className="mx-auto mb-8 w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-green-400/10 blur-md animate-pulse rounded-full"></div>
          <img 
            src="https://i.ibb.co.com/84d9fyyK/426359487-373526462298705-8369151381072786609-n.jpg"
            alt="Profile"
            className="w-full h-full object-cover relative z-10"
          />
        </motion.div>

        {/* Headline with enhanced typewriter effect */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-800"
        >
          Hi, I'm <motion.span 
            className="text-green-600 inline-block"
            animate={{
              scale: [1, 1.05, 1],
              textShadow: ["0 0 0px rgba(5, 150, 105, 0)", "0 0 10px rgba(5, 150, 105, 0.3)", "0 0 0px rgba(5, 150, 105, 0)"]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            MD. Al Mobin Sarker Reham
          </motion.span>
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
            className="text-xl sm:text-2xl md:text-3xl text-gray-600 font-medium"
          />
        </div>

        {/* Animated description with floating underline */}
        <motion.div className="max-w-2xl mt-[-30px] mx-auto mb-8 relative">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl mt-[-50px] text-gray-600"
          >
            I create beautiful, functional, and user-friendly web applications with modern technologies.
            Passionate about crafting digital experiences that make an impact.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="h-0.5 bg-gradient-to-r from-green-400/0 via-green-400 to-green-400/0 mt-2"
            style={{ originX: 0 }}
          />
        </motion.div>

        {/* Enhanced CTA Buttons with pulse effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap mt-[-10px] justify-center gap-4 mb-12"
        >
          <motion.a
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 5px 20px rgba(5, 150, 105, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="px-8 py-3  bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium flex items-center gap-2 shadow-lg relative overflow-hidden"
          >
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 0, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -inset-1  bg-white/30 rounded-full"
            />
            Contact Me
          </motion.a>
          
          <motion.a
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(5, 150, 105, 0.05)"
            }}
            whileTap={{ scale: 0.95 }}
            href="https://drive.google.com/file/d/1SjGO3mcbkfavmw1kRWJ7nK3B0HxlF2ri/view?usp=sharing"
            target="_blank"
            download
            className="px-8 py-3 border-2 border-green-500 text-green-600 rounded-lg font-medium flex items-center gap-2 transition-colors relative"
          >
            <motion.span
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <FiDownload />
            </motion.span>
            Resume
          </motion.a>
        </motion.div>

        {/* Enhanced Social Links with floating animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex justify-center mt-[-20px] gap-6"
        >
          {[
            { icon: <FiGithub size={24} />, url: "https://github.com/reham0000", color: "#059669" },
            { icon: <FiLinkedin size={24} />, url: "https://www.linkedin.com/in/md-al-mobin-sarker-reham-8b04a8310/", color: "#059669" },
            { icon: <CiFacebook size={24} />, url: "https://www.facebook.com/al.mobin.reham.2025", color: "#059669" }
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.url}
              target="_blank"
              className="text-gray-600 hover:text-green-600 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-sm"
              whileHover={{ 
                y: -5, 
                scale: 1.1, 
                color: social.color,
                boxShadow: `0 5px 15px ${social.color}40`
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Enhanced Scroll indicator with bouncing animation */}
        <motion.div
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <div className="w-8 h-8 border-r-2 border-b-2 border-green-400 rotate-45 mb-1"></div>
          <motion.div
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-xs text-gray-500"
          >
            Scroll
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Intro;