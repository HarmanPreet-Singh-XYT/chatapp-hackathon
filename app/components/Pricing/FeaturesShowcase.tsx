import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const FeaturesShowcase = ({enterpriseFeatures}) => {
  return (
    <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-light tracking-tight text-gray-900 mb-6">
              Enterprise-Grade <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600">Capabilities</span>
            </h2>
            <p className="text-xl text-gray-600">
              Sophisticated solutions engineered for scalability, security, and strategic growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {enterpriseFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1 
                }}
                className={`${feature.color} p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="mb-6 flex items-center justify-between">
                  <feature.icon className={`w-10 h-10 ${feature.color.split(' ')[1]}`} />
                  <ArrowUpRight className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default FeaturesShowcase