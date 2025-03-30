import React, { useState } from 'react'
import { 
  Rocket, 
  ArrowRight, 
  PlayCircle, 
  Shield, 
  CheckCircle,
  Code,
  Zap,
  MessageCircle,
  X
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  
  // YouTube video ID - change this to your desired video
  const youtubeVideoId = "dQw4w9WgXcQ" // Example: Rick Astley - Never Gonna Give You Up

  const customerLogos = [
    { id: 1, alt: "Tech Company", link:'https://mir-s3-cdn-cf.behance.net/project_modules/1400/35af6a41332353.57a1ce913e889.jpg' },
    { id: 2, alt: "Startup", link:'https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww' },
    { id: 3, alt: "Enterprise", link:'https://images.unsplash.com/photo-1463453091185-61582044d556?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww' },
    { id: 4, alt: "Innovator", link:'https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg' }
  ]

  // Stagger children animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  }

  const logoContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1.2
      }
    }
  }

  const logoItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200
      }
    }
  }

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  }

  return (
    <>
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        {/* Layered Background Effects */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <motion.div 
            className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.05, 1], 
              opacity: [0.5, 0.8, 0.5] 
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          ></motion.div>
          <motion.div 
            className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.1, 1], 
              opacity: [0.6, 0.9, 0.6] 
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1
            }}
          ></motion.div>
          <div className="absolute inset-0 bg-noise opacity-10"></div>
        </motion.div>

        {/* Main Content Container */}
        <motion.div 
          className="max-w-7xl mx-auto relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Section */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            {/* Announcement Chip */}
            <motion.div 
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 hover:bg-white/20 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <MessageCircle className="w-5 h-5 text-green-400 mr-2 animate-pulse" />
              <span className="text-sm font-medium text-white">
                New: Secure & Smart Messaging for Teams
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              className="text-6xl md:text-7xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-indigo-500 animate-gradient-x"
              variants={itemVariants}
            >
              Connect, Chat, and Collaborate Seamlessly
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              className="text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Experience the future of messaging with end-to-end encryption, real-time sync across devices, 
              and AI-powered chat features designed for personal and business communication.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
              variants={itemVariants}
            >
              <motion.a 
                className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-600 text-white px-10 py-4 rounded-full transition-all duration-300 shadow-2xl hover:shadow-indigo-500/50 flex items-center group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                href='/auth'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Start 14-Day Free Trial
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowRight className="ml-3" />
                </motion.div>
              </motion.a>
              <motion.button 
                className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full hover:bg-white/20 transition-all duration-300 flex items-center group"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowVideoModal(true)}
              >
                <PlayCircle className="w-5 h-5 mr-3 group-hover:text-indigo-400 transition-colors" />
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8"
              variants={itemVariants}
            >
              <motion.div 
                className="flex -space-x-3"
                variants={logoContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {customerLogos.map((logo, index) => (
                  <motion.div 
                    key={logo.id} 
                    className="w-10 h-10 bg-white rounded-full border-2 border-gray-800 flex items-center justify-center text-xs font-bold shadow-lg overflow-hidden"
                    style={{ zIndex: customerLogos.length - index }}
                    variants={logoItemVariants}
                    whileHover={{ y: -5, scale: 1.1, zIndex: 50 }}
                  >
                    {logo.alt.charAt(0)}
                    <img src={logo.link} className='w-full h-full' />
                  </motion.div>
                ))}
              </motion.div>
              <motion.div 
                className="text-sm text-gray-400 flex items-center"
                variants={itemVariants}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                <span className="mr-2 font-semibold text-white">4.9/5</span>
                from 2,000+ reviews
              </motion.div>
            </motion.div>
          </div>

          {/* Dashboard Image Section */}
          <motion.div 
            className="relative group overflow-hidden rounded-3xl shadow-2xl hover:shadow-indigo-500/30 transition-all duration-500"
            variants={itemVariants}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.img 
              src="/dashboard.png" 
              alt="Chat Dashboard"
              className="w-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* YouTube Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <>
            {/* Backdrop */}
            <motion.div 
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setShowVideoModal(false)}
            />
            
            {/* Modal */}
            <motion.div 
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="relative bg-gray-900 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                  <h3 className="text-xl font-semibold text-white">Product Demo Video</h3>
                  <button 
                    className="text-gray-400 hover:text-white focus:outline-none"
                    onClick={() => setShowVideoModal(false)}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                {/* YouTube Video Player */}
                <div className="relative w-full pt-[56.25%]">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                
                {/* Modal Footer */}
                <div className="p-4 bg-gray-800/50">
                  <p className="text-gray-300 text-sm">
                    See how our platform enables seamless communication across teams with powerful AI features and military-grade encryption.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Hero