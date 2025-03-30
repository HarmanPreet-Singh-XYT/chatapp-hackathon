import { Mail, MapPin, Phone, Send, CheckCircle, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const Contact = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission with actual data
        console.log('Form Submitted:', formData);
        setSubmitted(true);
    };

    return (
        <section 
            id="contact" 
            className="
                min-h-screen 
                flex 
                items-center 
                justify-center 
                bg-gradient-to-br 
                from-gray-50 
                to-gray-100 
                relative 
                overflow-hidden 
                px-4 
                py-16
                font-['Inter',_sans-serif]
            "
        >
            {/* Advanced Background Effects */}
            <div className="
                absolute 
                inset-0 
                pointer-events-none 
                opacity-30 
                bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                from-blue-100 
                via-white 
                to-transparent
                blur-[2px]
            "></div>

            <div className="
                absolute 
                top-0 
                left-0 
                w-full 
                h-full 
                bg-grid-gray-100/20 
                opacity-30
            "></div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                    duration: 0.6, 
                    ease: "easeInOut" 
                }}
                className="
                    max-w-6xl 
                    w-full 
                    mx-auto 
                    relative 
                    z-10 
                    grid 
                    md:grid-cols-2 
                    gap-0 
                    bg-white/80 
                    backdrop-blur-xl 
                    rounded-3xl 
                    shadow-2xl 
                    overflow-hidden
                    border 
                    border-white/30
                "
            >
                {/* Contact Information Column */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="
                        bg-gradient-to-br 
                        from-blue-500 
                        to-blue-700 
                        text-white 
                        p-12 
                        flex 
                        flex-col 
                        justify-center 
                        space-y-6
                        relative
                        overflow-hidden
                    "
                >
                    {/* Subtle Gradient Overlay */}
                    <div className="
                        absolute 
                        inset-0 
                        bg-gradient-to-br 
                        from-blue-600/40 
                        to-blue-800/40 
                        mix-blend-overlay
                    "></div>

                    <h2 className="
                        text-4xl 
                        font-extrabold 
                        mb-6 
                        text-white 
                        tracking-tight
                        relative
                        z-10
                    ">
                        Contact Information
                    </h2>
                    {[
                        {
                            icon: Mail,
                            title: "Email",
                            description: "Quick response guaranteed",
                            contact: "enterprise@fluchat.com",
                            link: "mailto:enterprise@fluchat.com"
                        },
                        {
                            icon: Phone,
                            title: "Phone",
                            description: "Support hours: 8am-5pm PST",
                            contact: "+1 (555) 0123",
                            link: "tel:+1-555-0123"
                        },
                        {
                            icon: MapPin,
                            title: "Address",
                            description: "Headquarters Location",
                            contact: "123 Innovation Drive\nSan Francisco, CA 94107"
                        }
                    ].map((item, index) => (
                        <motion.div 
                            key={index} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                                duration: 0.5, 
                                delay: 0.3 + index * 0.1 
                            }}
                            className="
                                flex 
                                items-start 
                                space-x-4 
                                group 
                                hover:bg-white/10 
                                p-4 
                                -mx-4 
                                rounded-xl 
                                transition-all
                                relative
                                z-10
                            "
                        >
                            <item.icon className="
                                w-8 
                                h-8 
                                text-white/80 
                                group-hover:text-white 
                                transition-colors
                            " />
                            <div>
                                <h4 className="
                                    text-xl 
                                    font-semibold 
                                    mb-2 
                                    text-white
                                ">
                                    {item.title}
                                </h4>
                                <p className="
                                    text-white/70 
                                    mb-2 
                                    text-sm
                                ">
                                    {item.description}
                                </p>
                                {item.link ? (
                                    <a 
                                        href={item.link} 
                                        className="
                                            text-white 
                                            font-medium 
                                            hover:underline 
                                            flex 
                                            items-center 
                                            group
                                        "
                                    >
                                        {item.contact}
                                        <ArrowRight 
                                            className="
                                                ml-2 
                                                w-4 
                                                h-4 
                                                opacity-0 
                                                group-hover:opacity-100 
                                                transition-all
                                            "
                                        />
                                    </a>
                                ) : (
                                    <p className="
                                        text-white 
                                        whitespace-pre-line
                                    ">
                                        {item.contact}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Form Column */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="
                        p-12 
                        flex 
                        items-center 
                        bg-white/60 
                        backdrop-blur-lg
                    "
                >
                    <AnimatePresence mode="wait">
                        {!submitted ? (
                            <motion.form 
                                key="contact-form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                onSubmit={handleSubmit}
                                className="w-full space-y-6"
                            >
                                <div>
                                    <h2 className="
                                        text-4xl 
                                        font-extrabold 
                                        text-gray-800 
                                        mb-4 
                                        tracking-tight
                                    ">
                                        Get in Touch
                                    </h2>
                                    <p className="
                                        text-gray-600 
                                        mb-8
                                        text-lg
                                        font-light
                                    ">
                                        Have a question or want to work together? 
                                        Fill out this form and we'll respond within 2 hours.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {['name', 'email', 'message'].map((field) => (
                                        <div key={field}>
                                            <label className="
                                                block 
                                                text-sm 
                                                font-medium 
                                                text-gray-700 
                                                mb-2
                                                capitalize
                                            ">
                                                {field === 'message' ? 'Your Message' : `${field} Full Name`}
                                            </label>
                                            {field !== 'message' ? (
                                                <input
                                                    type={field === 'email' ? 'email' : 'text'}
                                                    name={field}
                                                    value={formData[field]}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder={`Your ${field}`}
                                                    className="
                                                        w-full 
                                                        px-4 
                                                        py-3 
                                                        rounded-xl 
                                                        border 
                                                        border-gray-300 
                                                        focus:outline-none 
                                                        focus:ring-2 
                                                        focus:ring-blue-500 
                                                        focus:border-transparent 
                                                        transition-all 
                                                        hover:border-blue-300
                                                        bg-white
                                                        shadow-sm
                                                    "
                                                />
                                            ) : (
                                                <textarea
                                                    name={field}
                                                    value={formData[field]}
                                                    onChange={handleInputChange}
                                                    rows={4}
                                                    required
                                                    placeholder="Write your message here..."
                                                    className="
                                                        w-full 
                                                        px-4 
                                                        py-3 
                                                        rounded-xl 
                                                        border 
                                                        border-gray-300 
                                                        focus:outline-none 
                                                        focus:ring-2 
                                                        focus:ring-blue-500 
                                                        focus:border-transparent 
                                                        transition-all 
                                                        hover:border-blue-300
                                                        bg-white
                                                        shadow-sm
                                                    "
                                                ></textarea>
                                            )}
                                        </div>
                                    ))}
                                    
                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        className="
                                            w-full 
                                            px-6 
                                            py-4 
                                            rounded-xl 
                                            bg-blue-600 
                                            text-white 
                                            font-bold 
                                            text-lg 
                                            tracking-wide 
                                            transform 
                                            transition-all 
                                            duration-300 
                                            hover:bg-blue-700 
                                            hover:shadow-xl 
                                            flex 
                                            items-center 
                                            justify-center 
                                            space-x-2
                                            group
                                        "
                                    >
                                        <Send className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                                        Send Message
                                    </motion.button>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div 
                                key="success-message"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="
                                    text-center 
                                    w-full 
                                    space-y-6 
                                    py-12
                                "
                            >
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ 
                                        type: "spring", 
                                        stiffness: 260, 
                                        damping: 20 
                                    }}
                                >
                                    <CheckCircle className="
                                        mx-auto 
                                        w-24 
                                        h-24 
                                        text-green-500 
                                        mb-6
                                        animate-pulse
                                    " />
                                </motion.div>
                                <h3 className="
                                    text-4xl 
                                    font-extrabold 
                                    text-gray-800 
                                    mb-4
                                ">
                                    Message Sent Successfully!
                                </h3>
                                <p className="
                                    text-gray-600 
                                    text-lg 
                                    mb-8
                                    font-light
                                ">
                                    We've received your message and will respond shortly.
                                </p>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setSubmitted(false);
                                        setFormData({
                                            name: '',
                                            email: '',
                                            message: ''
                                        });
                                    }}
                                    className="
                                        px-8 
                                        py-4 
                                        bg-blue-600 
                                        text-white 
                                        rounded-xl 
                                        font-bold 
                                        hover:bg-blue-700 
                                        transition-colors 
                                        flex 
                                        items-center 
                                        mx-auto
                                        group
                                    "
                                >
                                    Send Another Message
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:animate-bounce" />
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Contact