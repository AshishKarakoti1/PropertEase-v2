import React from 'react';
import { Home, Key, BadgePercent } from 'lucide-react';

const Services = () => {
    const serviceList = [
        {
            title: "Buy a Home",
            desc: "Find your place with an immersive photo experience and the most listings, including things you won't find anywhere else.",
            icon: Home,
            color: "bg-blue-50 text-blue-600"
        },
        {
            title: "Rent a Home",
            desc: "We're creating a seamless online experience – from shopping on the largest rental network, to applying, to paying rent.",
            icon: Key,
            color: "bg-purple-50 text-purple-600"
        },
        {
            title: "Sell a Home",
            desc: "No matter what path you take to sell your home, we can help you navigate a successful sale with ease and confidence.",
            icon: BadgePercent,
            color: "bg-orange-50 text-orange-600"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        See how PropertEase can help
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                        We offer a complete suite of real estate services to help you navigate your journey from start to finish.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {serviceList.map((service, index) => (
                        <div 
                            key={index} 
                            className="flex flex-col items-center text-center p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className={`${service.color} p-5 rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                                <service.icon size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                {service.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed mb-6">
                                {service.desc}
                            </p>
                            <button className="text-indigo-600 font-semibold border-2 border-indigo-600 px-6 py-2 rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
                                Learn More
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;