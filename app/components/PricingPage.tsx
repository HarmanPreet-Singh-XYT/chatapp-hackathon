import React, { useState, useRef, useEffect } from 'react';
import { 
  Check, X, HelpCircle, Zap, Shield, Users,
  Cloud, Terminal, Info, ArrowUpRight, ChevronDown, Cpu,
  ArrowRight, BookOpen, MessageCircle, Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FeatureComparison from './Pricing/Features';
import Plans from './Pricing/Plans';
import CTA from './Pricing/CTA';
import FAQ from './Pricing/FAQ';
import FeaturesShowcase from './Pricing/FeaturesShowcase';
import Testimonials from './Pricing/Testimonials';
import Comparison from './Pricing/Comparison';
import Footer from './Home/Footer';
import Nav from './Home/Nav';
import Navbar from './Pricing/Navbar';
interface Tier {
  name: string;
  description: string;
  price: number | "Custom";
  monthlyEquivalent?: number;
  features: string[];
  color: string;
  icon: any;
  recommended?: boolean;
}
const PricingPage = () => {
    const [isAnnual, setIsAnnual] = useState(true);
    // const [activeFeature, setActiveFeature] = useState(null);
    // const [selectedTier, setSelectedTier] = useState(null);
    const [openFAQ, setOpenFAQ] = useState(null);
    const [showComparisonModal, setShowComparisonModal] = useState(false);
    const enterpriseFeatures = [
      {
        icon: Shield,
        title: "Enterprise-Grade Security",
        description: "End-to-end encryption, secure cloud backups, and compliance with GDPR and SOC 2 standards.",
        color: "bg-blue-50 text-blue-600"
      },
      {
        icon: Cpu,
        title: "Scalable Infrastructure",
        description: "High-availability cloud hosting with auto-scaling, ensuring 99.99% uptime and global reliability.",
        color: "bg-green-50 text-green-600"
      },
      {
        icon: Users,
        title: "Advanced Team Management",
        description: "Granular permissions, role-based access, and custom workflows for large-scale teams.",
        color: "bg-purple-50 text-purple-600"
      },
      {
        icon: Cloud,
        title: "Custom Cloud Deployment",
        description: "Flexible cloud hosting options, including private, hybrid, or on-premises deployments.",
        color: "bg-indigo-50 text-indigo-600"
      },
      {
        icon: Terminal,
        title: "Developer API Access",
        description: "Comprehensive API ecosystem for custom integrations, automation, and chatbots.",
        color: "bg-pink-50 text-pink-600"
      },
      {
        icon: Users,
        title: "Premium Support & SLA",
        description: "24/7 dedicated support, enterprise SLAs, and tailored onboarding for seamless integration.",
        color: "bg-orange-50 text-orange-600"
      }
  ];

  const faqs = [
    {
      question: "How do the pricing plans work?",
      answer: "Our plans are designed for flexibility. You can choose between monthly or annual billing, with discounts available for annual subscriptions. Upgrade, downgrade, or cancel anytime.",
      category: "Billing"
    },
    {
      question: "Is there a free version of the app?",
      answer: "Yes! Our Basic plan is free forever, offering essential messaging features with no hidden costs. You can upgrade anytime to access premium features.",
      category: "Trial"
    },
    {
      question: "Can I use the app on multiple devices?",
      answer: "Yes, our Premium and Business plans allow multi-device sync, so you can access your messages seamlessly across phones, tablets, and desktops.",
      category: "Features"
    },
    {
      question: "How secure is my data?",
      answer: "We prioritize your privacy with end-to-end encryption, two-factor authentication, and secure cloud backups. We do not sell your data.",
      category: "Security"
    },
    {
      question: "Do you offer business or enterprise solutions?",
      answer: "Yes! Our Business plan includes advanced features like AI-powered chatbots, automation, and API access. Contact us for custom enterprise solutions.",
      category: "Enterprise"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards, PayPal, Google Pay, and Apple Pay. Enterprise customers can also request invoicing.",
      category: "Billing"
    }
];


  const tiers:Tier[] = [
    {
      name: "Basic",
      description: "For personal messaging needs",
      price: isAnnual ? 4.99 : 5.99,
      monthlyEquivalent: isAnnual ? 4.16 : 5.99,
      features: [
        "Unlimited text messages",
        "Basic media sharing",
        "End-to-end encryption",
        "Standard customer support",
        "Single device access",
        "Basic cloud backup",
        "No ads"
      ],
      color: "from-green-500 to-blue-500",
      icon: MessageCircle
    },
    {
      name: "Premium",
      description: "Enhanced features for power users",
      price: isAnnual ? 9.99 : 11.99,
      monthlyEquivalent: isAnnual ? 8.33 : 11.99,
      features: [
        "Unlimited text and voice messages",
        "HD media sharing",
        "Multi-device sync",
        "Priority customer support",
        "Cloud storage for messages",
        "Exclusive chat themes",
        "Custom stickers and emojis",
        "Advanced privacy controls"
      ],
      color: "from-indigo-500 to-purple-500",
      icon: Users,
      recommended: true
    },
    {
      name: "Business",
      description: "Designed for enterprises and teams",
      price: "Custom",
      features: [
        "Unlimited team members",
        "Business chat automation",
        "AI-powered chatbot",
        "Enterprise-grade encryption",
        "Dedicated account manager",
        "Custom analytics dashboard",
        "API access for integrations",
        "24/7 priority support",
        "Compliance & governance tools",
        "Custom onboarding"
      ],
      color: "from-rose-500 to-pink-500",
      icon: Shield
    }
  ];

// Comprehensive Feature Comparison


  // New comparison modal component
  <Comparison tiers={tiers} showComparisonModal={showComparisonModal} setShowComparisonModal={setShowComparisonModal} />

// New testimonial section

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br pointer-events-none" />
      <Navbar/>
      <div className='mt-24'></div>
      {/* Content Container */}
      <Plans tiers={tiers} setIsAnnual={setIsAnnual} isAnnual={isAnnual} />
      {/* <div className="text-center my-8">
        <button 
            onClick={() => setShowComparisonModal(true)}
            className="bg-gray-100 text-gray-900 px-6 py-3 rounded-full hover:bg-gray-200 transition-colors flex items-center mx-auto"
        >
            <BookOpen className="mr-2 w-5 h-5" />
            View Full Plan Comparison
        </button>
    </div> */}
    <FeatureComparison tiers={tiers} />

    <FeaturesShowcase enterpriseFeatures={enterpriseFeatures} />
      {/* Render Comparison Modal */}

            {/* Add Testimonial Section */}
            <Testimonials />

            

      {/* FAQ Section */}
      <FAQ faqs={faqs}/>
      {/* Updated CTA Section with More Options */}
      <CTA/>
      <Footer/>
    </div>
  );
};

export default PricingPage;