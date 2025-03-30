import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import React from 'react';

const Plans = ({ isAnnual, setIsAnnual, tiers }) => {
  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-transparent">
      {/* Header Section */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-extralight tracking-tight text-gray-900 mb-6">
          Choose the Best Plan for Your <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600">Messaging Needs</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get unlimited chats, enhanced security, and exclusive features with our flexible plans.
        </p>
      </motion.header>

      {/* Pricing Toggle */}
      <div className="flex justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white shadow-lg rounded-full p-2 inline-flex items-center space-x-4"
        >
          <span className={`px-4 py-2 rounded-full transition-all ${!isAnnual ? 'bg-green-500 text-white' : 'text-gray-600'}`}>
            Monthly
          </span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative inline-flex h-6 w-12 items-center rounded-full bg-gray-300"
          >
            <motion.span
              layout
              className={`h-5 w-5 bg-white rounded-full shadow-md transform transition-transform ${
                isAnnual ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`px-4 py-2 rounded-full transition-all ${isAnnual ? 'bg-green-500 text-white' : 'text-gray-600'}`}>
            Annual
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </span>
        </motion.div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        {tiers.map((tier) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className={`bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative ${
              tier.recommended ? 'ring-2 ring-green-500' : ''
            }`}
          >
            {tier.recommended && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Recommended
              </div>
            )}
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">{tier.name}</h3>
                  <p className="text-sm text-gray-500">{tier.description}</p>
                </div>
                <div className={`bg-gradient-to-br ${tier.color} p-3 rounded-2xl text-white`}>
                  <tier.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mb-8">
                {typeof tier.price === 'number' ? (
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold text-gray-900">${tier.price}</span>
                    <span className="text-gray-500">/month</span>
                    {isAnnual && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        ${tier.monthlyEquivalent}/mo
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-gray-900">{tier.price}</div>
                )}
              </div>
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <a href={tier.name==='Business' ? '/contact' : '/auth'}>
                <button className={`w-full py-3 rounded-full hover:cursor-pointer font-semibold transition-all duration-300 ${
                  tier.recommended 
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:shadow-xl hover:shadow-green-500/30' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                  {tier.name === 'Business' ? 'Contact Sales' : 'Get Started'}
                </button>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
