import React, { useEffect, useRef } from 'react'
import { 
  Zap, 
  Globe, 
  Users, 
  TrendingUp, 
  Rocket, 
  Shield,
  ArrowUpRight,
  CheckCircle,
  Phone,
  MessageCircle
} from 'lucide-react'

const AnimatedNumber = ({ number, suffix = '' }) => {
  const numberRef = useRef(null)

  useEffect(() => {
    const element = numberRef.current
    const numValue = parseFloat(number)
    
    const animateNumber = () => {
      let start = 0
      const duration = 1500
      const step = numValue / (duration / 16)

      const updateNumber = () => {
        start += step
        if (start < numValue) {
          element.textContent = `${Math.round(start)}${suffix}`
          requestAnimationFrame(updateNumber)
        } else {
          element.textContent = `${numValue}${suffix}`
        }
      }

      requestAnimationFrame(updateNumber)
    }

    animateNumber()
  }, [number, suffix])

  return <span ref={numberRef} className="tabular-nums">{number}{suffix}</span>
}

const Stats = () => {
  const statItems = [
    {
      icon: MessageCircle,
      number: "2",
      suffix: "B+",
      label: "Messages Sent Daily",
      description: "Seamless global messaging with real-time delivery",
      iconColor: "text-blue-400",
      gradient: "from-blue-500/10 to-blue-500/20"
    },
    {
      icon: Shield,
      number: "100",
      suffix: "%",
      label: "End-to-End Encryption",
      description: "Privacy-first approach securing every message and call",
      iconColor: "text-green-400",
      gradient: "from-green-500/10 to-green-500/20"
    },
    {
      icon: Users,
      number: "500",
      suffix: "M+",
      label: "Active Users",
      description: "A vast and engaged user base worldwide",
      iconColor: "text-purple-400",
      gradient: "from-purple-500/10 to-purple-500/20"
    },
    {
      icon: Phone,
      number: "1",
      suffix: "B+",
      label: "Calls Made Monthly",
      description: "Crystal-clear voice and video calls across the globe",
      iconColor: "text-amber-400",
      gradient: "from-amber-500/10 to-amber-500/20"
    }
];


  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {statItems.map((stat, index) => (
            <div 
              key={index} 
              className="
                relative 
                p-6 
                rounded-2xl 
                bg-white 
                border 
                border-gray-200
                shadow-lg
                overflow-hidden
                transition-all
                duration-300
                hover:shadow-xl
                hover:translate-y-[-10px]
                group
              "
            >
              {/* Background Gradient */}
              <div 
                className={`
                  absolute 
                  inset-0 
                  bg-gradient-to-br 
                  ${stat.gradient}
                  opacity-20
                  -z-10
                `}
              ></div>

              {/* Icon */}
              <div 
                className={`
                  mb-4 
                  ${stat.iconColor}
                  transition-transform
                  duration-300
                  group-hover:scale-110
                `}
              >
                <stat.icon className="w-10 h-10 stroke-[1.5]" />
              </div>

              {/* Animated Number */}
              <div 
                className={`
                  text-5xl 
                  font-bold 
                  mb-3 
                  bg-gradient-to-r 
                  bg-clip-text 
                  ${stat.iconColor}
                  leading-tight
                `}
              >
                <AnimatedNumber 
                  number={stat.number} 
                  suffix={stat.suffix} 
                />
              </div>

              {/* Label */}
              <h3 
                className="
                  text-lg 
                  font-semibold 
                  text-gray-800 
                  mb-2
                  transition-colors
                  duration-300
                "
              >
                {stat.label}
              </h3>

              {/* Description */}
              <p 
                className="
                  text-sm 
                  text-gray-600
                  mb-4
                  opacity-80
                "
              >
                {stat.description}
              </p>

              {/* Features/Highlights */}
              <div className="space-y-2 mb-4">
                {[
                  "Verified Data",
                  "Real-time Updates",
                  "Advanced Analytics"
                ].map((feature, idx) => (
                  <div 
                    key={idx} 
                    className="
                      flex 
                      items-center 
                      text-xs 
                      text-gray-600
                      opacity-70
                    "
                  >
                    <CheckCircle 
                      className="
                        w-4 
                        h-4 
                        mr-2 
                        text-emerald-500
                      " 
                    />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Learn More */}
              <button 
                className="
                  w-full 
                  flex 
                  items-center 
                  justify-center 
                  text-sm 
                  font-medium 
                  text-gray-700 
                  hover:text-black 
                  transition-colors 
                  group/button
                "
              >
                Learn More
                <ArrowUpRight 
                  className="
                    w-4 
                    h-4 
                    ml-2 
                    group-hover/button:translate-x-1 
                    group-hover/button:-translate-y-1 
                    transition-transform
                  " 
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats