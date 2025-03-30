import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
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
const FeatureComparison = ({tiers}:{tiers:Tier[]}) => {
    // Aggregate all unique features across tiers
    const allFeatures = Array.from(new Set(
        tiers.flatMap(tier => tier.features)
    )).sort();

    return (
        <section className="py-16 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-light tracking-tight text-gray-900 mb-6">
                        Comprehensive <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600">Plan Comparison</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Detailed breakdown of features across our pricing tiers to help you make an informed decision.
                    </p>
                </motion.div>

                <div className="overflow-x-auto bg-gray-50 rounded-2xl shadow-lg">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gradient-to-r from-indigo-50 to-purple-50">
                                <th className="p-4 text-left font-semibold text-gray-900 sticky left-0 bg-gradient-to-r from-indigo-50 to-purple-50 z-10">
                                    Features
                                </th>
                                {tiers.map(tier => (
                                    <th 
                                        key={tier.name} 
                                        className={`p-4 text-center font-semibold 
                                            ${tier.recommended 
                                                ? 'text-indigo-700 bg-indigo-100' 
                                                : 'text-gray-900'
                                            }`}
                                    >
                                        {tier.name}
                                        {tier.recommended && (
                                            <span className="block text-xs text-indigo-500 mt-1">
                                                Most Popular
                                            </span>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {allFeatures.map((feature, index) => (
                                <tr 
                                    key={index} 
                                    className={`border-b ${
                                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                    } hover:bg-gray-100 transition-colors`}
                                >
                                    <td className="p-4 font-medium text-gray-700 sticky left-0 bg-white z-10">
                                        {feature}
                                    </td>
                                    {tiers.map(tier => (
                                        <td 
                                            key={`${tier.name}-${feature}`} 
                                            className="p-4 text-center"
                                        >
                                            {tier.features.includes(feature) ? (
                                                <Check className="w-5 h-5 text-green-500 mx-auto" />
                                            ) : (
                                                <X className="w-5 h-5 text-red-500 opacity-50 mx-auto" />
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};
export default FeatureComparison;