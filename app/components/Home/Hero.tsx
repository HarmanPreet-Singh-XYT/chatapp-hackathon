import React, { useState } from 'react'
import { 
  Rocket, 
  ArrowRight, 
  PlayCircle, 
  Shield, 
  CheckCircle,
  Code,
  Zap,
  MessageCircle
} from 'lucide-react'

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false)

  const customerLogos = [
    { id: 1, alt: "Tech Company",link:'https://mir-s3-cdn-cf.behance.net/project_modules/1400/35af6a41332353.57a1ce913e889.jpg' },
    { id: 2, alt: "Startup",link:'https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww' },
    { id: 3, alt: "Enterprise",link:'https://images.unsplash.com/photo-1463453091185-61582044d556?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww' },
    { id: 4, alt: "Innovator",link:'https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg' }
  ]

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Layered Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-noise opacity-10"></div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          {/* Announcement Chip */}
          <div 
  className="
    inline-flex items-center 
    px-4 py-2 
    bg-white/10 backdrop-blur-md 
    rounded-full 
    mb-6 
    hover:bg-white/20 
    transition-all 
    duration-300
  "
>
  <MessageCircle className="w-5 h-5 text-green-400 mr-2 animate-pulse" />
  <span className="text-sm font-medium text-white">
    New: Secure & Smart Messaging for Teams
    </span>
  </div>

    {/* Main Headline */}
    <h1 
      className="
        text-6xl md:text-7xl font-bold 
        leading-tight mb-6
        bg-clip-text text-transparent 
        bg-gradient-to-r from-green-400 via-blue-500 to-indigo-500
        animate-gradient-x
      "
    >
      Connect, Chat, and Collaborate Seamlessly
    </h1>

    {/* Subheadline */}
    <p className="
      text-xl text-gray-300 
      mb-10 
      leading-relaxed 
      max-w-3xl 
      mx-auto
    ">
      Experience the future of messaging with end-to-end encryption, real-time sync across devices, 
      and AI-powered chat features designed for personal and business communication.
    </p>


          {/* CTA Buttons */}
          <div className="
            flex 
            flex-col 
            sm:flex-row 
            items-center 
            justify-center 
            space-y-4 
            sm:space-y-0 
            sm:space-x-6 
            mb-12
          ">
            <a 
              className="
                w-full sm:w-auto 
                bg-gradient-to-r from-green-500 to-blue-600
                text-white 
                px-10 py-4 
                rounded-full 
                hover:scale-105 
                transform 
                transition-all 
                duration-300 
                shadow-2xl 
                hover:shadow-indigo-500/50 
                flex 
                items-center 
                group
              "
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              href='/auth'
            >
              Start 14-Day Free Trial
              <ArrowRight 
                className={`
                  ml-3 
                  ${isHovered ? 'translate-x-2' : ''} 
                  transition-transform
                `} 
              />
            </a>
            <button 
              className="
                w-full sm:w-auto 
                bg-white/10 
                backdrop-blur-md 
                border 
                border-white/20 
                text-white 
                px-10 py-4 
                rounded-full 
                hover:bg-white/20 
                transition-all 
                duration-300 
                flex 
                items-center 
                group
              "
            >
              <PlayCircle className="w-5 h-5 mr-3 group-hover:text-indigo-400 transition-colors" />
              Watch Demo
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex -space-x-3">
              {customerLogos.map((logo, index) => (
                <div 
                  key={logo.id} 
                  className="
                    w-10 h-10 
                    bg-white rounded-full 
                    border-2 border-gray-800 
                    flex items-center justify-center
                    text-xs font-bold
                    shadow-lg overflow-hidden
                  "
                  style={{ zIndex: customerLogos.length - index }}
                >
                  {logo.alt.charAt(0)}
                  <img src={logo.link} className='w-full h-full' />
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-400 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              <span className="mr-2 font-semibold text-white">4.9/5</span>
              from 2,000+ reviews
            </div>
          </div>
        </div>

        {/* Dashboard Image Section */}
        <div 
          className="
            relative 
            group 
            overflow-hidden 
            rounded-3xl 
            shadow-2xl 
            hover:shadow-indigo-500/30 
            transition-all 
            duration-500
          "
        >
          <img 
            src="/dashboard.png" 
            alt="Chat Dashboard"
            className="
              w-full 
              object-cover 
              transform 
              group-hover:scale-105 
              transition-transform 
              duration-500
            "
          />
          
          {/* Security Badge */}
          {/* <div 
            className="
              absolute 
              -bottom-8 
              left-1/2 
              -translate-x-1/2 
              bg-white/10 
              backdrop-blur-md 
              rounded-2xl 
              shadow-2xl 
              p-6 
              w-full 
              max-w-xl 
              border 
              border-white/20
            "
          >
            <div className="flex items-center space-x-6">
              <div 
                className="
                  bg-green-500/10 
                  text-green-400 
                  p-4 
                  rounded-full 
                  animate-pulse
                "
              >
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <p className="font-bold text-lg text-white">Enterprise-Grade Security</p>
                  <Zap className="w-5 h-5 text-yellow-400" />
                </div>
                <p className="text-sm text-gray-300">
                  SOC 2 Type II & ISO 27001 Certified | Advanced Threat Protection
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default Hero