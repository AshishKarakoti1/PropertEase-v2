import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../utils';
import { ToastContainer } from 'react-toastify';
import { MapPin, Bed, Bath, Maximize, ArrowRight } from 'lucide-react';

const Post = ({ id, url, location, bedrooms, bathrooms, area, price, category }) => {
    const navigate = useNavigate();

    const handlePostClick = () => {
        if (!localStorage.getItem('token')) {
            handleError("Please login to view full details");
            return;
        }
        navigate(`/details/${id}`);
    };

    return (
        <div
            onClick={handlePostClick}
            className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
        >
            {/* Image Section with Category Badge */}
            <div className="relative h-56 overflow-hidden">
                <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    src={url || '/placeholder-house.jpg'} 
                    alt="Property" 
                    loading="lazy" 
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-indigo-600 uppercase tracking-widest shadow-sm">
                    {category === 'selling' ? 'For Sale' : 'For Rent'}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-lg font-bold text-gray-900 truncate max-w-[160px]">{location}</h2>
                        <div className="text-right">
                            <p className="text-xl font-extrabold text-indigo-600">
                                ₹{Number(price).toLocaleString('en-IN')}
                            </p>
                            {category !== 'selling' && (
                                <span className="text-[10px] text-gray-400 font-medium block uppercase tracking-tighter">
                                    per month
                                </span>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-gray-400 text-sm mb-6">
                        <MapPin size={14} className="shrink-0" />
                        <span className="truncate">{location}</span>
                    </div>
                </div>

                {/* Specs Row */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-50 text-gray-500">
                    <div className="flex flex-col items-center gap-1">
                        <Bed size={18} className="text-indigo-400" />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">{bedrooms} Beds</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Bath size={18} className="text-indigo-400" />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">{bathrooms} Baths</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Maximize size={18} className="text-indigo-400" />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">{area} sq m</span>
                    </div>
                    <div className="pl-4 border-l border-gray-100">
                        <div className="bg-gray-50 p-2 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                            <ArrowRight size={16} />
                        </div>
                    </div>
                </div>
            </div>
            {/* Recommendation: Move ToastContainer to a single higher-level component like App.jsx */}
        </div>
    );
};

export default Post;