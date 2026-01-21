import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { Trash2, MapPin, Bed, Bath, Maximize } from 'lucide-react';

const Listing = ({ id, url, location, bedrooms, bathrooms, area, price, category }) => {
    const email = localStorage.getItem('user_email');
    const { deleteFromFavorites } = useContext(StoreContext);

    const handleDeleteFromFavorites = (e) => {
        e.stopPropagation();
        deleteFromFavorites(email, id);
    }

    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
            <div className="relative h-48 overflow-hidden">
                <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    src={url} 
                    alt="Property" 
                    loading='lazy' 
                />
                <button 
                    onClick={handleDeleteFromFavorites}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                    title="Remove from favorites"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">
                        ₹{price.toLocaleString('en-IN')}
                        {category !== 'selling' && <span className="text-xs text-gray-400 font-normal"> /mo</span>}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-400 text-sm mt-1 mb-4">
                        <MapPin size={14} />
                        <span className="truncate">{location}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-50 text-gray-500">
                    <div className="flex flex-col items-center gap-1">
                        <Bed size={16} className="text-indigo-400" />
                        <span className="text-[10px] font-bold uppercase">{bedrooms} Bed</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Bath size={16} className="text-indigo-400" />
                        <span className="text-[10px] font-bold uppercase">{bathrooms} Bath</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Maximize size={16} className="text-indigo-400" />
                        <span className="text-[10px] font-bold uppercase">{area} m²</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Listing;