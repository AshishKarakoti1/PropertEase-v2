import React, { useState, useContext } from 'react';
import styles from './Selling_form.module.css';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';
import Loading from '../Buying_page/Loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Selling_form = () => {
    const navigate = useNavigate();
    const { setData, setLoading, loading } = useContext(StoreContext);
    
    const [formData, setFormData] = useState({
        location: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        price: '',
        category: 'selling'
    });
    const [images, setImages] = useState([]); // Separate state for files for easier validation

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'images') {
            setImages(Array.from(files)); // Convert FileList to Array
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('token');
        const user_email = localStorage.getItem('user_email');

        if (!token) {
            handleError("Session expired. Please login again.");
            setTimeout(() => navigate('/login'), 1500);
            setLoading(false);
            return;
        }

        // Basic validation
        if (!formData.location || !formData.price || images.length === 0) {
            handleError("Location, Price, and at least one image are required.");
            setLoading(false);
            return;
        }

        const dataPayload = new FormData();
        // Append text fields
        dataPayload.append('location', formData.location);
        dataPayload.append('bedrooms', Number(formData.bedrooms));
        dataPayload.append('bathrooms', Number(formData.bathrooms));
        dataPayload.append('area', Number(formData.area));
        dataPayload.append('price', Number(formData.price));
        dataPayload.append('user_email', user_email);
        dataPayload.append('category', formData.category);

        // Append multiple images
        images.forEach((file) => {
            dataPayload.append('images', file);
        });

        try {
            const URL = "http://localhost:9090/sell";
            const response = await axios.post(URL, dataPayload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                // If your backend returns all listings, update context
                if (response.data.updatedListings) setData(response.data.updatedListings);
                
                handleSuccess("Property listed successfully!");
                navigate('/buy');
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Failed to add listing";
            handleError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-6">
                <h2 className="text-xl font-semibold text-indigo-600">Uploading to Cloudinary...</h2>
                <Loading />
            </div>
        );
    }

    return (
        <div className='w-[85%] max-w-6xl h-[80vh] bg-white flex mx-auto mt-[3rem] rounded-3xl shadow-2xl overflow-hidden items-center border border-gray-100'>
            <div className='hidden md:block h-full w-1/2'>
                <img src="/buy.png" alt="Real Estate" className="w-full h-full object-cover" />
            </div>
            
            <div className='h-full w-full md:w-1/2 px-10 py-3 overflow-y-auto'>
                <div className={styles.heading_div}>
                    <h1 className="text-3xl font-bold text-indigo-600 mb-6">List Your Property</h1>
                </div>

                <form className="space-y-1" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-600">Location*</label>
                        <input
                            className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-500 transition-all"
                            type="text"
                            placeholder="e.g., Rajpur Road, Dehradun"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-600">Bedrooms</label>
                            <input
                                className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-500"
                                type="number"
                                name="bedrooms"
                                value={formData.bedrooms}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-600">Bathrooms</label>
                            <input
                                className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-500"
                                type="number"
                                name="bathrooms"
                                value={formData.bathrooms}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-600">Area (sqft)*</label>
                            <input
                                className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-500"
                                type="number"
                                name="area"
                                value={formData.area}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-600">Price (₹)*</label>
                            <input
                                className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-500"
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-600">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-500 appearance-none cursor-pointer"
                        >
                            <option value="selling">For Sale</option>
                            <option value="renting">For Rent</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-600">Property Images* (Min 1)</label>
                        <input
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            type="file"
                            name="images"
                            multiple
                            accept="image/*"
                            onChange={handleChange}
                            required
                        />
                        <p className="text-xs text-gray-400 mt-1">{images.length} files selected</p>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-indigo-700 active:scale-[0.98] transition-all"
                    >
                        List Property
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Selling_form;