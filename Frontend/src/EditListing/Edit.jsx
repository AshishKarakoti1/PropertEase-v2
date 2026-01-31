import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { handleSuccess, handleError } from '../utils';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../Buying_page/Loading';
import { MapPin, IndianRupee, Bed, Bath, Maximize, Tag, Save, ArrowLeft } from 'lucide-react';

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [currentListing, setCurrentListing] = useState({
        location: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        category: '',
    });

    const [listing, setListing] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentListing({ ...currentListing, [name]: value });
    };

    const fetchDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/buy/${id}`);
            const data = response.data.listing;
            setListing(data);
            setCurrentListing({
                location: data.location || '',
                price: data.price || '',
                bedrooms: data.bedrooms || '',
                bathrooms: data.bathrooms || '',
                area: data.area || '',
                category: data.category || '',
            });
        } catch (err) {
            setError('Failed to fetch property data.');
            handleError('Could not load listing details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const response = await axios.put(`http://localhost:5000/buy/${id}`, currentListing, {
                headers: { 'Content-Type': 'application/json' },
            });
            
            if (response.data.success) {
                handleSuccess("Property updated successfully!");
                navigate('/myListings');
            } else {
                handleError(response.data.message);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error updating details';
            handleError(errorMessage);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div className='h-[100vh] flex items-center justify-center'><Loading /></div>;
    if (error) return <div className='h-[100vh] flex items-center justify-center text-red-500 font-bold'>{error}</div>;

    return (
        <div className="h-screen max-w-6xl mx-auto px-4 py-14">
            <button 
                onClick={() => navigate(-1)} 
                className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
            >
                <ArrowLeft size={20} /> Back
            </button>

            <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
                {/* Image Section */}
                <div className="lg:w-1/2 relative bg-gray-100 min-h-[400px]">
                    {listing?.images?.length > 0 ? (
                        <img 
                            src={listing.images[0]} 
                            alt="Listing" 
                            className="h-full w-full object-cover" 
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">No Image Available</div>
                    )}
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg">
                        <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest">Editing Mode</span>
                    </div>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="lg:w-1/2 p-10 flex flex-col gap-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                            <Tag size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Update Property</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <MapPin size={14} /> Location
                            </label>
                            <input
                                name="location"
                                type="text"
                                className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-indigo-500 rounded-xl outline-none transition-all"
                                value={currentListing.location}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <IndianRupee size={14} /> Price
                            </label>
                            <input
                                name="price"
                                type="number"
                                className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-indigo-500 rounded-xl outline-none transition-all"
                                value={currentListing.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <Bed size={14} /> Bedrooms
                            </label>
                            <input
                                name="bedrooms"
                                type="number"
                                className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-indigo-500 rounded-xl outline-none transition-all"
                                value={currentListing.bedrooms}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <Bath size={14} /> Bathrooms
                            </label>
                            <input
                                name="bathrooms"
                                type="number"
                                className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-indigo-500 rounded-xl outline-none transition-all"
                                value={currentListing.bathrooms}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <Maximize size={14} /> Area (sqft)
                            </label>
                            <input
                                name="area"
                                type="number"
                                className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-indigo-500 rounded-xl outline-none transition-all"
                                value={currentListing.area}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <Tag size={14} /> Category
                            </label>
                            <select
                                name="category"
                                className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-indigo-500 rounded-xl outline-none transition-all cursor-pointer"
                                value={currentListing.category}
                                onChange={handleChange}
                            >
                                <option value="renting">For Rent</option>
                                <option value="selling">For Sale</option>
                            </select>
                        </div>
                    </div>

                    <button 
                        disabled={updating}
                        className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 transition-all active:scale-95 disabled:opacity-70" 
                        type="submit"
                    >
                        {updating ? 'Updating...' : <><Save size={20} /> Save Changes</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Edit;