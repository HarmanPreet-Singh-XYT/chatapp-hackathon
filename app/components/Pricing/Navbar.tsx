import React, { useState, useEffect } from 'react'
import { 
  Sparkles, 
  Menu, 
  X, 
  ChevronDown, 
  Zap,
  Shield,
  Code
} from 'lucide-react'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  const navLinks = [
    {
      name: "Home",
      href: "/"
    },
    {
      name: "Pricing",
      href: "/pricing"
    },
    { 
      name: "Contact", 
      href: "/contact" 
    }
  ]

  return (
    <>
      <nav 
        className="
          fixed top-0 left-0 right-0 
          z-50 
          transition-all duration-300
          bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100
        "
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between relative">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <Sparkles 
                className="
                  w-9 h-9 
                  text-indigo-600
                  transition-colors duration-300
                  animate-pulse
                " 
              />
              <span 
                className="
                  font-bold text-2xl 
                  text-gray-900
                  transition-colors duration-300
                "
              >
                FluChat
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 group">
              {navLinks.map((link, index) => (
                <div 
                  key={index} 
                  className="relative group"
                >
                  <a 
                    href={link.href} 
                    className="
                      flex items-center 
                      text-gray-700 hover:text-indigo-600
                      transition-colors duration-300
                      group-hover:opacity-70
                    "
                  >
                    {link.name}
                  </a>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <a 
                href="/auth" 
                className="
                  text-gray-700 hover:text-indigo-600
                  transition-colors duration-300
                "
              >
                Sign in
              </a>
              <a 
                href="/auth" 
                className="
                  bg-gradient-to-r from-green-500 to-blue-600
                  text-white 
                  px-7 py-3 
                  rounded-full 
                  hover:shadow-xl 
                  hover:shadow-indigo-500/30 
                  transition-all 
                  duration-300 
                  transform 
                  hover:scale-105
                "
              >
                Start Free Trial
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-900 transition-colors duration-300"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Moved outside of nav element */}
      {isMobileMenuOpen && (
        <div 
          className="
            md:hidden 
            fixed 
            inset-0 
            bg-gray-900 
            z-40
            pt-20 
            px-6 
            overflow-y-auto
          "
        >
          <div className="space-y-6">
            {navLinks.map((link, index) => (
              <div key={index} className="border-b border-gray-800 pb-4">
                <a 
                  href={link.href} 
                  className="
                    text-white 
                    text-2xl 
                    font-semibold 
                    flex 
                    items-center 
                    justify-between
                  "
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </div>
            ))}
            <div className="pt-6 space-y-4">
              <a 
                href="/auth" 
                className="
                  block 
                  text-center 
                  text-white 
                  text-xl 
                  py-4 
                  border 
                  border-white/20 
                  rounded-full
                "
              >
                Sign In
              </a>
              <a 
                href="/auth" 
                className="
                  block 
                  text-center 
                  bg-gradient-to-r 
                  from-indigo-600 
                  to-purple-600 
                  text-white 
                  text-xl 
                  py-4 
                  rounded-full
                "
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar