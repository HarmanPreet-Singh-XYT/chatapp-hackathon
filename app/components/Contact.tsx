'use client'
import { useState } from 'react';
import { 
  Mail, MapPin, Phone, Clock, Globe, MessageSquare, 
  Building, Users, ArrowRight, CheckCircle2, AlertCircle,
  Calendar, Video, Coffee, Headphones, BarChart2, 
  FileText, Briefcase, Shield, Zap, Star, Award,
  Languages, Laptop, HelpCircle, Send, ChevronRight
} from 'lucide-react';
import Navbar from './Pricing/Navbar';
import Footer from './Home/Footer';

export const Contact = () => {
    const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [selectedOffice, setSelectedOffice] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'form' | 'meeting'>('form');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('success');
        setTimeout(() => setFormStatus('idle'), 3000);
    };

    const departments = [
        {
            name: "Sales",
            icon: BarChart2,
            description: "For pricing, custom plans, and enterprise solutions"
        },
        {
            name: "Support",
            icon: Headphones,
            description: "Technical support and troubleshooting"
        },
        {
            name: "Business",
            icon: Briefcase,
            description: "Partnerships and business opportunities"
        },
        {
            name: "Legal",
            icon: FileText,
            description: "Legal inquiries and compliance"
        }
    ];

    const offices = [
        {
            city: "San Francisco",
            country: "United States",
            address: "123 Innovation Drive, CA 94107",
            phone: "+1 (555) 0123",
            email: "sf@fluchat.com",
            timezone: "PST (UTC-8)",
            image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80",
            features: ["HQ", "R&D Center", "24/7 Support"]
        },
        {
            city: "London",
            country: "United Kingdom",
            address: "456 Tech Square, EC2A 1BE",
            phone: "+44 20 7123 4567",
            email: "london@fluchat.com",
            timezone: "GMT (UTC+0)",
            image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
            features: ["EMEA Sales", "Support", "Training Center"]
        },
        {
            city: "Singapore",
            country: "Singapore",
            address: "789 Digital Park, 018936",
            phone: "+65 6789 0123",
            email: "singapore@fluchat.com",
            timezone: "SGT (UTC+8)",
            image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
            features: ["APAC HQ", "Innovation Lab", "Support"]
        }
    ];

    const meetingTypes = [
        {
            icon: Video,
            title: "Product Demo",
            description: "30-minute walkthrough of key features",
            duration: "30 min"
        },
        {
            icon: Users,
            title: "Solution Consulting",
            description: "Deep dive into your specific needs",
            duration: "45 min"
        },
        {
            icon: Coffee,
            title: "Discovery Call",
            description: "Initial conversation about your goals",
            duration: "20 min"
        }
    ];

    const timeSlots = [
        "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM",
        "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"
    ];

    const stats = [
        { number: "1hr", label: "Avg. Response Time" },
        { number: "24/7", label: "Global Support" },
        { number: "15+", label: "Languages" },
        { number: "99.9%", label: "Customer Satisfaction" }
    ];

    return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-900 antialiased">
            {/* Hero Section */}
            <section className="relative overflow-hidden px-6 pt-32 pb-24">
                {/* Subtle Background Glow */}
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-blue-100/20 via-white/10 to-indigo-100/20 opacity-50 -z-10"></div>
                
                <div className="max-w-7xl mx-auto relative">
                    {/* Animated Floating Elements */}
                    <div className="absolute -top-12 -right-12 w-72 h-72 bg-indigo-100/50 rounded-full blur-3xl animate-slow-bounce"></div>
                    
                    <div className="text-center relative z-10">
                        <div className="inline-flex items-center mb-6 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full shadow-md">
                            <Shield className="w-5 h-5 text-green-600 mr-2" />
                            <span className="text-sm font-medium text-green-700">Enterprise-Grade Support</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600 leading-tight">
                            Elevate Your Support Experience
                        </h1>
                        
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                            Seamless, personalized support tailored to your enterprise needs. 
                            Connect with our expert team and transform your challenges into opportunities.
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
                            {stats.map((stat, i) => (
                                <div 
                                    key={i} 
                                    className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100/50 transform hover:-translate-y-2"
                                >
                                    <p className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">
                                        {stat.number}
                                    </p>
                                    <p className="text-gray-600 text-sm font-medium tracking-wide uppercase">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Tab Buttons */}
                        <div className="inline-flex space-x-4 bg-white/60 backdrop-blur-md rounded-full p-2 shadow-md">
                            {['form', 'meeting'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as 'form' | 'meeting')}
                                    className={`
                                        px-6 py-3 rounded-full transition-all duration-300 flex items-center
                                        ${activeTab === tab 
                                            ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg' 
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }
                                    `}
                                >
                                    {tab === 'form' ? (
                                        <>
                                            <MessageSquare className="w-5 h-5 mr-2" />
                                            Send Message
                                        </>
                                    ) : (
                                        <>
                                            <Calendar className="w-5 h-5 mr-2" />
                                            Schedule Meeting
                                        </>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Contact Section */}
            <section className="px-6 pb-24">
                <div className="max-w-7xl mx-auto">
                    {activeTab === 'form' ? (
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-gray-100/50">
                                <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">
                                    Get in Touch
                                </h2>
                                
                                {/* Department Selection */}
                                <div className="grid grid-cols-2 gap-4 mb-10">
                                    {departments.map((dept, i) => (
                                        <div
                                            key={i}
                                            className={`
                                                p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer group
                                                ${selectedDepartment === dept.name
                                                    ? 'border-indigo-600 bg-indigo-50/50 shadow-md'
                                                    : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50/30'
                                                }
                                            `}
                                            onClick={() => setSelectedDepartment(dept.name)}
                                        >
                                            <dept.icon className={`
                                                w-8 h-8 mb-3 transition-colors
                                                ${selectedDepartment === dept.name 
                                                    ? 'text-indigo-600' 
                                                    : 'text-gray-400 group-hover:text-indigo-500'
                                                }
                                            `} />
                                            <div className="font-semibold mb-1 text-lg">{dept.name}</div>
                                            <div className="text-sm text-gray-500">{dept.description}</div>
                                        </div>
                                    ))}
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                                placeholder="John"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                                placeholder="Doe"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Work Email
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                            placeholder="john@company.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Company
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Your Company"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                            placeholder="How can we help you?"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-200 flex items-center justify-center group"
                                    >
                                        Send Message
                                        <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>

                                    {formStatus === 'success' && (
                                        <div className="flex items-center text-green-600 bg-green-50 p-4 rounded-lg">
                                            <CheckCircle2 className="w-5 h-5 mr-2" />
                                            Message sent successfully!
                                        </div>
                                    )}
                                    {formStatus === 'error' && (
                                        <div className="flex items-center text-red-600 bg-red-50 p-4 rounded-lg">
                                            <AlertCircle className="w-5 h-5 mr-2" />
                                            Error sending message. Please try again.
                                        </div>
                                    )}
                                </form>
                            </div>

                            {/* Quick Contact Options */}
                            <div className="space-y-8">
                                {/* 24/7 Support Card */}
                                <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100/50">
                                    <div className="bg-gradient-to-r from-green-500 to-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                                        <Headphones className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
                                    <p className="text-gray-600 mb-6">
                                        Our enterprise support team is available around the clock to help you succeed.
                                    </p>
                                    <div className="space-y-4">
                                        <a href="tel:+1-555-0123" className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
                                            <Phone className="w-5 h-5 mr-3" />
                                            +1 (555) 0123
                                        </a>
                                        <a href="mailto:support@fluchat.com" className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
                                            <Mail className="w-5 h-5 mr-3" />
                                            support@fluchat.com
                                        </a>
                                    </div>
                                </div>

                                {/* Premium Support Card */}
                                <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100/50">
                                    <div className="bg-gradient-to-r from-green-500 to-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                                        <Star className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">Premium Support</h3>
                                    <p className="text-gray-600 mb-6">
                                        Enterprise customers get access to:
                                    </p>
                                    <ul className="space-y-3">
                                        {[
                                            "Dedicated Support Team",
                                            "Priority Response",
                                            "Custom SLAs",
                                            "Technical Account Manager"
                                        ].map((feature, i) => (
                                            <li key={i} className="flex items-center text-gray-600">
                                                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Global Coverage Card */}
                                <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100/50">
                                    <div className="bg-gradient-to-r from-green-500 to-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                                        <Globe className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">Global Coverage</h3>
                                    <p className="text-gray-600 mb-6">
                                        Support available in multiple languages and time zones
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { icon: Languages, text: "15+ Languages" },
                                            { icon: Clock, text: "24/7 Coverage" },
                                            { icon: MapPin, text: "Global Offices" },
                                            { icon: Users, text: "Local Teams" }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center text-gray-600">
                                                <item.icon className="w-5 h-5 mr-2 text-indigo-600" />
                                                <span>{item.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-gray-100/50">
                                <h2 className="text-2xl font-bold mb-8">Schedule a Meeting</h2>

                                {/* Meeting Types */}
                                <div className="grid md:grid-cols-3 gap-6 mb-12">
                                    {meetingTypes.map((type, i) => (
                                        <div
                                            key={i}
                                            className={`
                                                bg-gray-50 rounded-2xl p-6 cursor-pointer transition-all duration-300
                                                ${selectedTime 
                                                    ? 'opacity-50 hover:opacity-100' 
                                                    : 'hover:bg-indigo-50 hover:shadow-md'
                                                }
                                            `}
                                            onClick={() => setSelectedTime(null)}
                                        >
                                            <div className="bg-white w-12 h-12 rounded-xl shadow-md flex items-center justify-center mb-4">
                                                <type.icon className="w-6 h-6 text-indigo-600" />
                                            </div>
                                            <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
                                            <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Clock className="w-4 h-4 mr-2" />
                                                {type.duration}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Time Slots */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold mb-4">Select a Time</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {timeSlots.map((time, i) => (
                                            <button
                                                key={i}
                                                className={`
                                                    px-4 py-3 rounded-xl border-2 transition-all duration-200
                                                    ${selectedTime === time
                                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-md'
                                                        : 'border-gray-200 hover:border-indigo-600 hover:bg-gray-50'
                                                    }
                                                `}
                                                onClick={() => setSelectedTime(time)}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Timezone Notice */}
                                <div className="flex items-center text-sm text-gray-500 mb-8">
                                    <Globe className="w-4 h-4 mr-2" />
                                    Times shown in your local timezone
                                </div>

                                {/* Next Steps */}
                                <div className="bg-gray-50 rounded-2xl p-6">
                                    <h3 className="text-lg font-semibold mb-4">What happens next?</h3>
                                    <div className="space-y-4">
                                        {[
                                            "You'll receive a calendar invite with meeting details",
                                            "We'll send you a brief questionnaire to understand your needs",
                                            "Our team will prepare a personalized demo",
                                            "Join the meeting via the provided video conference link"
                                        ].map((step, i) => (
                                            <div key={i} className="flex items-center text-gray-600">
                                                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 text-sm font-medium">
                                                    {i + 1}
                                                </div>
                                                {step}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Global Offices Section */}
            <section className="px-6 mb-24 bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6">Global Presence</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            With offices around the world, we provide local support and expertise wherever you are
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {offices.map((office, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                                onMouseEnter={() => setSelectedOffice(office.city)}
                                onMouseLeave={() => setSelectedOffice(null)}
                            >
                                <div className="relative">
                                    <img
                                        src={office.image}
                                        alt={office.city}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        {office.features.map((feature, j) => (
                                            <span
                                                key={j}
                                                className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{office.city}</h3>
                                    <p className="text-gray-600 mb-4">{office.country}</p>
                                    <div className="space-y-3">
                                        <div className="flex items-center text-gray-600">
                                            <MapPin className="w-5 h-5 mr-3" />
                                            {office.address}
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Phone className="w-5 h-5 mr-3" />
                                            {office.phone}
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Mail className="w-5 h-5 mr-3" />
                                            {office.email}
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Clock className="w-5 h-5 mr-3" />
                                            {office.timezone}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 py-24 bg-gradient-to-r from-green-500 to-blue-600">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-4xl font-bold mb-6">Ready to get started?</h2>
                    <p className="text-xl mb-8 text-indigo-100">
                        Join thousands of teams already using fluchat to build better software
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href='/auth' className="bg-white text-indigo-600 px-8 py-4 rounded-full font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                            Start Free Trial
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </a>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-indigo-600 transition-all duration-200">
                            View Documentation
                        </button>
                    </div>
                </div>
            </section>
        </div>
        <Footer/>
    </>
    );
};