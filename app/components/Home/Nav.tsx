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

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    // { 
    //   name: "Solutions", 
    //   href: "#features",
    //   icon: Zap,
    //   dropdown: [
    //     { name: "Enterprise Development", description: "Scalable solutions for large teams" },
    //     { name: "AI Integration", description: "Intelligent development tools" },
    //     { name: "Cloud Deployment", description: "Seamless infrastructure management" }
    //   ]
    // },
    // { 
    //   name: "How It Works", 
    //   href: "#process",
    //   icon: Code,
    //   dropdown: [
    //     { name: "Development Workflow", description: "Streamlined project management" },
    //     { name: "Collaboration Tools", description: "Enhanced team productivity" },
    //     { name: "Continuous Integration", description: "Automated deployment pipelines" }
    //   ]
    // },
    // { 
    //   name: "Pricing", 
    //   href: "#pricing",
    //   icon: Shield,
    //   dropdown: [
    //     { name: "Startup Plan", description: "Perfect for growing teams" },
    //     { name: "Enterprise Plan", description: "Comprehensive features" },
    //     { name: "Custom Solutions", description: "Tailored to your needs" }
    //   ]
    // },
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
    <nav 
      className={`
        fixed top-0 left-0 right-0 
        z-50 
        transition-all duration-300
        ${isScrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100' 
          : 'bg-transparent'}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between relative">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <Sparkles 
              className={`
                w-9 h-9 
                ${isScrolled ? 'text-indigo-600' : 'text-white'}
                transition-colors duration-300
                animate-pulse
              `} 
            />
            <span 
              className={`
                font-bold text-2xl 
                ${isScrolled ? 'text-gray-900' : 'text-white'}
                transition-colors duration-300
              `}
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
                // onMouseEnter={() => setActiveDropdown(link.dropdown ? index : null)}
                // onMouseLeave={() => setActiveDropdown(null)}
              >
                <a 
                  href={link.href} 
                  className={`
                    flex items-center 
                    ${isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-indigo-200'}
                    transition-colors duration-300
                    group-hover:opacity-70
                    ${activeDropdown === index ? 'opacity-100 text-indigo-600' : ''}
                  `}
                >
                  {link.name}
                  {/* {link.dropdown && (
                    <ChevronDown 
                      className={`
                        ml-1 w-4 h-4 
                        transition-transform duration-300
                        ${activeDropdown === index ? 'rotate-180' : ''}
                      `} 
                    />
                  )} */}
                </a>

                {/* {link.dropdown && activeDropdown === index && (
                  <div 
                    className="
                      absolute top-full left-0 
                      mt-6 
                      w-72 
                      bg-white 
                      rounded-xl 
                      shadow-2xl 
                      border 
                      border-gray-100 
                      overflow-hidden
                      animate-fade-in-down
                    "
                  >
                    {link.dropdown.map((dropdownLink, i) => (
                      <a 
                        key={i} 
                        href="#" 
                        className="
                          block 
                          p-4 
                          hover:bg-gray-50 
                          transition-colors 
                          group/item
                        "
                      >
                        <div className="flex items-center">
                          <dropdownLink.icon 
                            className="
                              w-6 h-6 
                              mr-3 
                              text-indigo-500 
                              group-hover/item:rotate-12 
                              transition-transform
                            " 
                          />
                          <div>
                            <p className="font-semibold text-gray-900 group-hover/item:text-indigo-600">
                              {dropdownLink.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {dropdownLink.description}
                            </p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                )} */}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="/auth" 
              className={`
                ${isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-indigo-200'}
                transition-colors duration-300
              `}
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
              className={`
                ${isScrolled ? 'text-gray-900' : 'text-white'}
                transition-colors duration-300
              `}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
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
                  {/* {link.dropdown && <ChevronDown className="w-6 h-6" />} */}
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
                  bg-gradient-to-r from-green-500 to-blue-600
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
    </nav>
  )
}

export default Nav