import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, ArrowRight } from 'lucide-react';

const API = import.meta.env.VITE_API_URL;

const FeaturedListings = () => {
    const [listings, setListings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const { data } = await axios.get(`${API}/buy/featured`);
                if (data.success) {
                    setListings(data.listings);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchFeatured();
    }, []);

    const handleViewAll = () => {
        navigate('/buy');
    };

    const handleCardClick = (id) => {
        navigate(`/details/${id}`);
    };

    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                        Explore Our Properties
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Handpicked selection of premium listings
                    </p>
                </div>

                <button 
                    onClick={handleViewAll}
                    className="flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all"
                >
                    View All <ArrowRight size={20} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {listings.map((item) => (
                    <div 
                        key={item._id} 
                        onClick={() => handleCardClick(item._id)}
                        className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group cursor-pointer"
                    >
                        
                        <div className="relative h-64 overflow-hidden">
                            <img 
                                src={item.images[0]} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                alt={item.location}
                            />

                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold text-indigo-600 uppercase">
                                {item.category === 'selling' ? 'For Sale' : 'For Rent'}
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-gray-900">
                                ₹{item.price.toLocaleString('en-IN')}
                            </h3>

                            <div className="flex items-center gap-1 text-gray-500 mt-1 mb-6">
                                <MapPin size={16} />
                                <span className="text-sm truncate">
                                    {item.location}
                                </span>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-50 text-gray-600">
                                
                                <div className="flex items-center gap-1">
                                    <Bed size={18} className="text-indigo-400" />
                                    <span className="text-sm font-medium">
                                        {item.bedrooms} Bed
                                    </span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <Bath size={18} className="text-indigo-400" />
                                    <span className="text-sm font-medium">
                                        {item.bathrooms} Bath
                                    </span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <Maximize size={18} className="text-indigo-400" />
                                    <span className="text-sm font-medium">
                                        {item.area} m²
                                    </span>
                                </div>

                            </div>
                        </div>

                    </div>
                ))}
            </div>

        </section>
    );
};

export default FeaturedListings;
