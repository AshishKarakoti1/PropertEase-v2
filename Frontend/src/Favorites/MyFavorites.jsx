import React, { useEffect, useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import Listing from './Listing';
import { Star } from 'lucide-react';

const MyFavorites = () => {
    const { myFavorites, fetchMyFavorites, loading } = useContext(StoreContext);
    const email = localStorage.getItem('user_email');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token && email) {
            fetchMyFavorites(email);
        }
    }, [token, email]);

    return (
        <div className="p-8 min-h-screen bg-gray-50 flex-grow">
            <div className="flex items-center gap-4 mb-10">
                <div className="bg-orange-500 p-3 rounded-2xl shadow-lg shadow-orange-100">
                    <Star className="text-white" size={32} fill="currentColor" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">My Favorites</h1>
                    <p className="text-gray-500">Properties you have bookmarked for later</p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20 italic text-gray-400">Loading favorites...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {myFavorites && myFavorites.length > 0 ? (
                        myFavorites.map((listing) => (
                            <Listing
                                key={listing._id}
                                id={listing._id}
                                url={listing.images[0]}
                                location={listing.location}
                                bedrooms={listing.bedrooms}
                                bathrooms={listing.bathrooms}
                                area={listing.area}
                                price={listing.price}
                                category={listing.category}
                            />
                        ))
                    ) : (
                        <div className="col-span-full bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
                            <p className="text-xl font-medium text-gray-400">No favorite properties found.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyFavorites;