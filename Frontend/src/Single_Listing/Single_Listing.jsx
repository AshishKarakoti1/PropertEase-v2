import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Buying_page/Loading';
import { StoreContext } from "../context/StoreContext";
import {
    Bookmark,
    MapPin,
    Bed,
    Bath,
    Maximize,
    Phone,
    Mail,
    User,
    Tag,
    Calculator,
    ArrowLeft
} from 'lucide-react';

const Single_Listing = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToFavorites, setUserEmail } = useContext(StoreContext);

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [index, setIndex] = useState(0);

    const email = localStorage.getItem('user_email');

    const fetchDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/buy/${id}`);
            setListing(response.data.listing);
        } catch (err) {
            setError('Failed to fetch property details.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [id]);

    const handleContact = () => {
        setUserEmail(listing.createdBy.email);
        navigate('/contact');
    };

    if (loading) return <div className="h-screen flex items-center justify-center"><Loading /></div>;
    if (error) return <div className="h-screen flex items-center justify-center text-red-500 font-bold">{error}</div>;

    const { location, price, bedrooms, bathrooms, area, images, createdBy, category } = listing;

    return (
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-12">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-6 group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to search</span>
            </button>

            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row min-h-[70vh]">

                {/* Image Gallery Section */}
                <div className="w-full lg:w-3/5 p-4 flex flex-col gap-4">
                    <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-[2rem]">
                        <img
                            src={images[index]}
                            className="h-full w-full object-cover transition-all duration-700"
                            alt="Property"
                        />
                        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg">
                            <span className="text-indigo-600 font-bold text-sm uppercase tracking-widest">{category}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setIndex(idx)}
                                className={`relative shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${index === idx ? 'border-indigo-600 scale-95 shadow-lg' : 'border-transparent hover:border-gray-200'
                                    }`}
                            >
                                <img src={img} className="w-full h-full object-cover" alt={`Thumb ${idx}`} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-2/5 p-8 md:p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2 text-indigo-600">
                                <MapPin size={20} />
                                <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">{location}</h1>
                            </div>
                            <button
                                onClick={() => addToFavorites(email, id)}
                                className="p-4 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all active:scale-90"
                            >
                                <Bookmark size={28} fill={listing.isFavorite ? "currentColor" : "none"} />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl font-bold">
                                <Tag size={18} />
                                <span>₹{price?.toLocaleString('en-IN')} {category !== 'selling' && '/ mo'}</span>
                            </div>
                        </div>

                        {/* Property Specs Grid */}
                        <div className="grid grid-cols-3 gap-6 mb-12 py-6 border-y border-gray-100">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bedroom</span>
                                <div className="flex items-center gap-2 text-gray-900 font-bold">
                                    <Bed className="text-indigo-600" size={20} />
                                    <span className="text-lg">{bedrooms}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bathroom</span>
                                <div className="flex items-center gap-2 text-gray-900 font-bold">
                                    <Bath className="text-indigo-600" size={20} />
                                    <span className="text-lg">{bathrooms}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Area</span>
                                <div className="flex items-center gap-2 text-gray-900 font-bold">
                                    <Maximize className="text-indigo-600" size={20} />
                                    <span className="text-lg">{area} <small className="text-xs font-normal">sq m</small></span>
                                </div>
                            </div>
                        </div>

                        {/* Seller Details */}
                        <div className="bg-gray-50 rounded-[2rem] p-6 mb-10">
                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Seller Contact</h4>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-gray-700">
                                    <div className="p-2 bg-white rounded-lg shadow-sm"><User size={18} className="text-indigo-500" /></div>
                                    <span className="font-bold">{createdBy?.username || 'Verified Seller'}</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-700">
                                    <div className="p-2 bg-white rounded-lg shadow-sm"><Phone size={18} className="text-indigo-500" /></div>
                                    <span className="font-medium">{createdBy?.contactNumber || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-700">
                                    <div className="p-2 bg-white rounded-lg shadow-sm"><Mail size={18} className="text-indigo-500" /></div>
                                    <span className="font-medium text-sm truncate">{createdBy?.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleContact}
                            className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:scale-[1.02] transition-all"
                        >
                            Contact Owner
                        </button>
                        {category === 'selling' && (
                            <button
                                onClick={() => navigate(`/mortgage-calculator?id=${id}&price=${price}`)}
                                className="flex-1 border-2 border-indigo-600 text-indigo-600 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
                            >
                                <Calculator size={20} />
                                Mortgage Info
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Single_Listing;