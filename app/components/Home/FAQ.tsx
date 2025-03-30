import { ChevronUp, ChevronDown, HelpCircle, MessageCircle, ArrowUpRight } from 'lucide-react'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        {
            question: "How secure are my messages?",
            answer: "Your messages are end-to-end encrypted, meaning only you and the recipient can read them. We do not store or access your private conversations."
        },
        {
            question: "Can I use this app on multiple devices?",
            answer: "Yes! You can sync your chats across multiple devices, ensuring seamless access on your phone, tablet, and desktop."
        },
        {
            question: "Is there a free version available?",
            answer: "Yes! We offer a free version with essential messaging features. Upgrade to a premium plan for additional tools like cloud backups and priority support."
        },
        {
            question: "Do you offer business or enterprise solutions?",
            answer: "Yes! Our business plans include team management tools, API integrations, and advanced security features tailored for professional use."
        }
    ];
    

    return (
        <section className="
            bg-gradient-to-br 
            from-[#f9fafb] 
            to-[#f0f3f5] 
            py-20 
            px-6 
            relative 
            overflow-hidden
        ">
            <div className="
                absolute 
                top-0 
                left-0 
                w-full 
                h-full 
                opacity-10 
                pointer-events-none 
                bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))]
                from-blue-100 
                via-blue-50 
                to-white
            "></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="
                            text-5xl 
                            font-bold 
                           bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent
                            mb-6 
                            bg-clip-text 
                            text-transparent 
                            bg-gradient-to-r 
                            from-[#2c3e50] 
                            to-[#3498db]
                        "
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <p className="
                        text-xl 
                        text-gray-600 
                        max-w-2xl 
                        mx-auto 
                        leading-relaxed
                    ">
                        Got questions? We've got answers. Dive into our comprehensive guide about Astroship's enterprise solutions.
                    </p>
                </div>

                <div className="space-y-6">
                    {faqs.map((faq, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 0.5, 
                                delay: i * 0.1 
                            }}
                        >
                            <div className="
                                bg-white 
                                rounded-2xl 
                                shadow-md 
                                hover:shadow-lg 
                                transition-shadow 
                                duration-300
                                border-l-4 
                                border-transparent 
                                hover:border-blue-500
                            ">
                                <button
                                    className="
                                        w-full 
                                        text-left 
                                        flex 
                                        items-center 
                                        justify-between 
                                        group 
                                        focus:outline-none
                                        p-6
                                    "
                                    onClick={() => toggleFaq(i)}
                                    aria-expanded={openFaq === i}
                                >
                                    <div className="flex items-center space-x-4">
                                        <HelpCircle 
                                            className="
                                                w-7 
                                                h-7 
                                                text-blue-500 
                                                group-hover:text-blue-600 
                                                transition-colors
                                            "
                                        />
                                        <span className="
                                            text-xl 
                                            font-medium 
                                            text-gray-800 
                                            group-hover:text-blue-600 
                                            transition-colors
                                        ">
                                            {faq.question}
                                        </span>
                                    </div>
                                    <motion.div
                                        initial={false}
                                        animate={{ 
                                            rotate: openFaq === i ? 180 : 0,
                                            color: openFaq === i ? '#3b82f6' : '#6b7280'
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {openFaq === i ? (
                                            <ChevronUp className="w-6 h-6" />
                                        ) : (
                                            <ChevronDown className="w-6 h-6" />
                                        )}
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ 
                                                opacity: 1, 
                                                height: 'auto',
                                                transition: { 
                                                    duration: 0.3,
                                                    ease: "easeInOut"
                                                }
                                            }}
                                            exit={{ 
                                                opacity: 0, 
                                                height: 0,
                                                transition: { 
                                                    duration: 0.2,
                                                    ease: "easeInOut"
                                                }
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <div className="
                                                text-gray-600 
                                                text-base 
                                                leading-relaxed 
                                                px-6 
                                                pb-6
                                                pl-20
                                            ">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 bg-white shadow-lg border border-gray-200 rounded-xl p-8 text-center">
                    <div className="mb-6">
                        <MessageCircle className="mx-auto text-green-500 mb-4" size={48} />
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Need More Detailed Information?
                        </h3>
                        <p className="text-gray-600 max-w-xl mx-auto mb-6">
                        Our sales team is ready to provide personalized insights tailored to your enterprise needs.
                        </p>
                    </div>
                    
                    <a
                    href='/contact'
                        className="
                        w-full max-w-md mx-auto py-3 rounded-lg 
                        bg-green-600 text-white font-semibold 
                        hover:bg-green-700 transition-all
                        flex items-center justify-center hover:cursor-pointer
                        "
                    >
                        Contact Sales
                        <ArrowUpRight size={18} className="ml-2" />
                    </a>
                    </div>
            </div>
        </section>
    )
}

export default FAQ