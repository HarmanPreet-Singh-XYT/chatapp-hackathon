import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, GitBranch, Terminal, Cloud, 
  ArrowRight, CheckCircle, Award, Zap,
  CloudUpload,
  Database,
  MessageCircle,
  PhoneCall,
  Settings,
  ShieldCheck,
  Sliders,
  Users
} from 'lucide-react';

const WorksSection = () => {
  const [hoveredStep, setHoveredStep] = useState(null);

  const processSteps = [
    {
      icon: MessageCircle,
      title: "Secure Messaging",
      headline: "Private & Encrypted",
      description: "End-to-end encryption ensures messages stay private and secure.",
      color: "blue",
      badgeIcon: ShieldCheck
    },
    {
      icon: Users,
      title: "Seamless Connectivity",
      headline: "Stay Connected",
      description: "Instant messaging, voice, and video calls keep you in touch anywhere.",
      color: "green",
      badgeIcon: PhoneCall
    },
    {
      icon: Database,
      title: "Cloud Backups",
      headline: "Never Lose a Chat",
      description: "Automatically back up chats and media securely to the cloud.",
      color: "purple",
      badgeIcon: CloudUpload
    },
    {
      icon: Settings,
      title: "Customizable Experience",
      headline: "Tailor Your Chats",
      description: "Privacy settings, themes, and chat customization for personal touch.",
      color: "yellow",
      badgeIcon: Sliders
    }
];


  return (
    <section className="relative py-16 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Layered Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-noise opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
        <h2 className="
          text-4xl 
          font-bold 
          mb-4
          bg-clip-text 
          text-transparent 
          bg-gradient-to-r 
          from-green-400 
          via-blue-500 
          to-teal-500
        ">
          Chat. Connect. Communicate.
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Experience secure, seamless, and feature-rich messaging designed for personal and business 
          conversations—where privacy meets simplicity.
        </p>
      </div>


        {/* Process Steps Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.2,
                duration: 0.5
              }}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
              className={`
                relative 
                bg-white/10 
                backdrop-blur-md 
                border 
                border-white/20 
                rounded-2xl 
                p-6 
                overflow-hidden 
                shadow-2xl 
                transition-all 
                duration-300 
                hover:scale-105
                group
              `}
            >
              {/* Top Accent Bar */}
              <div 
                className={`
                  absolute 
                  top-0 
                  left-0 
                  w-full 
                  h-1 
                  bg-${step.color}-500 
                  transition-all 
                  duration-300 
                  group-hover:h-2
                `}
              />

              {/* Icon */}
              <div 
                className={`
                  mb-4 
                  text-${step.color}-400 
                  bg-${step.color}-500/10 
                  p-3 
                  rounded-full 
                  inline-block 
                  transition-transform 
                  group-hover:scale-110
                `}
              >
                <step.icon className="w-8 h-8 stroke-[1.5]" />
              </div>

              {/* Step Number */}
              <div 
                className={`
                  absolute 
                  top-4 
                  right-4 
                  text-3xl 
                  font-bold 
                  text-${step.color}-500
                  opacity-30
                `}
              >
                0{index + 1}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                {step.description}
              </p>

              {/* Hover State */}
              {hoveredStep === index && (
                <div 
                  className="
                    absolute 
                    bottom-0 
                    left-0 
                    right-0 
                    bg-white/10 
                    backdrop-blur-md
                    border-t 
                    border-white/20 
                    p-4 
                    flex 
                    items-center 
                    justify-between
                  "
                >
                  <div 
                    className={`
                      p-2 
                      rounded-full 
                      bg-${step.color}-500/10 
                      text-${step.color}-400
                    `}
                  >
                    <step.badgeIcon className="w-5 h-5" />
                  </div>
                  <div 
                    className={`
                      text-sm 
                      font-medium 
                      text-${step.color}-400 
                      flex 
                      items-center
                      hover:text-white
                      transition-colors
                    `}
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorksSection;