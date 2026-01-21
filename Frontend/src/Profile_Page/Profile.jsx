import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { Camera, User, Phone, Mail, Home, Star, Save } from 'lucide-react';

const Profile = () => {
    const { user, getUserData, setUser } = useContext(StoreContext);
    const email = localStorage.getItem('user_email');
    const [loading, setLoading] = useState(false);
    const [userDetails, setUserDetails] = useState({
        username: '',
        contactNumber: ''
    });

    useEffect(() => {
        if (email) getUserData(email);
    }, [email]);

    useEffect(() => {
        if (user) {
            setUserDetails({
                username: user.username || '',
                contactNumber: user.contactNumber || ''
            });
        }
    }, [user]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        formData.append('email', email);

        try {
            setLoading(true);
            const { data } = await axios.post('http://localhost:9090/user/setPhoto', formData);
            if (data.success) {
                setUser(data.updatedUser);
                handleSuccess('Profile photo updated');
            }
        } catch (error) {
            handleError('Error uploading photo');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            const { data } = await axios.post(`http://localhost:9090/user/?email=${email}`, userDetails);
            if (data.success) {
                setUser(data.user);
                handleSuccess('Details updated successfully');
            }
        } catch (error) {
            handleError(error.response?.data?.message || 'Update failed');
        }
    };

    return (
        <div className="h-screen flex justify-center items-center max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-40 bg-indigo-600"></div>
                <div className="px-8 pb-8">
                    <div className="relative -mt-16 mb-8 flex items-end gap-6">
                        <div className="relative group">
                            <img 
                                className="h-32 w-32 rounded-2xl object-cover border-4 border-white shadow-md" 
                                src={user?.URL || '/profilePhoto.png'} 
                                alt="Profile"
                            />
                            <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-2xl opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                                <Camera size={24} />
                                <input type="file" className="hidden" onChange={handleFileChange} disabled={loading} />
                            </label>
                        </div>
                        <div className="pb-2">
                            <h1 className="text-2xl font-bold text-gray-900">{user?.username}</h1>
                            <p className="text-gray-500 text-sm">{user?.email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <User size={18} className="text-indigo-600" /> Personal Details
                            </h3>
                            <div className="space-y-4">
                                <input 
                                    className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-indigo-500 transition-all"
                                    placeholder="Username"
                                    name="username"
                                    value={userDetails.username}
                                    onChange={(e) => setUserDetails({...userDetails, username: e.target.value})}
                                />
                                <input 
                                    className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-indigo-500 transition-all"
                                    placeholder="Contact Number"
                                    name="contactNumber"
                                    value={userDetails.contactNumber}
                                    onChange={(e) => setUserDetails({...userDetails, contactNumber: e.target.value})}
                                />
                                <button 
                                    onClick={handleUpdate}
                                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all"
                                >
                                    <Save size={18} /> Save Changes
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <Star size={18} className="text-indigo-600" /> Account Statistics
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-indigo-50 rounded-2xl">
                                    <Home className="text-indigo-600 mb-2" />
                                    <p className="text-2xl font-bold">{user?.listings?.length || 0}</p>
                                    <p className="text-xs text-indigo-400 font-bold uppercase">My Listings</p>
                                </div>
                                <div className="p-4 bg-orange-50 rounded-2xl">
                                    <Star className="text-orange-500 mb-2" />
                                    <p className="text-2xl font-bold">{user?.favorites?.length || 0}</p>
                                    <p className="text-xs text-orange-400 font-bold uppercase">Favorites</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;