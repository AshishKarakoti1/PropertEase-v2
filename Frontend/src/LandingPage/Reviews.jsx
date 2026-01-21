import React from 'react';
import { Star, Quote } from 'lucide-react';

const Reviews = () => {
    const reviewData = [
        {
            name: "Marcus Holloway",
            role: "Property Buyer",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
            text: "Found my dream apartment in Dehradun within a week. The filtering system is incredibly accurate."
        },
        {
            name: "Sarah Jenkins",
            role: "Home Seller",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            text: "Selling my villa was seamless. The dashboard makes it easy to track inquiries and manage listings."
        },
        {
            name: "David Chen",
            role: "Real Estate Investor",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            text: "The best platform for high-end properties. The user interface is clean and the verification is top-notch."
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        What our clients say
                    </h2>
                    <p className="text-gray-500 mt-4">
                        Peace of mind at every step of your journey home
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviewData.map((review, index) => (
                        <div 
                            key={index} 
                            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative"
                        >
                            <Quote className="absolute top-6 right-8 text-indigo-100" size={40} />
                            
                            <div className="flex items-center gap-4 mb-6">
                                <img 
                                    src={review.image} 
                                    alt={review.name} 
                                    className="w-16 h-16 rounded-full object-cover border-2 border-indigo-50"
                                />
                                <div>
                                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                                    <p className="text-sm text-gray-500">{review.role}</p>
                                </div>
                            </div>

                            <p className="text-gray-600 italic leading-relaxed mb-6">
                                "{review.text}"
                            </p>

                            <div className="flex gap-1 text-orange-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;