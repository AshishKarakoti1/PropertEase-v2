import React, { useContext, useEffect } from 'react';
import Listing from './Listing';
import { StoreContext } from '../context/StoreContext';
import { LayoutList } from 'lucide-react';

const My_listings = () => {
    const { myListings, fetchMyListings, loading } = useContext(StoreContext);
    const email = localStorage.getItem('user_email');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token && email) {
            fetchMyListings(email);
        }
    }, [token, email]);

    return (
        <div className="p-8 min-h-screen bg-gray-50 flex-grow">
            <div className="flex items-center gap-4 mb-10">
                <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-200">
                    <LayoutList className="text-white" size={32} />
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">My Listings</h1>
                    <p className="text-gray-500">Manage and track the properties you have listed</p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20 italic text-gray-400">Loading your properties...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                    {myListings && myListings.length > 0 ? (
                        myListings.map((listing) => (
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
                            <p className="text-xl font-medium text-gray-400">You haven't listed any properties yet.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default My_listings;