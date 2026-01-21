import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, IndianRupee } from 'lucide-react';

const HeroSection = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        location: '',
        category: 'selling',
        price: ''
    });

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/buy', { state: { filters } });
    };

    return (
        <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
            <div className="absolute">
                <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" 
                    className="w-full h-full object-cover brightness-75"
                    alt="Hero"
                />
            </div>

            <div className="relative z-10 w-full max-w-4xl px-6">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 shadow-sm">
                        Find a home just right for you
                    </h1>
                </div>

                <div className="bg-white p-2 md:p-4 rounded-2xl shadow-2xl">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4">
                        <div className="flex-1 w-full flex items-center gap-2 px-4 py-3 border-r border-gray-100">
                            <MapPin className="text-indigo-600" size={20} />
                            <input 
                                type="text"
                                placeholder="Location"
                                className="w-full outline-none text-gray-700 font-medium"
                                onChange={(e) => setFilters({...filters, location: e.target.value})}
                            />
                        </div>

                        <div className="flex-1 w-full flex items-center gap-2 px-4 py-3 border-r border-gray-100">
                            <Home className="text-indigo-600" size={20} />
                            <select 
                                className="w-full outline-none text-gray-700 font-medium bg-transparent"
                                onChange={(e) => setFilters({...filters, category: e.target.value})}
                            >
                                <option value="selling">Buy</option>
                                <option value="renting">Rent</option>
                            </select>
                        </div>

                        <div className="flex-1 w-full flex items-center gap-2 px-4 py-3">
                            <IndianRupee className="text-indigo-600" size={20} />
                            <input 
                                type="number"
                                placeholder="Max Price"
                                className="w-full outline-none text-gray-700 font-medium"
                                onChange={(e) => setFilters({...filters, price: e.target.value})}
                            />
                        </div>

                        <button 
                            type="submit"
                            className="w-full md:w-auto bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                        >
                            <Search size={20} />
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;