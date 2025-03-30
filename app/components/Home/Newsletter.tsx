import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertTriangle, Sparkles, Star } from 'lucide-react'

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [subscriberCount, setSubscriberCount] = useState(54672);
    const inputRef = useRef<HTMLInputElement>(null);

    const validateEmail = (email: string) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Reset previous states
        setErrorMessage('');
        
        // Validate email
        if (!validateEmail(email)) {
            setStatus('error');
            setErrorMessage('Please enter a valid email address');
            inputRef.current?.focus();
            return;
        }

        // Simulate newsletter signup
        setStatus('loading');

        try {
            // Simulated async operation
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success scenario
            setStatus('success');
            setSubscriberCount(prev => prev + 1);
            setEmail('');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setStatus('error');
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    // Animated subscriber count effect
    const AnimatedNumber = ({ number }: { number: number }) => {
        const [displayNumber, setDisplayNumber] = useState(number);

        useEffect(() => {
            const end = number;
            
            const timer = setInterval(() => {
                setDisplayNumber(prev => 
                    prev < end ? prev + 1 : prev
                );
            }, 10);

            return () => clearInterval(timer);
        }, [number]);

        return <>{displayNumber.toLocaleString()}</>;
    };

    return (
        <section 
            className="
                relative 
                py-24 
                px-6 
                overflow-hidden 
                bg-gradient-to-br 
                from-indigo-600 
                via-purple-600 
                to-pink-600
            "
        >
            {/* Animated Background Effects */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ 
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.05, 1]
                }}
                transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="
                    absolute 
                    inset-0 
                    bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] 
                    from-indigo-500/30 
                    via-purple-500/20 
                    to-pink-500/10 
                    opacity-50 
                    pointer-events-none
                "
            ></motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="
                    relative 
                    z-10 
                    max-w-4xl 
                    mx-auto 
                    text-center 
                    text-white
                "
            >
                <div className="mb-12 relative">
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ 
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "mirror"
                        }}
                        className="absolute -top-8 left-1/2 -translate-x-1/2"
                    >
                        <Sparkles 
                            className="
                                w-10 
                                h-10 
                                text-yellow-300 
                                animate-pulse
                            " 
                        />
                    </motion.div>
                    <h2 className="
                        text-5xl 
                        font-bold 
                        mb-6 
                        bg-clip-text 
                        text-transparent 
                        bg-gradient-to-r 
                        from-white 
                        to-white/70
                    ">
                        Stay Ahead of the Curve
                    </h2>
                    <p className="
                        text-xl 
                        max-w-2xl 
                        mx-auto 
                        text-white/80 
                        leading-relaxed
                    ">
                        Join our community and get exclusive insights, cutting-edge strategies, 
                        and breakthrough innovations delivered directly to your inbox.
                    </p>
                    
                    <div className="
                        mt-4 
                        flex 
                        items-center 
                        justify-center 
                        text-white/70 
                        space-x-2
                    ">
                        <Star className="w-5 h-5 text-yellow-300" />
                        <span>
                            <AnimatedNumber number={subscriberCount} /> subscribers and counting
                        </span>
                    </div>
                </div>

                <form 
                    onSubmit={handleSubmit}
                    className="
                        max-w-xl 
                        mx-auto 
                        bg-white/10 
                        backdrop-blur-lg 
                        rounded-2xl 
                        p-2 
                        flex 
                        items-center 
                        shadow-2xl 
                        border 
                        border-white/20
                    "
                >
                    <div className="flex-1 relative">
                        <input
                            ref={inputRef}
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setStatus('idle');
                                setErrorMessage('');
                            }}
                            placeholder="Enter your professional email"
                            className="
                                w-full 
                                px-6 
                                py-4 
                                bg-transparent 
                                text-white 
                                placeholder-white/50 
                                focus:outline-none 
                                text-lg
                                transition-all
                                duration-300
                                focus:placeholder-white/80
                            "
                            disabled={status === 'loading'}
                        />
                        <AnimatePresence>
                            {status === 'error' && (
                                <motion.div 
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="
                                        absolute 
                                        right-4 
                                        top-1/2 
                                        -translate-y-1/2 
                                        text-red-400 
                                        flex 
                                        items-center
                                    "
                                >
                                    <AlertTriangle className="w-5 h-5 mr-2" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <button 
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className="
                            px-8 
                            py-4 
                            rounded-xl 
                            bg-white 
                            text-indigo-600 
                            font-bold 
                            flex 
                            items-center 
                            transition-all 
                            duration-300 
                            hover:bg-white/90 
                            hover:scale-105
                            disabled:opacity-50 
                            disabled:cursor-not-allowed
                            group
                        "
                    >
                        {status === 'loading' ? (
                            <span className="animate-pulse flex items-center">
                                <svg 
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24"
                                >
                                    <circle 
                                        className="opacity-25" 
                                        cx="12" 
                                        cy="12" 
                                        r="10" 
                                        stroke="currentColor" 
                                        strokeWidth="4"
                                    ></circle>
                                    <path 
                                        className="opacity-75" 
                                        fill="currentColor" 
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Subscribing...
                            </span>
                        ) : status === 'success' ? (
                            <>
                                <CheckCircle className="mr-2 w-5 h-5" /> Subscribed
                            </>
                        ) : (
                            <>
                                <Send className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" /> Subscribe
                            </>
                        )}
                    </button>
                </form>

                <AnimatePresence>
                    {status === 'error' && errorMessage && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="
                                text-red-300 
                                mt-4 
                                text-sm 
                                flex 
                                items-center 
                                justify-center
                            "
                        >
                            <AlertTriangle className="mr-2 w-4 h-4" />
                            {errorMessage}
                        </motion.p>
                    )}
                </AnimatePresence>

                <div className="
                    mt-8 
                    text-sm 
                    text-white/60 
                    max-w-xl 
                    mx-auto
                ">
                    <p>
                        By subscribing, you agree to our 
                        {' '}
                        <a 
                            href="#" 
                            className="
                                underline 
                                hover:text-white 
                                transition-colors
                            "
                        >
                            Privacy Policy
                        </a>
                        {' '}and{' '}
                        <a 
                            href="#" 
                            className="
                                underline 
                                hover:text-white 
                                transition-colors
                            "
                        >
                            Terms of Service
                        </a>
                    </p>
                </div>
            </motion.div>
        </section>
    )
}

export default Newsletter