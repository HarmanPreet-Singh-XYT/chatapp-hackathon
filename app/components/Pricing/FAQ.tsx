import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Zap, Lightbulb, ArrowRight, X } from 'lucide-react'

const FAQ = ({ faqs }) => {
  const [activeQuestion, setActiveQuestion] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredFAQs, setFilteredFAQs] = useState(faqs)
  const searchInputRef = useRef(null)

  // Advanced search with fuzzy matching
  useEffect(() => {
    const searchResults = faqs.filter(faq => {
      const searchString = searchTerm.toLowerCase()
      return (
        faq.question.toLowerCase().includes(searchString) ||
        faq.answer.toLowerCase().includes(searchString) ||
        // Simple fuzzy matching
        faq.question.toLowerCase().split(' ').some(word => word.startsWith(searchString)) ||
        faq.answer.toLowerCase().split(' ').some(word => word.startsWith(searchString))
      )
    })

    setFilteredFAQs(searchResults)
  }, [searchTerm, faqs])

  // Clear search functionality
  const clearSearch = () => {
    setSearchTerm('')
    searchInputRef.current?.focus()
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header with Advanced Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            type: "spring", 
            stiffness: 50 
          }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center mb-6 space-x-6">
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            >
              <Lightbulb 
                className="w-16 h-16 text-amber-500" 
                strokeWidth={1.5}
              />
            </motion.div>
            <h1 className="text-7xl font-extralight tracking-tight text-slate-900">
              Instant <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600">Answers</span>
            </h1>
          </div>
          <p className="text-2xl text-slate-600 max-w-3xl mx-auto">
            Dive into our comprehensive knowledge base. Find solutions quickly and effortlessly.
          </p>
        </motion.div>

        {/* Advanced Search Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.6, 
            type: "spring", 
            bounce: 0.3 
          }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="relative group">
            <Search 
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" 
              size={28}
            />
            <input 
              ref={searchInputRef}
              type="text"
              placeholder="What can we help you find today?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-20 py-5 text-xl border-2 border-slate-200 rounded-full 
                focus:outline-none focus:border-indigo-500 
                transition-all duration-300 
                placeholder-slate-400"
            />
            {searchTerm && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-3">
                <motion.span 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-slate-500"
                >
                  {filteredFAQs.length} results
                </motion.span>
                <button 
                  onClick={clearSearch}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* FAQ Grid with Advanced Interactions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1,
                  type: "spring",
                  bounce: 0.4
                }}
                className="perspective-1000"
              >
                <div 
                  className={`
                    bg-white rounded-3xl p-7 shadow-lg 
                    transform transition-all duration-500 
                    ${activeQuestion === index 
                      ? 'rotate-y-3 scale-105 shadow-2xl border-l-4 border-indigo-500' 
                      : 'hover:rotate-y-3 hover:scale-105 hover:shadow-xl'}
                    origin-center
                  `}
                >
                  <div 
                    onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
                    className="cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-5">
                      <h3 className="text-xl font-semibold text-slate-900 
                        group-hover:text-indigo-600 transition-colors">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ 
                          rotate: activeQuestion === index ? 45 : 0,
                          scale: activeQuestion === index ? 1.2 : 1
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Zap 
                          className={`
                            w-7 h-7 transition-all duration-300
                            ${activeQuestion === index 
                              ? 'text-indigo-600' 
                              : 'text-slate-400 group-hover:text-indigo-400'}
                          `}
                        />
                      </motion.div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {activeQuestion === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: 1, 
                          height: 'auto',
                          transition: { 
                            duration: 0.4,
                            type: "spring",
                            bounce: 0.3
                          }
                        }}
                        exit={{ 
                          opacity: 0, 
                          height: 0,
                          transition: { duration: 0.3 }
                        }}
                        className="overflow-hidden"
                      >
                        <p className="text-slate-600 leading-relaxed">
                          {faq.answer}
                        </p>
                        <div className="mt-4 flex justify-end">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center text-indigo-600 hover:text-indigo-800 
                              font-medium group transition-colors"
                          >
                            Learn More 
                            <ArrowRight 
                              className="ml-2 group-hover:translate-x-1 transition-transform" 
                              size={20} 
                            />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results State with Engaging Animation */}
        {filteredFAQs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="text-center py-16"
          >
            <div className="flex justify-center items-center mb-6">
              <Search 
                className="w-16 h-16 text-slate-400 mr-4" 
                strokeWidth={1.5} 
              />
              <p className="text-3xl text-slate-500">
                No FAQs found matching your search
              </p>
            </div>
            <p className="text-xl text-slate-400 max-w-md mx-auto">
              Try different keywords or browse our full list of questions.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default FAQ;