import React from 'react'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const Testimonials = () => {
  return <TestimonialSection />
}

const TestimonialSection = () => {
  const testimonials = [
      {
        quote: "Our team communication has never been smoother! The multi-device sync and group management features are game-changers for our remote workflow.",
        name: "Sarah Johnson",
        role: "Project Manager, TechFlow",
        rating: 5,
        avatar: "https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww",
        color: "from-blue-100 to-blue-200"
      },
      {
        quote: "End-to-end encryption and secure cloud backups give me peace of mind. Knowing my chats are safe makes this the best messaging app for our company.",
        name: "Michael Chen",
        role: "IT Security Lead, DataSphere",
        rating: 5,
        avatar: "https://plus.unsplash.com/premium_photo-1669879825881-6d4e4bde67d5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
        color: "from-purple-100 to-purple-200"
      },
      {
        quote: "I love how easy it is to manage my business contacts and automate replies. The API access and chatbots have streamlined my customer interactions like never before!",
        name: "Emma Rodriguez",
        role: "Founder, GreenTech Solutions",
        rating: 4,
        avatar: "https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg",
        color: "from-green-100 to-green-200"
      }
  ];
  
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
            What <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600">Innovative Teams</span> Say
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Real stories from forward-thinking businesses transforming their operations.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.2
              }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-50 rounded-2xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-300`}></div>
              
              <div className="relative bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden p-8 space-y-6">
                <Quote className="text-gray-300 absolute top-4 left-4" size={36} />
                
                <p className="text-lg text-gray-700 italic relative z-10 min-h-[120px]">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center flex-col justify-between border-t border-gray-100 pt-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full border-3 border-white shadow-md object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-base">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`mr-1 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        size={20}
                        fill={i < testimonial.rating ? '#FBBF24' : 'currentColor'}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials