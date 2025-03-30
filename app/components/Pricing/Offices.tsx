import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

const Offices = ({offices, setSelectedOffice}) => {
  return (
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
  )
}

export default Offices