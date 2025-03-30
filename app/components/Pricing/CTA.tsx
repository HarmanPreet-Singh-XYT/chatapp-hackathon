import { Rocket, MessageCircle, HelpCircle } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-r from-green-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Accelerate Your Journey</h2>
            <p className="text-xl mb-8 text-indigo-100">
                Choose your path: Start free, schedule a demo, or connect with our experts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                    <Rocket className="mr-2 w-5 h-5" />
                    Start Free Trial
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-indigo-600 transition-all duration-200 flex items-center justify-center">
                    <MessageCircle className="mr-2 w-5 h-5" />
                    Schedule Demo
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-indigo-600 transition-all duration-200 flex items-center justify-center">
                    <HelpCircle className="mr-2 w-5 h-5" />
                    Contact Sales
                </button>
            </div>
        </div>
    </section>
  )
}

export default CTA;