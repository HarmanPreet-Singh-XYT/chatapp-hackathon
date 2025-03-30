import React, { useState } from 'react'
import { 
  Sparkles, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  Zap 
} from 'lucide-react'

const Footer = () => {
  const [activeSection, setActiveSection] = useState(null)

  const socialLinks = [
    { 
      icon: Twitter, 
      href: "#", 
      label: "Twitter",
      colorClass: "bg-[#1DA1F2] text-white hover:bg-opacity-80"
    },
    { 
      icon: Github, 
      href: "#", 
      label: "GitHub",
      colorClass: "bg-gray-900 text-white hover:bg-opacity-80"
    },
    { 
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/harman-developer/", 
      label: "LinkedIn",
      colorClass: "bg-[#0A66C2] text-white hover:bg-opacity-80"
    },
    { 
      icon: Mail, 
      href: "#", 
      label: "Contact",
      colorClass: "bg-red-500 text-white hover:bg-opacity-80"
    }
  ]

  const footerSections = [
    {
      title: "Product",
      icon: Zap,
      links: [
        { name: "Features", description: "Explore our cutting-edge capabilities",link:'#' },
        { name: "Enterprise", description: "Solutions for large-scale operations",link:'#' },
        { name: "Security", description: "Robust protection for your data",link:'#' },
        { name: "Pricing", description: "Transparent and flexible plans",link:'/pricing' },
        { name: "Demo", description: "Experience FluChat in action",link:'/auth' }
      ]
    },
    {
      title: "Resources",
      icon: MapPin,
      links: [
        { name: "Documentation", description: "Comprehensive guides and references",link:'#' },
        { name: "API Reference", description: "Detailed technical documentation",link:'#' },
        { name: "Guides", description: "Step-by-step tutorials",link:'#' },
        { name: "Status", description: "Real-time system performance",link:'#' },
        { name: "Blog", description: "Insights and industry trends",link:'#' }
      ]
    },
    {
      title: "Company",
      icon: Sparkles,
      links: [
        { name: "About", description: "Our mission and vision",link:'#' },
        { name: "Customers", description: "Success stories and testimonials",link:'#' },
        { name: "Careers", description: "Join our innovative team",link:'#' },
        { name: "Contact", description: "Get in touch with us",link:'/contact' },
        { name: "Partners", description: "Collaborative ecosystem",link:'#' }
      ]
    }
  ]

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-20 pb-8 px-6 overflow-hidden">
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-20 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Grid Container */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Sparkles className="w-12 h-12 text-indigo-400 animate-spin-slow" />
              <span className="font-bold text-3xl text-white tracking-tighter">
                FluChat
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed text-opacity-90 text-lg">
              Transforming enterprise software with AI-powered innovation and forward-thinking solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  className={`
                    ${social.colorClass} 
                    p-3 rounded-full transition-all duration-300 
                    transform hover:scale-110 hover:rotate-6 
                    shadow-lg hover:shadow-xl
                  `}
                  aria-label={social.label}
                >
                  <social.icon className="w-7 h-7" />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Sections with Enhanced Interaction */}
          {footerSections.map((section, i) => (
            <div 
              key={i} 
              className="space-y-6 group"
              onMouseEnter={() => setActiveSection(i)}
              onMouseLeave={() => setActiveSection(null)}
            >
              <div className="flex items-center space-x-3 border-b border-gray-700 pb-3">
                <section.icon 
                  className={`
                    w-8 h-8 
                    ${activeSection === i ? 'text-indigo-400' : 'text-gray-500'}
                    transition-colors duration-300
                  `}
                />
                <h3 className="font-semibold text-2xl text-white tracking-tight">
                  {section.title}
                </h3>
              </div>
              <ul className="space-y-4">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a 
                      href={link.link}
                      className="
                        block 
                        transform transition-all duration-300 
                        hover:translate-x-3 
                        group-hover:opacity-50 
                        hover:!opacity-100
                      "
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-200 font-medium">{link.name}</span>
                        <div 
                          className="
                            opacity-0 group-hover:opacity-100 
                            text-xs text-indigo-300 
                            transition-opacity duration-300
                          "
                        >
                          {link.description}
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom with Advanced Design */}
        <div className="
          border-t border-gray-700 
          pt-8 
          flex 
          justify-between 
          items-center 
          text-gray-400
        ">
          <p className="text-sm tracking-wide">
            © {new Date().getFullYear()} FluChat. All rights reserved.
          </p>
          <div className="flex space-x-4 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="
        absolute 
        -top-20 
        -right-20 
        w-96 
        h-96 
        bg-indigo-500/20 
        rounded-full 
        blur-3xl
      "></div>
    </footer>
  )
}

export default Footer