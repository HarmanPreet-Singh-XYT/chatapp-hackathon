import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Zap, 
  Shield, 
  Rocket, 
  Network,
  Layers,
  Workflow,
  Globe,
  Users,
  TrendingUp,
  HeartPulse,
  Sigma,
  Lightbulb,
  ArrowUpRight,
  Plug,
  ServerCog,
  Star,
  Headphones,
  Briefcase,
  MessageCircle,
  Phone,
  LockIcon,
  Cloud,
  Key
} from 'lucide-react';

const PricingComponent = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Basic',
      tier: 'Free',
      color: 'emerald',
      icon: <Zap className="text-emerald-500" />,
      price: {
        monthly: 0,
        annual: 0
      },
      features: [
        {
          icon: <MessageCircle className="text-emerald-600" />,
          title: 'Unlimited Messaging',
          description: 'Send and receive messages with no limits'
        },
        {
          icon: <Phone className="text-green-600" />,
          title: 'Voice & Video Calls',
          description: 'High-quality voice and video calls with end-to-end encryption'
        }
      ],
      benefits: [
        { icon: <Shield />, text: 'End-to-End Encryption' },
        { icon: <Users />, text: 'Group Chats & Broadcast Lists' }
      ]
    },
    {
      name: 'Pro',
      tier: 'Premium',
      color: 'green',
      icon: <Rocket className="text-green-500" />,
      price: {
        monthly: 4.99,
        annual: 49.99
      },
      recommended: true,
      features: [
        {
          icon: <Cloud className="text-green-600" />,
          title: 'Cloud Backup',
          description: 'Secure cloud storage for chat history and media'
        },
        {
          icon: <Key className="text-sky-600" />,
          title: 'Advanced Privacy Controls',
          description: 'Customizable privacy settings for enhanced security'
        }
      ],
      benefits: [
        { icon: <ServerCog />, text: 'Priority Support' },
        { icon: <LockIcon />, text: 'Custom Security Features' }
      ]
    },
    {
      name: 'Business',
      tier: 'Enterprise',
      color: 'violet',
      icon: <Shield className="text-violet-500" />,
      price: {
        monthly: 'Custom',
        annual: 'Custom'
      },
      features: [
        {
          icon: <Briefcase className="text-violet-600" />,
          title: 'Multi-User Management',
          description: 'Manage multiple users and teams with role-based access'
        },
        {
          icon: <Headphones className="text-pink-600" />,
          title: 'Dedicated Account Manager',
          description: 'Personalized assistance for smooth business operations'
        }
      ],
      benefits: [
        { icon: <Users />, text: 'Unlimited Team Collaboration' },
        { icon: <Star />, text: 'Premium Business Support' }
      ]
    }
];


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 h-[50px] bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
            Pricing Plans
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan that scales with your business needs
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white shadow-md rounded-lg p-1 inline-flex">
            {['monthly', 'annual'].map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                className={`
                  px-6 py-2 text-sm font-medium rounded-lg transition-all
                  ${billingCycle === cycle 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'}
                `}
              >
                {cycle === 'annual' ? 'Annual' : 'Monthly'}
                {cycle === 'annual' && (
                  <span className="bg-emerald-500 text-white text-xs ml-2 px-2 py-0.5 rounded-full">
                    Save 20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`
                bg-white flex flex-col justify-between shadow-lg border border-gray-200 rounded-xl p-6 relative
                ${plan.recommended ? 'ring-2 ring-green-500 scale-105' : 'hover:shadow-xl'}
              `}
            >
              {/* Recommended Badge */}
              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 text-xs rounded-tr-xl rounded-bl-xl">
                  Most Popular
                </div>
              )}
              <div>
              <div className="flex items-center mb-2">
                {plan.icon}
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-gray-900">{plan.name}</h2>
                  <p className="text-sm text-gray-500">{plan.tier}</p>
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900 mr-2">
                    {typeof plan.price[billingCycle] === 'number' 
                      ? `$${plan.price[billingCycle]}` 
                      : plan.price[billingCycle]}
                  </span>
                  {typeof plan.price[billingCycle] === 'number' && (
                    <span className="text-gray-500 text-sm">
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  )}
                </div>
              </div>

              </div>
              {/* Plan Header */}

              {/* Features */}
              <div className="mb-6 space-y-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    {feature.icon}
                    <div className="ml-3">
                      <h3 className="text-sm font-semibold text-gray-800">{feature.title}</h3>
                      <p className="text-xs text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="mb-6 space-y-3">
                {plan.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    {benefit.icon}
                    <span className="ml-3 text-sm">{benefit.text}</span>
                  </div>
                ))}
              </div>
                  
              {/* CTA Button */}
              <a href='/auth'>
                <button 
                  className={`
                    w-full py-3 rounded-lg text-white font-semibold transition-all hover:cursor-pointer
                    ${plan.recommended 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-gray-800 hover:bg-gray-900'}
                  `}
                >
                  {plan.name === 'Nebula' ? 'Contact Sales' : 'Get Started'}
                  <ArrowUpRight size={18} className="inline-block ml-2" />
                </button>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingComponent;