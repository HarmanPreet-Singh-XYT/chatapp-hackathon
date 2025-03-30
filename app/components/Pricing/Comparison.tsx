import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const Comparison = ({tiers, showComparisonModal, setShowComparisonModal}:{tiers:any,showComparisonModal:any, setShowComparisonModal:any}) => {
    if (!showComparisonModal) return null;
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowComparisonModal(false)}
        >
            <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-auto p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
                    Detailed Plan Comparison
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                {tiers.map(tier => (
                                    <th 
                                        key={tier.name} 
                                        className="p-4 text-left border-b font-semibold text-gray-900"
                                    >
                                        {tier.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Dynamically generate comparison rows */}
                            {(() => {
                                const allFeatures = new Set(
                                    tiers.flatMap(tier => tier.features)
                                );
                                
                                return Array.from(allFeatures).map((feature,index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                        {tiers.map(tier => (
                                            <td 
                                                key={`${tier.name}-${feature}`} 
                                                className="p-4"
                                            >
                                                {tier.features.includes(feature) 
                                                    ? <Check className="w-5 h-5 text-green-500" />
                                                    : <X className="w-5 h-5 text-red-500 opacity-50" />
                                                }
                                            </td>
                                        ))}
                                    </tr>
                                ));
                            })()}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default Comparison