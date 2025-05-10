import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { CiFacebook } from 'react-icons/ci';

const Contact = () => {

     const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };


    return (
         <section id="contact" className=" relative py-20 overflow-hidden bg-gradient-to-b from-white to-emerald-50">
      {/* Animated background elements */}
      <motion.div 
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-100 opacity-20 blur-xl"
      />
      
      <motion.div 
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald-50 opacity-20 blur-xl"
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
            Get <span className="text-emerald-600">In Touch</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let's connect!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact information */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div 
              variants={item}
              whileHover={{ x: 5 }}
              className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
                <FiMail className="text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Email Me</h3>
                <a 
                  href="mailto:hello@example.com" 
                  className="text-emerald-600 hover:text-emerald-800 transition-colors"
                >
                  amsarkerreham@gmail.com
                </a>
              </div>
            </motion.div>

            <motion.div 
              variants={item}
              whileHover={{ x: 5 }}
              className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
                <FiPhone className="text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Call Me</h3>
                <a 
                  href="tel:+1234567890" 
                  className="text-emerald-600 hover:text-emerald-800 transition-colors"
                >
                  01904617354
                </a>
              </div>
            </motion.div>

            <motion.div 
              variants={item}
              whileHover={{ x: 5 }}
              className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
                <FiMapPin className="text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Location</h3>
                <p className="text-gray-600">Mohammad Pur, Dhaka-1207</p>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div 
              variants={item}
              className="flex gap-4 justify-center lg:justify-start"
            >
              <motion.a
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/reham0000" 
                target="_blank"
                className="p-3 bg-white rounded-full shadow-sm border border-gray-100 text-gray-700 hover:text-emerald-600 transition-colors"
              >
                <FaGithub className="text-xl" />
              </motion.a>
              <motion.a
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/md-al-mobin-sarker-reham-8b04a8310/" 
                target="_blank"
                className="p-3 bg-white rounded-full shadow-sm border border-gray-100 text-gray-700 hover:text-emerald-600 transition-colors"
              >
                <FaLinkedin className="text-xl" />
              </motion.a>
              <motion.a
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.facebook.com/al.mobin.reham.2025" 
                target="_blank"
                className="p-3 bg-white rounded-full shadow-sm border border-gray-100 text-gray-700 hover:text-emerald-600 transition-colors"
              >
                <CiFacebook className="text-xl" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send Me a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block  text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 text-black py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="Subject"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Send Message <FiSend className="text-lg" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
    );
};

export default Contact;