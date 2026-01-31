import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { handleSuccess, handleError } from '../utils';
import { Pencil, Trash2, MapPin, Bed, Bath, Maximize } from 'lucide-react';

const API = import.meta.env.VITE_API_URL;

const Listing = ({ id, url, location, bedrooms, bathrooms, area, price, category }) => {
    const { setMyListings, setCurrentListing } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleOnEditClick = (e) => {
        e.stopPropagation();

        setCurrentListing({
            id,
            url,
            location,
            bedrooms,
            bathrooms,
            area,
            price,
            category
        });

        navigate(`/update/${id}`);
    };

    const handleDeleteListing = async (e) => {
        e.stopPropagation();

        if (!window.confirm("Are you sure you want to delete this listing?")) {
            return;
        }

        try {
            const email = localStorage.getItem('user_email');

            const response = await axios.delete(
                `${API}/buy/${id}`,
                {
                    headers: { 'Content-Type': 'application/json' },
                    data: { email }
                }
            );

            setMyListings(response.data.updatedListings);
            handleSuccess('Listing deleted successfully');

        } catch (err) {
            handleError('Failed to delete listing');
            console.error("Error deleting listing", err);
        }
    };

    return (
        <div className="flex w-full bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 h-64">

            {/* Image */}
            <div className="w-1/3 relative h-full">
                <img
                    className="h-full w-full object-cover"
                    src={url}
                    alt="Property"
                    loading='lazy'
                />

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                    {category === 'selling' ? 'Sale' : 'Rent'}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 flex flex-col justify-between">

                <div>
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2 text-gray-400 mb-1">
                            <MapPin size={16} className="text-indigo-500" />
                            <span className="text-sm font-medium">{location}</span>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900">
                        ₹{price.toLocaleString('en-IN')}
                        {category !== 'selling' && (
                            <span className="text-sm text-gray-400 font-normal">
                                {' '} /mo
                            </span>
                        )}
                    </h2>
                </div>

                <div className="flex gap-8 text-gray-500">

                    <div className="flex items-center gap-2">
                        <Bed size={18} className="text-indigo-400" />
                        <span className="text-sm font-semibold">
                            {bedrooms}
                            <span className="text-xs font-normal text-gray-400 uppercase"> Beds</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Bath size={18} className="text-indigo-400" />
                        <span className="text-sm font-semibold">
                            {bathrooms}
                            <span className="text-xs font-normal text-gray-400 uppercase"> Baths</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Maximize size={18} className="text-indigo-400" />
                        <span className="text-sm font-semibold">
                            {area}
                            <span className="text-xs font-normal text-gray-400 uppercase"> sq m</span>
                        </span>
                    </div>

                </div>

            </div>

            {/* Actions */}
            <div className="w-24 flex flex-col border-l border-gray-50 bg-gray-50/50">

                <button
                    onClick={handleOnEditClick}
                    className="flex-1 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-white transition-all duration-200"
                    title="Edit Listing"
                >
                    <Pencil size={20} />
                </button>

                <button
                    onClick={handleDeleteListing}
                    className="flex-1 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-all duration-200"
                    title="Delete Listing"
                >
                    <Trash2 size={20} />
                </button>

            </div>

        </div>
    );
};

export default Listing;
