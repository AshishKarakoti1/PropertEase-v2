import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { Filter, MapPin, IndianRupee, Home, Bath, Bed, Maximize, RotateCcw } from 'lucide-react';

const Filters = () => {
    const { filters, setFilters, clearFilters, applyFilters, currentPage } = useContext(StoreContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    return (
        <aside className="w-full md:w-80 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit sticky top-16">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
                <Filter size={20} className="text-indigo-600" />
                <h2 className="font-bold text-lg text-gray-900">Search Filters</h2>
            </div>

            <div className="space-y-6">
                {/* Location Filter */}
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                        <MapPin size={14} /> Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        placeholder="Search city..."
                        value={filters.location || ''}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-50 rounded-xl border border-transparent focus:border-indigo-500 outline-none text-sm transition-all"
                    />
                </div>

                {/* Price Filter */}
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                        <IndianRupee size={14} /> Max Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Max budget"
                        value={filters.price || ''}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-50 rounded-xl border border-transparent focus:border-indigo-500 outline-none text-sm transition-all"
                    />
                </div>

                {/* Room Filters Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 mb-2">
                            <Bed size={12} /> Beds
                        </label>
                        <input
                            type="number"
                            name="bedrooms"
                            value={filters.bedrooms || ''}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-50 rounded-lg border border-transparent focus:border-indigo-500 outline-none text-sm"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 mb-2">
                            <Bath size={12} /> Baths
                        </label>
                        <input
                            type="number"
                            name="bathrooms"
                            value={filters.bathrooms || ''}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-50 rounded-lg border border-transparent focus:border-indigo-500 outline-none text-sm"
                        />
                    </div>
                </div>

                {/* Category Selection */}
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                        <Home size={14} /> Looking to:
                    </label>
                    <select
                        name="category"
                        value={filters.category || ''}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-50 rounded-xl border border-transparent focus:border-indigo-500 outline-none text-sm cursor-pointer appearance-none"
                    >
                        <option value="">All Properties</option>
                        <option value="selling">Buy</option>
                        <option value="renting">Rent</option>
                    </select>
                </div>

                <div className="pt-4 space-y-3">
                    <button
                        type="button"
                        onClick={() => applyFilters(1)}
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
                    >
                        Apply Filters
                    </button>
                    
                    <button
                        type="button"
                        onClick={clearFilters}
                        className="w-full flex items-center justify-center gap-2 text-gray-400 py-2 font-semibold text-xs hover:text-red-500 transition-colors"
                    >
                        <RotateCcw size={14} /> Clear All
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Filters;